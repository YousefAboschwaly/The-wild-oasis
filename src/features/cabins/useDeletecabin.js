import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apicabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {

  const queryClient = useQueryClient();
  const { mutate:deleteCabin, isPending } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

return {deleteCabin , isPending}
}