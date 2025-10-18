import { useCabins } from "./useCabins";
import toast from "react-hot-toast";

import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "./../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function CabinTable() {
  const { cabins, isPending, error } = useCabins();
  const [searchParams] = useSearchParams()
  if (error) toast.error(error.message);
  if (isPending) return <Spinner />;
  const filterValue = searchParams.get("discount") || "all"
  
  const filteredCabins = cabins.filter((cabin)=>{
    if(filterValue=== "with-discount" && cabin.discount>0) return cabin
    if(filterValue=== "no-discount" && cabin.discount==0) return cabin
    if(filterValue === "all") return cabin
  })
  console.log(filteredCabins)
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
