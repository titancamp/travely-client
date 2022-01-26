import {
  Box,
  Grid,
  Chip,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import styles from './style.module.css';

export default function ViewRoomDialog({ data: { state: guide, actions } }) {
  function openDeleteDialog() {
    actions.openDeleteCardDialog(guide.id);
  }

  function openEditDialog() {
    actions.openEditCardDialog(guide.id);
  }

  return (
    <Box>
      <DialogTitle className={styles.viewDialogTitle}>
        <Typography className={styles.dialogTitle}>Guide / Details</Typography>
        {actions && (
          <Box className={`${styles.cardActions} ${styles.rightAligned}`}>
            <IconButton onClick={openEditDialog}>
              <Edit />
            </IconButton>
            <IconButton onClick={openDeleteDialog}>
              <Delete />
            </IconButton>
          </Box>
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item>
            {guide.image ? (
              <Box
                component='img'
                alt='Guide profile picture.'
                src={guide.image.previewImage}
                className={styles.previewImage}
              />
            ) : (
              <Box className={styles.uploadImageContainer} />
            )}
          </Grid>
          <Grid item container xs={6} spacing={3}>
            <Grid item xs={8}>
              <Typography>Name</Typography>
              <Typography className={styles.name}>{guide.name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Year of experience</Typography>
              <Typography>{guide.experience}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Email</Typography>
              <Typography>{guide.email}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Phone</Typography>
              <Typography>+374 {guide.phone}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Sex</Typography>
              <Typography>{guide.sex}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>Languages</Typography>
            {guide.languages.map((item) => (
              <Chip label={item.label} key={item.id} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography>Skills</Typography>

            {guide.skills.map((item) => (
              <Chip label={item} key={item} />
            ))}
          </Grid>
        </Grid>
      </DialogContent>
    </Box>
  );
}
