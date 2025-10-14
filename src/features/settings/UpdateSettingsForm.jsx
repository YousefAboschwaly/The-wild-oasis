import { useSettings } from "./useSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxguestsPerBooking,
      breakfastprice,
    }={},
  } = useSettings();

  if(isPending) return <Spinner/>
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights"  defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" defaultValue={maxguestsPerBooking} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" defaultValue={breakfastprice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
