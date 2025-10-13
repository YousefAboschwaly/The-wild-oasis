import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apicabins";
import toast from "react-hot-toast";

export function useEditCabin() {

  const queryClient = useQueryClient();
   const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, editId }) =>
      createEditCabin(newCabinData, editId),
    onSuccess: () => {
      toast.success("cabin  successfully Edited ");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return{editCabin, isEditing}

}