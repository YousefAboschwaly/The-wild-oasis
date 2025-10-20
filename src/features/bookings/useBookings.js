import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("status") || "all";
 const filter = {field:"status", value:filteredValue,method:"eq"}
 const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
 const [field,direction] = sortByRaw.slice("-")
 const sortBy = {field,direction}
 console.log(sortBy)


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
