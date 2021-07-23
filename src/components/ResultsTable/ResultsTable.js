import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import Skeleton from '@material-ui/lab/Skeleton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import PersonIcon from '@material-ui/icons/Person';

import ResultsItem from './ResultsItem'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function FolderList({ scores, loading }) {
    const classes = useStyles();

    if (loading) {
        return (
            <List className={classes.root} dense={true}>
                <ResultsItem loading={true} />
                <ResultsItem loading={true} />
                <ResultsItem loading={true} />
            </List>
        )
    }

    return (
        <List className={classes.root} dense={true}>
            {scores.map(({ date, score }) => {
                return (
                    <ResultsItem score={score} date={date} key={date} />
                )
            })}
        </List>
    );
}