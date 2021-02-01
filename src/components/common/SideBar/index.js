import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import { withStyles } from '@material-ui/core/styles';

import styles from './style'

class SideBar extends React.Component {
    constructor() {
        super();
        this.state = {
            activeSelected: ''
        }
        this.onSelectPage = this.onSelectPage.bind(this)
    }

    onSelectPage(element) {
        this.setState({ activeSelected: element })
    }

    render() {
        const { classes, pages } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.drawer}>

                    <CardHeader
                        avatar={
                            <AirplanemodeActiveIcon className={classes.logo} />
                        }
                        title={
                            <Typography variant='h5'>Travelly</Typography>
                        }
                    />
                    <Divider />
                    <List className={classes.nav}>
                        {
                            pages.map(({ title, path, icon }, index) => (
                                <ListItem
                                    component='a'
                                    href={path}
                                    button
                                    key={title}
                                    onClick={() => this.onSelectPage(index)}
                                    selected={this.state.activeSelected === index ? true : false}
                                >
                                    {icon}
                                    <ListItemText primary={title} />
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
                <React.Fragment>
                    <CssBaseline />
                    <Container className={classes.container} maxWidth="xl" >
                        {this.props.children}
                    </Container>
                </React.Fragment>
            </div>
        );
    }
}

export default withStyles(styles)(SideBar);
