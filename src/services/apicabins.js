import supabase from "./supabase";

async function getCabins(){
 
let { data, error } = await supabase
  .from('cabins')
  .select('*')
  if(error) {
    console.error(error)
    throw new Error("Cabins could not be loaded" )
  }
 return data
}

async function createCabin(newCabin){
 
// https://ersqmuthcoyjqdgtqytk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
const imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replaceAll('/'," ")
const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`
// 1- Creating cabin
const { data, error } = await supabase
  .from('cabins')
  .insert([{...newCabin, image:imagePath }])
  .select()

  if(error) {
    console.error(error)
    throw new Error("Cabins could not be Created" )
  }


 return data
}


async function deleteCabin(id){
  
const { error , data } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)
  if(error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }
   return data

}

export {getCabins , deleteCabin , createCabin}