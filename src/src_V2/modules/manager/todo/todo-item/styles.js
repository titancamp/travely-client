const useStyles = (isArchived) => {
    return {
        card: {
            my: 1,
            boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
            borderRadius: 2,
        },
        iconWithInfo: {
            display: 'flex',
            alignItems: 'center',
        },
        icon: {
            width: 16,
            height: 16,
            mr: 1,
        },
        contentContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        content: theme => ({
            pt: 0,
            '&:last-child': {
                paddingBottom: 0,
            },
            borderLeft: `1px solid ${theme.palette.divider}`,
            borderRight: isArchived ? '' : `1px solid ${theme.palette.divider}`,
            mt: 1,
            width: '100%',
            height: '100%',
        }),
        description: {
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        actions: {
            height: '100%',
        },

    };
};

export default useStyles;

