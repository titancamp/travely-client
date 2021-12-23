import { Edit, Delete, AddCircle } from '@mui/icons-material';
import {
  Box,
  Card,
  Grid,
  Button,
  IconButton,
  Typography,
  CardContent,
  CardActionArea,
} from '@mui/material';

import styles from './style.module.css';

//TODO Handle disable state, tooltip text and styles

export function AddCard({ title, subTitle, buttonText, onOpenDialog, disabled }) {
  return (
    <Grid className={styles.gridItem} item xs={3}>
      <CardActionArea onClick={onOpenDialog}>
        <Card className={`${styles.addCard} ${styles.card}`}>
          <CardContent>
            <Typography className={styles.title} variant='h5'>
              {title}
            </Typography>
            <Typography className={styles.subTitle}>{subTitle}</Typography>
          </CardContent>
          <Box className={styles.addButtonContainer}>
            <Typography className={styles.addButton}>{buttonText}</Typography>
            <AddCircle fontSize='small' className={styles.svg} />
          </Box>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

//TODO set Labels from props and styles on label cases
export function InfoCard({
  id,
  sectionData,
  areaAction,
  firstCardAction,
  secondCardAction,
}) {
  function openRoomView() {
    areaAction(id);
  }

  function editRoom() {
    firstCardAction(id);
  }

  function deleteRoom() {
    secondCardAction(id);
  }

  return (
    <Grid className={styles.gridItem} item xs={3}>
      <Card className={styles.card}>
        <CardActionArea onClick={openRoomView}>
          <CardContent>
            <Typography className={styles.detailsInfo}>
              Qty: {sectionData.label1}
            </Typography>
            <Typography variant='h6' className={styles.title}>
              {sectionData.label2 || 'aaa'}
            </Typography>
            <Typography className={styles.detailsInfo}>
              Beds: {sectionData.label3}
            </Typography>
            <Typography component='p' className={styles.price}>
              {sectionData.label4} AMD
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box className={`${styles.cardActions} ${styles.rightAligned}`}>
          <IconButton onClick={editRoom}>
            <Edit className={styles.icon} />
          </IconButton>
          <IconButton color='primary' onClick={deleteRoom}>
            <Delete className={styles.icon} />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
}
