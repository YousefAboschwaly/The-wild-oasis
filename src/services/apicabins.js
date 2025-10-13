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
async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  // https://ersqmuthcoyjqdgtqytk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const hasImagePath = newCabin?.image?.startsWith?.(SUPBASEURL);
  const imagePath = hasImagePath? newCabin.image:`${SUPBASEURL}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1- Creating cabin
  let query = supabase.from("cabins");
  if (!id)query= query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query =query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Created");
  }

  // 2- Upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

// Delete cabin

async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export { getCabins, deleteCabin, createEditCabin };
