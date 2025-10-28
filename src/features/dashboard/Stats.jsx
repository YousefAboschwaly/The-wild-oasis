import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numCabins,
  numDays,
}) {
  // 1.
  const numBookings = bookings?.length;
  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  // 3.
  const checkins = confirmedStays.length;
  //  4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * numCabins);
  // num checked-in nights / all Available Nights (num days * num cabins)

  return (
    <>
      <Stat
        title={"Bookings"}
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title={"Sales"}
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title={"Check ins"}
        color="indigo"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title={"Occupancy rate"}
        color="yellow"
        value={Math.round(occupation*100) + '%'}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}
