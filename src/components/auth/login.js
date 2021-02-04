import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export let isAuthenticated = false;

export default function Login() {
    return (
        <div>
            <Typography paragraph>
                The 'Login' Page comming soon...
            </Typography>
            <Button variant='contained' onClick={() => { isAuthenticated = true }}>
                <Link to='/admin'>
                    Login
                </Link>
            </Button>
        </div>
    );
}