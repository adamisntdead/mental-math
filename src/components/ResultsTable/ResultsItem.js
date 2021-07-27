import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem'
import Skeleton from '@material-ui/lab/Skeleton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import UserAvatar from "../UserAvatar";
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ResultsItem({ userId, fullName, score, date, initials, loading, avatar }) {
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
                {avatar || (<Avatar>
                    {initials == '' ? <PersonIcon /> : initials}
                </Avatar>)}
            </ListItemAvatar>

            {fullName ?
                (<ListItemText primary={score} secondary={<><Link
                    component={RouterLink} to={`/user/${userId}`}>{`@${fullName}`}</Link> on {`${date}`} </>} />) : (<ListItemText primary={score} secondary={date} />)}

        </ListItem>

    );
}