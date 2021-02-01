const drawerWidth = 240;

const styles = () => ({
    root: {
        display: 'flex',
        height: '100vh'
    },
    drawer: {
        backgroundColor: 'white',
        width: drawerWidth,
        borderRight: '2px solid #bbbbbb'
    },
    nav: {
        '& a': {
            height: '38px',
        },
        '& span': {
            color: '#52529e',
            textDecoration: 'underline',
            fontWeight: 500
        }
    },
    logo: {
        fontSize: '32px',
        transform: 'rotate(45deg)',
        display: 'inline-block',
        '-webkit-transform': 'rotate(45deg)',
        '-moz-transform': 'rotate(45deg)',
        '-ms-transform': 'rotate(45deg)',
        '-o-transform': 'rotate(45deg)'
    },
    container: {
        width: '100%',
        paddingTop: '100px'
    }
});

export default styles;