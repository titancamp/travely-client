import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import SideBar from '../../common/SideBar';

const pages = [
    {
        title: 'Home',
        path: '/user/home',
        icon: <HomeIcon />
    },
    {
        title: 'Tour',
        path: '/user/tour',
        icon: <WorkIcon />
    }
];

class UserLayout extends React.Component {

    render() {

        return (
            <SideBar pages={pages}>
                {this.props.children}
            </SideBar>
        );
    }
}

export default UserLayout;
