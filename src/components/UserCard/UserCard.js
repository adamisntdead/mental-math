import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, Box, Typography, Tabs, Tab } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import moment from 'moment'
import ResultsTable from '../ResultsTable'
import { firestore } from "../../firebase";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

// const scores = [
//   { date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), score: 31 },
//   { date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), score: 21 },
//   { date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), score: 31 },
//   { date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), score: 31 },
//   { date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), score: 11 },
//   { date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), score: 21 },
//   { date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), score: 31 },
//   { date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), score: 1231 },
//   { date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), score: 1 }
// ]

function UserCard(props) {
  const p = useParams()
  const { userId } = useParams();
  const user = props.user;
  const [value, setValue] = useState(0);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const orderBy = value == 0 ? 'date' : 'score'
    return firestore
      .collection("users")
      .doc(userId)
      .collection('scores')
      .orderBy(orderBy, 'desc')
      .limit(25)
      .onSnapshot(
        (snapshot) => {
          const data = snapshot.docs.map(d => {
            return {
              score: d.data().score,
              date: moment(d.data().date).format("MMMM Do YYYY, h:mm:ss a"),
              initials: user.firstName == "" ? "" : `${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`.split(" ").map((n) => n[0]).join("").toUpperCase()
            }
          })
          setScores(data)
          setLoading(false);
          // setUser(snapshot.data());
        }
      );
  }, [userId, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Card>
      <CardHeader
        title={`${user.firstName} ${user.lastname || ''} `}
        subheader={user.username}
      />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Recent Scores" {...a11yProps(0)} />
        <Tab label="High Scores" {...a11yProps(1)} />
        <Tab label="Progress" {...a11yProps(2)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {scores.length == 0 && !loading ? 'This user has not completed any games.' : <ResultsTable scores={scores} loading={loading} />}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {scores.length == 0 && !loading ? 'This user has not completed any games.' : <ResultsTable scores={scores} loading={loading} />}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Coming Soon
        </TabPanel>
      </SwipeableViews>
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;

// <Box mb={1.5}>
//                     {avatar && avatarUrl && (
//                       <Badge
//                         classes={{ badge: classes.badge }}
//                         badgeContent={
//                           <Tooltip title="Remove">
//                             <Fab
//                               classes={{ sizeSmall: classes.small }}
//                               color="secondary"
//                               disabled={performingAction}
//                               size="small"
//                               onClick={this.removeAvatar}
//                             >
//                               <CloseIcon fontSize="small" />
//                             </Fab>
//                           </Tooltip>
//                         }
//                       >
//                         {loadingAvatar && (
//                           <Badge
//                             classes={{ badge: classes.loadingBadge }}
//                             badgeContent={
//                               <Fade
//                                 style={{ transitionDelay: "1s" }}
//                                 in={loadingAvatar}
//                                 unmountOnExit
//                               >
//                                 <CircularProgress size={120} thickness={1.8} />
//                               </Fade>
//                             }
//                           >
//                             <Avatar
//                               className={classes.avatar}
//                               alt="Avatar"
//                               src={avatarUrl}
//                             />
//                           </Badge>
//                         )}

//                         {!loadingAvatar && (
//                           <Avatar
//                             className={classes.avatar}
//                             alt="Avatar"
//                             src={avatarUrl}
//                           />
//                         )}
//                       </Badge>
//                     )}

//                     {!avatar && !avatarUrl && (
//                       <>
//                         {user.photoURL && (
//                           <Badge
//                             classes={{ badge: classes.badge }}
//                             badgeContent={
//                               <Tooltip title="Remove">
//                                 <Fab
//                                   classes={{ sizeSmall: classes.small }}
//                                   color="secondary"
//                                   disabled={performingAction}
//                                   size="small"
//                                   onClick={this.removeAvatar}
//                                 >
//                                   <CloseIcon fontSize="small" />
//                                 </Fab>
//                               </Tooltip>
//                             }
//                           >
//                             {loadingAvatar && (
//                               <Badge
//                                 classes={{ badge: classes.loadingBadge }}
//                                 badgeContent={
//                                   <Fade
//                                     style={{ transitionDelay: "1s" }}
//                                     in={loadingAvatar}
//                                     unmountOnExit
//                                   >
//                                     <CircularProgress
//                                       size={120}
//                                       thickness={1.8}
//                                     />
//                                   </Fade>
//                                 }
//                               >
//                                 <Avatar
//                                   className={classes.avatar}
//                                   alt="Avatar"
//                                   src={user.photoURL}
//                                 />
//                               </Badge>
//                             )}

//                             {!loadingAvatar && (
//                               <Avatar
//                                 className={classes.avatar}
//                                 alt="Avatar"
//                                 src={user.photoURL}
//                               />
//                             )}
//                           </Badge>
//                         )}

//                         {!user.photoURL && (
//                           <>
//                             {loadingAvatar && (
//                               <Badge
//                                 classes={{ badge: classes.loadingBadge }}
//                                 badgeContent={
//                                   <Fade
//                                     style={{ transitionDelay: "1s" }}
//                                     in={loadingAvatar}
//                                     unmountOnExit
//                                   >
//                                     <CircularProgress
//                                       size={120}
//                                       thickness={1.8}
//                                     />
//                                   </Fade>
//                                 }
//                               >
//                                 <Avatar className={classes.avatar} alt="Avatar">
//                                   {this.getNameInitialsOrIcon()}
//                                 </Avatar>
//                               </Badge>
//                             )}

//                             {!loadingAvatar && (
//                               <Avatar className={classes.avatar} alt="Avatar">
//                                 {this.getNameInitialsOrIcon()}
//                               </Avatar>
//                             )}
//                           </>
//                         )}
//                       </>
//                     )}
//                   </Box>