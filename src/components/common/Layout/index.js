import React from 'react';
import AdminLayout from '../../admin/AdminLayout';
import UserLayout from '../../user/UserLayout';
import Login from '../Login';

class Layout extends React.Component {
    render() {
        const { pathname } = this.props.history.location;

        if (pathname.startsWith("/admin")) {

            return (
                <AdminLayout>{this.props.children}</AdminLayout>
            );
        }

        if (pathname.startsWith("/user")) {

            return (
                <UserLayout>{this.props.children}</UserLayout>
            );
        }

        return (
            <Login></Login>
        );
    }
}

export default Layout;
