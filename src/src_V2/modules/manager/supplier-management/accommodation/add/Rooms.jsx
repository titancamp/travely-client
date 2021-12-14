import {
  Card,
  Box,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { cyan, indigo } from "@mui/material/colors";

export default function Rooms() {
  return (
    <Box style={{ display: "flex" }}>
      <AddRoomCard />
      <InfoCard />
      <InfoCard />
      <InfoCard />
      <InfoCard />
    </Box>
  );
}

function InfoCard() {
  return (
    <Card
      sx={{
        maxWidth: 275,
        height: 210,
        margin: 0.5,
        border: "1 solid black",
      }}
    >
      <CardContent>
        <Typography component='p'>Qty: {12}</Typography>
        <Typography variant={'h6'}>{'Standart Single'}</Typography>
        <Typography component='p'>Beds: 2 (+1)</Typography>
      </CardContent>
      <CardActions>
        <Typography>ADD ROOM</Typography>
        <AddCircleIcon style={{ color: "blue" }} />
      </CardActions>
    </Card>
  );
}

function AddRoomCard() {
  return (
    <Card
      sx={{
        height: 210,
        maxWidth: 275,
        margin: 0.5,
        border: "1 solid black",
        backgroundColor: "#EAF4FC",
      }}
    >
      <CardContent>
        <Typography
          sx={{ marginTop: 5 }}
          gutterBottom
          variant="h5"
          component="div"
        >
          Rooms
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add Button bellow to add rooms to your accommodation
        </Typography>
      </CardContent>
      <CardActions>
        <Typography>ADD ROOM</Typography>
        <AddCircleIcon style={{ color: "blue" }} />
      </CardActions>
    </Card>
  );
}
