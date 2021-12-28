import { Edit, Delete, AddCircle } from '@mui/icons-material';
import {
  Box,
  Card,
  Grid,
  IconButton,
  Typography,
  CardContent,
  CardActionArea,
} from '@mui/material';

import styles from './style.module.css';

//TODO Handle disable state, tooltip text and styles

export function AddCard({ title, subTitle, buttonText, onOpenDialog }) {
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

export function InfoCard({
  id,
  sectionData,
  areaAction,
  firstCardAction,
  secondCardAction,
}) {
  function openView() {
    areaAction(id);
  }

  function editItem() {
    firstCardAction(id);
  }

  function deleteItem() {
    secondCardAction(id);
  }

  return (
    <Grid className={styles.gridItem} item xs={3}>
      <Card className={styles.card}>
        <CardActionArea onClick={openView}>
          <CardContent>
            <Typography className={styles.detailsInfo}>
              {sectionData[1].label}
              {sectionData[1].value}
            </Typography>
            <Typography variant='h6' className={styles.title}>
              {sectionData[2].label}
              {sectionData[2].value}
            </Typography>
            <Typography className={styles.detailsInfo}>
              {sectionData[3].label}
              {sectionData[3].value}
            </Typography>
            <Typography component='p' className={styles.bottom}>
              {sectionData[4].label}
              {sectionData[4].value}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box className={`${styles.cardActions} ${styles.rightAligned}`}>
          <IconButton onClick={editItem}>
            <Edit className={styles.icon} />
          </IconButton>
          <IconButton color='primary' onClick={deleteItem}>
            <Delete className={styles.icon} />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
}
