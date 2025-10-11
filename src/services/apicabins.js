import supabase from "./supabase";

async function getCabins(){
 
let { data, error } = await supabase
  .from('cabins')
  .select('*')
  if(error) {
    console.error(error)
    throw new Error("couldn't get   cabins")
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
    throw new Error('Error fetching cabins')
  }
   return data

}

export {getCabins , deleteCabin}