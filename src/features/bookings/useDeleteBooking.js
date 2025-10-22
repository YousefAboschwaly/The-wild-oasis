import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  // const navigate= useNavigate()
  const queryClient = useQueryClient()
  const {mutate:deleteBooking  , isPending:isDeleting} = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess:()=>{
      toast.success("Booking successfully deleted")
      queryClient.invalidateQueries({queryKey:["bookings"]})
      // navigate('/bookings')
    },
    onError:(err)=>toast.error(err.message)
  });
  return{deleteBooking , isDeleting}
}
