const useStyles = () => {
  return {
    closeIcon: (theme) => ({
      position: 'absolute',
      right: 8,
      top: 8,
      color: theme.palette.grey[500],
    }),
    form: {
      py: 2,
      px: 3,
    },
    cancel: {
      color: 'text.primary',
    },
  };
};

export default useStyles;
