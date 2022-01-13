import { useRef, useState } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Chip, FormHelperText } from '@mui/material';

import styles from './style.module.css';

export default function AddAttachment({ formikRef, label }) {
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
    formikRef.setFieldError(key, message);
    setTimeout(() => formikRef.setFieldError(key, null), 5000);
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
    <Box className={styles.mnRow}>
      <Box>
        <Button className={styles.addAttachment} onClick={handleClick}>
          {label ? label : ''}
          <CloudUpload style={{ marginLeft: 10 }} />
        </Button>
        {formikRef.errors.attachments && (
          <FormHelperText error sx={{ marginTop: 2 }}>
            {formikRef.errors.attachments}
          </FormHelperText>
        )}
      </Box>
      <Box style={{ marginLeft: 20, width: 600 }}>
        <Box>
          {files.map((file) => (
            <Chip
              key={file.id}
              label={file.name}
              style={{ margin: 5 }}
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
        style={{ display: 'none' }}
        accept='.png, .jpeg, .jpg, .doc,.docx, .pdf, .xls, .xlsx'
      />
    </Box>
  );
}
