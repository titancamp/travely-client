import { useRef } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Chip, FormHelperText } from '@mui/material';

import styles from './style.module.css';

const acceptedFileTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'application/pdf',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ERROR_MESSAGES = {
  fileCount: 'You can add up to 5 files.',
  fileSize: 'Your file size should not exceed 20MB.',
  fileFormat:
    'Incorrect File format. The supported formats are pdf, png, jpg, xls, xlsx, doc, docx.',
};

export default function AddAttachment({
  formikRef: {
    setFieldValue,
    setFieldError,
    values: { attachments },
    errors: { attachments: error },
  },
}) {
  const hiddenFileInput = useRef(null);

  const handleClick = () => hiddenFileInput.current.click();
  const handleDelete = (id) => () =>
    setFieldValue(
      'attachments',
      attachments.filter((item) => item.id !== id)
    );

  function errorHandler(key, message) {
    setFieldError(key, message);
    setTimeout(() => setFieldError(key, null), 5000);
  }

  function handleChange(event) {
    try {
      if (event.target.files.length + attachments.length > 5) {
        throw new Error(ERROR_MESSAGES.fileCount);
      } else if (event.target.files.length) {
        const newAttachments = [...event.target.files].map((file, index) => {
          if (!acceptedFileTypes.includes(file.type)) {
            throw new Error(ERROR_MESSAGES.fileFormat);
          }
          if (file.size / 1024 ** 2 > 20) {
            throw new Error(ERROR_MESSAGES.fileSize);
          }
          file.id = (attachments[attachments.length - 1]?.id + 1 || 1) + index;
          return file;
        });
        setFieldValue('attachments', [...attachments, ...newAttachments]);
      }
    } catch (error) {
      errorHandler('attachments', error.message);
    }
  }

  return (
    <Box className={styles.attachmentContainer}>
      <Box>
        <Button className={styles.addAttachment} onClick={handleClick}>
          ADD ATTACHMENTS
          <CloudUpload className={styles.addAttachmentIcon} />
        </Button>
        <FormHelperText
          error
          className={`${
            attachments.length && (error ? styles.helperText : styles.helperDefault)
          }`}
        >
          {error}
        </FormHelperText>
        <Box>
          {attachments.map((file) => (
            <Box key={file.id} className={styles.chip}>
              <Chip label={file.name} onDelete={handleDelete(file.id)} />
            </Box>
          ))}
        </Box>
      </Box>
      <input
        multiple
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        className={styles.input}
        accept={acceptedFileTypes.join(', ')}
      />
    </Box>
  );
}
