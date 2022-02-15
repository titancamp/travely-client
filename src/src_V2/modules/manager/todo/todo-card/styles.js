const styles = {
  iconWithInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    mr: 1,
  },
  card: {
    width: '100%',
  },
  description: {
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  info: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  paper: (theme) => ({
    width: 357,
    padding: theme.spacing(1),
  }),
  readAll: {
    cursor: 'pointer',
    display: 'inline',
  },
};

export default styles;
