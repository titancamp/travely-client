import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import { TOUR_ROWS, TOUR_COLUMNS } from "./utils/constants";
import CreateTour from "./create-tour/create-tour";
import { TourDetails } from "./tour-details";

const Tour = () => {
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    setTourData(TOUR_ROWS);
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <CreateTour />
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          rows={tourData}
          columns={TOUR_COLUMNS}
          autoHeight
          autoPageSize
        />
        <TourDetails />
      </Grid>
    </Grid>
  );
};

export default Tour;
