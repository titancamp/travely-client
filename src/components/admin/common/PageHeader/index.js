import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import styles from './style'

class PageHeader extends React.Component {

    render() {
        const { classes, icon, title } = this.props;

        return (
            <div className={classes.header}>
                <CardHeader
                    avatar={icon}
                    title={
                        <Typography variant='h6'>{title}</Typography>
                    }
                />
                <Divider />
            </div>
        );
    }
}

export default withStyles(styles)(PageHeader);