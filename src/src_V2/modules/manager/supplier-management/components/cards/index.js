import { Edit, Delete, AddCircle } from '@mui/icons-material';
import {
  Box,
  Card,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  CardContent,
  CardActionArea,
} from '@mui/material';

import { Person } from '@mui/icons-material';

import styles from './style.module.css';

//TODO disable icon

export function AddCard({
  title,
  disabled,
  subTitle,
  buttonText,
  onOpenDialog,
  tooltipKeyWord,
}) {
  function openDialog() {
    if (!disabled) {
      onOpenDialog();
    }
  }

  return (
    <Grid className={styles.gridItem} item xs={3}>
      <CardActionArea onClick={openDialog}>
        <Card
          className={`${styles.addCard} ${styles.card} ${
            disabled ? styles.disabledCard : ''
          }`}
        >
          <CardContent className={styles.addCardContent}>
            {disabled && (
              <Tooltip
                arrow
                placement='bottom'
                title={`Maximum 50 ${tooltipKeyWord}s allowed, please delete an existing ${tooltipKeyWord} to add a new one.`}
                className={styles.toolTip}
              >
                <Person className={disabled ? styles.addButtonDisabled : ''} />
              </Tooltip>
            )}
            <Typography className={styles.title} variant='h5'>
              {title}
            </Typography>
            <Typography className={styles.subTitle}>{subTitle}</Typography>
          </CardContent>
          <Box className={styles.addButtonContainer}>
            <Typography
              className={`${styles.addButton} ${
                disabled ? styles.addButtonDisabled : ''
              }`}
            >
              {buttonText}
            </Typography>
            <AddCircle
              fontSize='small'
              className={`${styles.svg} ${disabled ? styles.addButtonDisabled : ''}`}
            />
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
        <CardActionArea onClick={openView} className={styles.cardContent}>
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
