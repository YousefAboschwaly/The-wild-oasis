import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import SortBy from "./../../ui/SortBy";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filteredValue = searchParams.get("status") || "all";
  const filter = { field: "status", value: filteredValue, method: "eq" };

  //  SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //  PAGINATION
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    isPending,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", filter, sortBy,page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isPending, error, bookings, count };
}
