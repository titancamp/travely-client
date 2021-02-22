import React from "react";

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from "@material-ui/core";


export default function RadioGroup(props) {

  const { name, label, value, onChange, items } = props;


  return (

    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row
                     name={name}
                     value={value}
                     onChange={onChange}
      >
        {
          items.map((item) => (
            <FormControlLabel value={item.id} key={item.id} control={<Radio color="primary"/>}
                              label={item.title}></FormControlLabel>
          ))
        }


      </MuiRadioGroup>
    </FormControl>

  );
}