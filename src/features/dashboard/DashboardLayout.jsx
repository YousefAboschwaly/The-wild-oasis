import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


export default function DashboardLayout() {
  const {bookings, isPending} = useRecentBookings()
  const {stays,confirmedStays,isPending:isPending2} = useRecentStays()
  if(isPending || isPending2) return <Spinner/>

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays}/>
      <div>Today's and activity</div>
      <div>Charts and durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}
