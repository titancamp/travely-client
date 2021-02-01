import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { withStyles } from '@material-ui/core/styles';

import styles from './style'

const elements = [
    {
        component:
            <Button
                style={{ textTransform: 'initial' }}
                startIcon={<AddBoxIcon />}
            >
                Create new tour
            </Button>,
        key: "tour"
    },
    {
        component:
            <Button
                style={{ textTransform: 'initial' }}
                startIcon={<PersonIcon />}
            >
                My profile
            </Button>,
        key: "profile"
    }
]

class PageHeader extends React.Component {

    render() {
        const { classes, icon, title } = this.props;

        return (
            <div className={classes.header}>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <CardHeader
                            avatar={icon}
                            title={
                                <Typography variant='h6'>{title}</Typography>
                            }
                        />
                    </Grid>
                    {
                        elements.map((element) => (
                            <Grid item
                                xs={2}
                                key={element.key}
                                className={classes.button}
                            >
                                {element.component}
                            </Grid>
                        ))
                    }
                </Grid>
                <Divider />
            </div>
        );
    }
}

export default withStyles(styles)(PageHeader);