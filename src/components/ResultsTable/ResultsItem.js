import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem'
import Skeleton from '@material-ui/lab/Skeleton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import UserAvatar from "../UserAvatar";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ResultsItem({ fullName, score, date, initials, loading }) {
    const classes = useStyles();

    if (loading) {
        return (
            <ListItem>
                <ListItemAvatar>
                    <Skeleton variant="circle" ><Avatar /></Skeleton>
                </ListItemAvatar>
                <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
            </ListItem>
        )
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {initials == '' ? <PersonIcon /> : initials}
                </Avatar>
            </ListItemAvatar>
            {fullName ?
                (<ListItemText primary={score} secondary={`${fullName} on ${date}`} />) : (<ListItemText primary={score} secondary={date} />)}

        </ListItem>

    );
}