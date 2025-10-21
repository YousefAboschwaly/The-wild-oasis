import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    mutate: checkingIn,
    isPending: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: (BookingId) =>
      updateBooking(BookingId, { status: "checked-in", isPaid: true }),
    onSuccess:(data)=>{
      toast.success(`Booking #${data.id} successfully checked in `)
      queryClient.invalidateQueries({active:true})
      navigate('/')
    }
  });
  return {checkingIn,isCheckingIn,error}
}
