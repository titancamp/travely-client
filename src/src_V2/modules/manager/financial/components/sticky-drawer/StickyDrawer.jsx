import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer } from '@mui/material';
import { Button } from '@mui/material';

import styles from './StickyDrawer.module.css';

const DrawerContent = ({
  onClose,
  handleSubmit,
  onSave,
  header,
  layout,
  saveButton,
  cancelButton,
}) => {
  const saveBtn = {
    variant: 'contained',
    txt: 'Save',
    focus: true,
    color: 'primary',
    disabled: false,
    ...saveButton,
  };

  const cancelBtn = {
    variant: 'outlined',
    txt: 'Cancel',
    focus: false,
    ...cancelButton,
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*Header*/}
      <Box className={styles.mainBox}>
        {header}
        <div className={styles.closeBtnDiv}>
          <CloseIcon onClick={onClose} className={styles.closeBtn} />
        </div>
      </Box>

      {/*Layout*/}
      <Box className={styles.layout}>{layout}</Box>

      {/*Footer*/}
      <Box className={`${styles.mainBox} ${styles.footerBox}`}>
        <div className={styles.btnDiv}>
          <Button variant={cancelBtn.variant} onClick={onClose}>
            {cancelBtn.txt}
          </Button>
          <Button
            className={styles.saveBtn}
            onClick={onSave}
            variant={saveBtn.variant}
            disabled={saveBtn.disabled}
          >
            {saveBtn.txt}
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default function StickyDrawer({
  anchor = 'right',
  drawerSlideDuration = 500,
  isOpened = false,
  handleSubmit = () => void 0,
  handleSave = () => void 0,
  handleCloseDrawer = () => void 0,
  saveButton = {},
  cancelButton = {},
  header,
  layout,
  footer,
}) {
  return (
    <Drawer
      anchor={anchor}
      transitionDuration={drawerSlideDuration}
      open={isOpened}
      onClose={handleCloseDrawer}
    >
      <Box className={styles.contentDiv} role='presentation'>
        <DrawerContent
          onClose={handleCloseDrawer}
          handleSubmit={handleSubmit}
          onSave={handleSave}
          header={header}
          layout={layout}
          footer={footer}
          saveButton={saveButton}
          cancelButton={cancelButton}
        />
      </Box>
    </Drawer>
  );
}
