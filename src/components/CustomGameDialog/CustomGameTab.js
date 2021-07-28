import React, { Component } from "react";

import PropTypes from "prop-types";

import validate from "validate.js";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";

import {
    DialogContent,
    Typography,
    Box,
    Slider,
    Button,
    Input,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Hidden,
    TextField,
    Tooltip,
    FormControl,
    IconButton,
    Checkbox,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    Divider,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import ClearIcon from '@material-ui/icons/Clear';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = (theme) => ({
    dialogContent: {
        paddingTop: theme.spacing(2),
        // minWidth: '450px'
    },

    badge: {
        top: theme.spacing(2),
        right: -theme.spacing(2),
    },

    rangeInput: {
        width: 42
    },

    loadingBadge: {
        top: "50%",
        right: "50%",
    },

    avatar: {
        marginRight: "auto",
        marginLeft: "auto",

        width: theme.spacing(14),
        height: theme.spacing(14),
    },

    nameInitials: {
        cursor: "default",
    },

    personIcon: {
        fontSize: theme.spacing(7),
    },

    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),

        minHeight: "initial",
    },
});

const initialState = {
    addition: true,
    subtraction: true,
    multiplication: true,
    division: true,
    duration: 120,
    durationLabelWidth: 0,

    add_left_min: 2,
    add_left_max: 100,
    add_right_min: 2,
    add_right_max: 100,
    mul_left_min: 2,
    mul_left_max: 12,
    mul_right_min: 2,
    mul_right_max: 100,
};

class AccountTab extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.durationLabel = React.createRef();
    }

    handleCheckboxChange = (event) => {
        if (!event) { return; }

        const checked = event.target.checked

        this.setState({
            [event.target.name]: checked
        })
        // const field = event.target
    }

    handleInputChange = (event) => {
        if (!event) { return; }

        const name = event.target.name
        const val = parseInt(event.target.value)

        this.setState({
            [name]: val
        })
    }

    handleDurationChange = (event) => {
        if (!event) {
            return;
        }

        const duration = event.target.value;

        if (!duration) {
            return;
        }


        this.setState(
            {
                duration
            }
        );
    };


    onStartClick = () => {
        const options = {
            add: this.state.addition,
            sub: this.state.subtraction,
            mul: this.state.multiplication,
            div: this.state.division,
            add_left_min: this.state.add_left_min,
            add_left_max: this.state.add_left_max,
            add_right_min: this.state.add_right_min,
            add_right_max: this.state.add_right_max,
            mul_left_min: this.state.mul_left_min,
            mul_left_max: this.state.mul_left_max,
            mul_right_min: this.state.mul_right_min,
            mul_right_max: this.state.mul_right_max,
            gameLength: this.state.duration,
        };

        const configString = encodeURIComponent(JSON.stringify(options))
        this.props.startGame(configString)
    }

    render() {
        const { classes } = this.props;

        return (
            <DialogContent classes={{ root: classes.dialogContent }}>

                <List disablePadding>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                        </Hidden>

                        <ListItemText
                            primary="Addition"
                            secondary="Set range below"
                        />

                        <ListItemSecondaryAction>
                            <Hidden xsDown>
                                <Checkbox
                                    color="primary"
                                    name="addition"
                                    checked={this.state.addition}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Hidden>

                            <Hidden smUp>
                                <Switch
                                    name="addition"
                                    color="primary"
                                    checked={this.state.addition}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Hidden>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                {/* <AddIcon /> */}
                            </ListItemIcon>
                        </Hidden>
                        <Typography><Input
                            className={classes.rangeInput}
                            value={this.state.add_left_min}
                            name="add_left_min"
                            // margin="dense"
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: 'number'
                            }}
                        /> &nbsp; to &nbsp; <Input
                                className={classes.rangeInput}
                                name="add_left_max"
                                value={this.state.add_left_max}
                                // margin="dense"
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number'
                                }}
                            /> &nbsp;&nbsp; + &nbsp;&nbsp; <Input
                                className={classes.rangeInput}
                                name="add_right_min"
                                value={this.state.add_right_min}
                                // margin="dense"
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number'
                                }}
                            /> &nbsp; to &nbsp; <Input
                                className={classes.rangeInput}
                                name="add_right_max"
                                value={this.state.add_right_max}
                                // margin="dense"
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number'
                                }}
                            /></Typography>
                    </ListItem>


                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <RemoveIcon />
                            </ListItemIcon>
                        </Hidden>

                        <ListItemText
                            primary="Subtraction"
                            secondary="Addition problems in reverse"
                        />

                        <ListItemSecondaryAction>
                            <Hidden xsDown>
                                <Checkbox
                                    color="primary"
                                    name="subtraction"
                                    checked={this.state.subtraction}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Hidden>

                            <Hidden smUp>
                                <Switch
                                    name="subtraction"
                                    color="primary"
                                    checked={this.state.subtraction}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Hidden>
                        </ListItemSecondaryAction>
                    </ListItem>


                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <ClearIcon />
                            </ListItemIcon>
                        </Hidden>

                        <ListItemText
                            primary="Multiplication"
                            secondary="Set range below"
                        />

                        <ListItemSecondaryAction>
                            <Hidden xsDown>
                                <Checkbox
                                    color="primary"
                                    name="multiplication"
                                    checked={this.state.multiplication}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Hidden>

                            <Hidden smUp>
                                <Switch
                                    name="multiplication"
                                    color="primary"
                                    checked={this.state.multiplication}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Hidden>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                {/* <AddIcon /> */}
                            </ListItemIcon>
                        </Hidden>
                        <Typography><Input
                            className={classes.rangeInput}
                            name="mul_left_min"
                            value={this.state.mul_left_min}
                            // margin="dense"
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: 'number'
                            }}
                        /> &nbsp; to &nbsp; <Input
                                className={classes.rangeInput}
                                name="mul_left_max"
                                value={this.state.mul_left_max}
                                // margin="dense"
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number'
                                }}
                            /> &nbsp;&nbsp; + &nbsp;&nbsp; <Input
                                className={classes.rangeInput}
                                value={this.state.mul_right_min}
                                name="mul_right_min"
                                // margin="dense"
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number'
                                }}
                            /> &nbsp; to &nbsp; <Input
                                className={classes.rangeInput}
                                value={this.state.mul_right_max}
                                name="mul_right_max"
                                // margin="dense"
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number'
                                }}
                            /></Typography>
                    </ListItem>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <MoreVertIcon />
                            </ListItemIcon>
                        </Hidden>

                        <ListItemText
                            primary="Division"
                            secondary="Multiplication problems in reverse"
                        />

                        <ListItemSecondaryAction>
                            <Hidden xsDown>
                                <Checkbox
                                    color="primary"
                                    name="division"
                                    checked={this.state.division}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Hidden>

                            <Hidden smUp>
                                <Switch
                                    name="division"
                                    color="primary"
                                    checked={this.state.division}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Hidden>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <AddAlarmIcon />
                            </ListItemIcon>
                        </Hidden>

                        <FormControl
                            fullWidth
                            variant="outlined"
                        >
                            <InputLabel ref={this.durationLabel}>
                                Duration
                            </InputLabel>

                            <Hidden smUp>
                                <Select
                                    native
                                    value={this.state.duration}
                                    labelWidth={this.state.durationLabelWidth}
                                    onChange={this.handleDurationChange}
                                >
                                    <option value={30}>30 Seconds</option>
                                    <option value={60}>60 Seconds</option>
                                    <option value={120}>120 Seconds</option>
                                    <option value={300}>300 Seconds</option>
                                    <option value={600}>600 Seconds</option>
                                </Select>
                            </Hidden>

                            <Hidden xsDown>
                                <Select
                                    value={this.state.duration}
                                    onChange={this.handleDurationChange}
                                    labelWidth={this.state.durationLabelWidth}
                                >
                                    <MenuItem value={30}>30 Seconds</MenuItem>
                                    <MenuItem value={60}>60 Seconds</MenuItem>
                                    <MenuItem value={120}>120 Seconds</MenuItem>
                                    <MenuItem value={300}>300 Seconds</MenuItem>
                                    <MenuItem value={600}>600 Seconds</MenuItem>
                                </Select>
                            </Hidden>
                        </FormControl>
                    </ListItem>


                    <Box mt={1} mb={1}>
                        <Divider light />
                    </Box>

                    <ListItem>
                        <ListItemIcon>
                            <WhatshotIcon />
                        </ListItemIcon>


                        <ListItemSecondaryAction>
                            <Button
                                color="primary"
                                disabled={!this.state.addition && !this.state.multiplication && !this.state.division && !this.state.subtraction}
                                variant="contained"
                                onClick={this.onStartClick}
                            >
                                Start
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </DialogContent>
        );
    }

    componentDidMount() {
        this.setState({
            durationLabelWidth: this.durationLabel.current.offsetWidth
        });
    }

    componentWillUnmount() {
        const { avatarUrl } = this.state;

        if (avatarUrl) {
            URL.revokeObjectURL(avatarUrl);

            this.setState({
                avatarUrl: "",
            });
        }
    }
}

AccountTab.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Properties
    user: PropTypes.object.isRequired,
    userData: PropTypes.object,

    // Functions
    openSnackbar: PropTypes.func.isRequired,

    // Events
    onDeleteAccountClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AccountTab);
