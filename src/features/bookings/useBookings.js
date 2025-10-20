import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import SortBy from './../../ui/SortBy';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filteredValue = searchParams.get("status") || "all";
 const filter = {field:"status", value:filteredValue,method:"eq"}

//  SORT
 const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
 const [field,direction] = sortByRaw.split("-")
 const sortBy = {field,direction}


  const {
    isPending,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings", filter,sortBy],
    queryFn: () => getBookings({filter,sortBy}),
  });

  return { isPending, error, bookings };
}
