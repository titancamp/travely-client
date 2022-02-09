import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Chip,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

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
        <Box className={styles.cardActions}>
          <IconButton onClick={openEditDialog}>
            <Edit />
          </IconButton>
          <IconButton onClick={openDeleteDialog}>
            <Delete />
          </IconButton>
        </Box>
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
              <Typography>{guide.sex.label}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>Languages</Typography>
            {guide.languages.map((item) => (
              <Box key={item.id} className={styles.chip}>
                <Chip label={item.label} key={item.id} />
              </Box>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography>Skills</Typography>
            {guide.skills.map((item) => (
              <Box key={item.id} className={styles.chip}>
                <Chip label={item} key={item} />
              </Box>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
    </Box>
  );
}
