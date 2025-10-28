import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


export default function DashboardLayout() {
  const {bookings, isPending} = useRecentBookings()
  const {stays,confirmedStays,isPending:isPending2 , numDays} = useRecentStays()
  const {cabins , isPending:isPending3} = useCabins()
  if(isPending || isPending2 || isPending3) return <Spinner/>

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} numCabins={cabins.length} />
      <div>Today's and activity</div>
      <div>Charts and durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}
