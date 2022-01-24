import React from 'react';
import Downshift from 'downshift';
import { Chip, TextField, Box } from '@mui/material';
import styles from './Tag.style.css';

const errorMessage = 'You can add up to 10 tags. Each tag cannot exceed 30 characters.';
const defaultMessage =
  'Type and then press enter to create a tag. You can add up to 10 tags.';

export default function TagsInput({
  tags,
  name,
  error,
  placeholder,
  setFieldValue,
  setFieldError,
  ...other
}) {
  const [inputValue, setInputValue] = React.useState('');

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.nativeEvent.preventDefault();
      if (event.target.value.length > 30 || tags.length === 10) {
        return setFieldError(name, errorMessage);
      }
      const duplicatedValues = tags.indexOf(event.target.value.trim());

      if (duplicatedValues !== -1) {
        setFieldError('');
        return setInputValue('');
      }
      if (!event.target.value.replace(/\s/g, '').length) return;
      setInputValue('');
      setFieldValue(name, [...tags, event.target.value.trim()]);
    }
  }

  const handleDelete = (item) => () =>
    setFieldValue(
      name,
      tags.filter((tag) => item !== tag)
    );

  function handleInputChange({ target: { value } }) {
    setInputValue(value);
    !value && setFieldError(name, undefined);
  }

  return (
    <Downshift inputValue={inputValue}>
      {({ getInputProps }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder,
        });
        return (
          <div>
            <TextField
              inputProps={{ sx: { minWidth: 100, width: 0 } }}
              InputProps={{
                startAdornment: (
                  <Box className={styles.chipContainer}>
                    {tags.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        tabIndex={-1}
                        className={styles.chip}
                        onDelete={handleDelete(item)}
                      />
                    ))}
                  </Box>
                ),
                onBlur,
                onChange: (event) => {
                  onChange(event);
                  handleInputChange(event);
                },
                onFocus,
              }}
              {...other}
              {...inputProps}
              error={!!error}
              helperText={error || defaultMessage}
            />
          </div>
        );
      }}
    </Downshift>
  );
}
