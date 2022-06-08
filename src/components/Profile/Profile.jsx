import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';

import { userSelector } from '../../features/auth';
import { ExitToApp } from '@mui/icons-material';
//* fetch user name from state.

const Profile = () => {
    const { user } = useSelector( userSelector );

    const favoriteMovie = {

    }

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant='h4' gutterBottom>My profile</Typography>
                <Button color='inherit' onClick={logout}>
                    Logout &nbsp; <ExitToApp />
                </Button>
            </Box>
            {!favoriteMovie.length 
                ? <Typography variant='h5'>Add favorites or watchlist some movies to see them there!</Typography>
                : (
                    <Box>
                        FAVORITE MOVIES
                    </Box>
                )
            }
        </Box>
    )
};

export default Profile