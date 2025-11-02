import { useSettings } from "./useSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isPending, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  if (isPending) return <Spinner />;
  const {
    minBookingLength,
    maxBookingLength,
    maxguestsPerBooking,
    breakfastprice,
  } = settings;

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (settings[field] == value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxguestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxguestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastprice}
          onBlur={(e) => handleUpdate(e, "breakfastprice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
