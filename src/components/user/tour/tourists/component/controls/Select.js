import React from "react";
import { FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, Select as MuiSelect } from "@material-ui/core";

export default function Select(props) {

  const { name, label, value, error = null, onChange, options } = props;

  const useStyles = makeStyles((theme) => ({
    formControl: {

      minWidth: 240
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined"
                 {...(error && { error: true, helperText: error })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}>
        <MenuItem value=""><em>None</em></MenuItem>
        {
          options.map(
            item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
          )}

      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}