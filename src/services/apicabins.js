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
 

const { data, error } = await supabase
  .from('cabins')
  .insert([newCabin])
  .select()

  if(error) {
    console.error(error)
    throw new Error("Cabins could not be loaded" )
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