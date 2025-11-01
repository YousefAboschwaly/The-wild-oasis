import {  useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export  function useTodayActivity() {
  const {data:staysActivity, isPending} = useQuery({
    queryKey:["today-activity"],
    queryFn:getStaysTodayActivity
  })
  return{staysActivity, isPending}
}
