import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("status") || "all";
 const filter = {field:"status", value:filteredValue}

  const {
    isPending,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({filter}),
  });

  return { isPending, error, bookings };
}
