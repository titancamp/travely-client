import Box from "@mui/material/Box";
import styles from "./style.module.css";
import { Autocomplete, Button, FormControl, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { AccommodationTypes } from "../constants";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function FilterBlock () {
  return (
    <Box className={styles.box}>
      <div className={styles.leftSection}>
        <Typography className={styles.title}>Accomodations</Typography>
        <Grid container rowSpacing={3} spacing={2}>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label="Type*" />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label="Region*" />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label="City*" />}
            />
          </Grid>
          <Grid item>
            <FormControl className={styles.priceInp}>
              <InputLabel htmlFor="outlined-adornment-amount">Price from</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Price from"
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={styles.priceInp}>
              <InputLabel htmlFor="outlined-adornment-amount">Price to</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Price to"
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div className={styles.rightSection}>
        <Grid item className={styles.filterBtnsBlock}>
          <Button variant="outlined" component="span">All Filters</Button>
          <Button variant="contained" className={styles.addBtn} component="span" startIcon={<AddCircleIcon />}>Add new</Button>
        </Grid>
      </div>
    </Box>
  );
}
