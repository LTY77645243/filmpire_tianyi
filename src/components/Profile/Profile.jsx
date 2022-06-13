import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';

import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import { ExitToApp } from '@mui/icons-material';
import { RatedCards } from '..';

const Profile = () => {
    const { user } = useSelector( userSelector );

    const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
    const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});

    useEffect(() => {
        refetchFavorites();
        refetchWatchlisted();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
                ? <Typography variant='h5'>Add favorites or watchlist some movies to see them here!</Typography>
                : (
                    <Box>
                        <RatedCards title='Favorite Movies' data={favoriteMovies} />
                        <RatedCards title='Watchlist' data={watchlistMovies} />
                    </Box>
                )}
        </Box>
    );
};

export default Profile;