import { useRef, useState } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Chip, FormHelperText } from '@mui/material';

import styles from './style.module.css';

export default function AddAttachment({ formikRef: parentRef }) {
  const hiddenFileInput = useRef(null);
  const [files, setFiles] = useState([]);
  const acceptedFileTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'application/pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
  ];

  const handleClick = () => hiddenFileInput.current.click();
  const handleDelete = (id) => () => {
    const a = files.filter((item) => item.id !== id);
    setFiles(a);
  };

  function errorHandler(key, message) {
    parentRef.setFieldError(key, message);
    setTimeout(() => parentRef.setFieldError(key, null), 5000);
  }

  function handleChange(event) {
    try {
      if (event.target.files.length + files.length > 5) {
        throw new Error('Maximum files count is 5');
      } else if (event.target.files.length) {
        const newFiles = [...event.target.files].map((file, index) => {
          if (!acceptedFileTypes.includes(file.type) || file.size / 1024 ** 2 > 20) {
            throw new Error(
              'Supported file types are .png, .jpeg, .jpg, .doc,.docx, .pdf, .xls, .xlsx'
            );
          }
          file.id = (files[files.length - 1]?.id + 1 || 1) + index;
          return file;
        });
        setFiles([...files, ...newFiles]);
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
        {parentRef.errors.attachments && (
          <FormHelperText error className={styles.helperText}>
            {parentRef.errors.attachments}
          </FormHelperText>
        )}
      </Box>
      <Box className={styles.filesSection}>
        <Box>
          {files.map((file) => (
            <Chip
              key={file.id}
              label={file.name}
              className={styles.chip}
              onDelete={handleDelete(file.id)}
            />
          ))}
        </Box>
      </Box>
      <input
        multiple
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        className={styles.input}
        accept='image/*, .doc,.docx, .pdf, .xls, .xlsx'
      />
    </Box>
  );
}
