import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import { TOUR_ROWS, TOUR_COLUMNS } from "./utils/constants";
import CreateTour from "./create-tour/create-tour";

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
      </Grid>
    </Grid>
  );
};

export default Tour;
