import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ResultsItem from './ResultsItem'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function FolderList({ scores, loading, name }) {
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

    if (!name) {
        return (
            <List className={classes.root} dense={true}>
                {scores.map(({ date, score, initials }) => {
                    return (
                        <ResultsItem initials={initials} score={score} date={date} key={date} />
                    )
                })}
            </List>
        );
    } else {
        return (
            <List className={classes.root} dense={true}>
                {scores.map(({ date, score, initials, userId, fullName }) => {
                    return (
                        <ResultsItem userId={userId} fullName={fullName} initials={initials} score={score} date={date} key={date} />
                    )
                })}
            </List>
        );
    }

}