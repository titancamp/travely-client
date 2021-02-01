import React from 'react';
import SideBar from '../../common/SideBar';

const pages = [
    {
        title: 'Agency Profile',
        path: '/admin/agencyProfile'
    },
    {
        title: 'Manage Staff',
        path: '/admin/manageStaff'
    },
    {
        title: 'Manage Hotels',
        path: '/admin/manageHotels'
    },
    {
        title: 'Manage Activities',
        path: '/admin/manageActivities'
    },
    {
        title: 'Change Password',
        path: '/admin/changePassword'
    }
];

class AdminLayout extends React.Component {

    render() {

        return (
            <SideBar pages={pages}>
                {this.props.children}
            </SideBar>
        );
    }
}

export default AdminLayout;
