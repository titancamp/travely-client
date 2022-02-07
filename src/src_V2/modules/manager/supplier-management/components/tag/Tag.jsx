import { Box, Chip, TextField } from '@mui/material';
import Downshift from 'downshift';
import React, { useCallback } from 'react';

const MESSAGES = {
  errorMessage: 'You can add up to 10 tags. Each tag cannot exceed 30 characters.',
  defaultMessage: 'Type and then press enter to create a tag. You can add up to 10 tags.',
};

const sxStyles = {
  chip: { margin: 0.5 },
  chipContainer: { padding: 0.5 },
  inputProps: { sx: { minWidth: 100, width: 0 } },
};

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

  const onKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      event.nativeEvent.preventDefault();
      if (event.target.value.length > 30 || tags.length === 10) {
        return setFieldError(name, MESSAGES.errorMessage);
      }

      if (!event.target.value.replace(/\s/g, '').length) return;
      setInputValue('');
      setFieldValue(name, [...tags, event.target.value.trim()]);
    }
  });

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
          onKeyDown,
          placeholder,
        });
        return (
          <div>
            <TextField
              inputProps={sxStyles.inputProps}
              InputProps={{
                startAdornment: (
                  <Box sx={sxStyles.chipContainer}>
                    {tags.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        tabIndex={-1}
                        sx={sxStyles.chip}
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
              helperText={error || MESSAGES.defaultMessage}
            />
          </div>
        );
      }}
    </Downshift>
  );
}
