import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import { TOUR_COLUMNS } from "./utils/constants";
import CreateTour from "./create-tour/create-tour";
import TourClient from "../../../api/tour-client";

const Tour = () => {
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    TourClient.getAllTours().then(({ data }) => {
      setTourData(
        data.map((d) => {
          const startDate = new Date(d.startDate);
          const endDate = new Date(d.endDate);
          d.startDate = `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`;
          d.endDate = `${endDate.getDate()}/${endDate.getMonth()}/${endDate.getFullYear()}`;
          return d;
        })
      );
    });
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
