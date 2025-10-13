import toast from "react-hot-toast";
import supabase from "./supabase";
const SUPBASEURL = import.meta.env.VITE_SUPABASE_URL;

// Get cabins
async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

// Create or Edit cabin
async function createEditCabin(newCabin, id = null) {
  console.log(newCabin, id);

  // get the oldData of the cabin with this id to get the old image
  let oldImage = null;
  if (id) {
    const { data: oldData, error: fetchError } = await supabase
      .from("cabins")
      .select("image")
      .eq("id", id)
      .single();
    if (!fetchError) oldImage = oldData?.image;
  }

  const imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const hasImagePath = newCabin?.image?.startsWith?.(SUPBASEURL);
  const imagePath = hasImagePath
    ? newCabin.image
    : `${SUPBASEURL}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1- Create or Edit cabin in the database
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created or updated");
  }

  // if there is already an image path (means we are not updating the image) just return the data
  if (hasImagePath) return data;

  // 2- Upload Image that mean we are creating a new cabin or updating the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin image could not be uploaded");
  }

  // 3- If we are updating and there is an old image, delete the old image or there was an error uploading the new image
  if ((id && oldImage && !oldImage.startsWith(imagePath)) || storageError) {
    const oldImageName = oldImage.split("/").pop();
    if (oldImageName) {
      const { error: deleteError } = await supabase.storage
        .from("cabin-images")
        .remove([oldImageName]);
      if (deleteError)
        toast.error("Cabin updated but old image could not be removed");
    }
  }

  return data;
}

// Delete cabin
async function deleteCabin(id) {
  // get the cabinData if this id
  const { data: cabinData, error: fetchError } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();

  if (fetchError || !cabinData) {
    throw new Error("Could not find cabin to delete");
  }

  // extract the image name from the url
  const imageUrl = cabinData.image;
  const imageName = imageUrl?.split("/").pop();

  // 1- Delete cabin from database from cabins table
  const { error: dbError } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);
  if (dbError) {
    console.error(dbError);
    throw new Error("Cabin could not be deleted from database");
  }
  // 2- Delete image from storage if there is an imageName
  if (imageName) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .remove([imageName]);
    if (storageError) {
      console.warn("Cabin deleted but image not removed:", storageError);
    }
  }

  return { success: true };
}

export { getCabins, deleteCabin, createEditCabin };
