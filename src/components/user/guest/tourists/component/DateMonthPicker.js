import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { convertMonthFormat } from "./DateFormats";

export default function DateMonthPicker(props) {
  const { name, label, value, onChange, disableFuture } = props;
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  const handleOnChange = (date) =>
    onChange(convertToDefEventPara(name, convertMonthFormat(date)));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disableToolbar
        inputVariant="outlined"
        disableFuture={disableFuture}
        name={name}
        value={value}
        label={label}
        openTo="year"
        format="dd/MM/yyyy"
        views={["year", "month", "date"]}
        onChange={handleOnChange}
      />
    </MuiPickersUtilsProvider>
  );
}
