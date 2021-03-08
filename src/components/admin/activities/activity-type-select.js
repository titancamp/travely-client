import React from "react";
import {Select, InputLabel, FormControl, MenuItem } from "@material-ui/core";
import { dummyData } from './activities-const'
import { withStyles } from '@material-ui/styles';


const useStyles = theme => ({
    activityselect: {
       minWidth: 120,
     },
});


class ActivityTypeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getTypes = this.getTypes.bind(this);

        this.state = {
            activityTypes: [],
            searchTerm: ''
        };
    }
    
    componentDidMount(){
        this.getTypes()
    }

    handleChange(e) {
        const searchTerm = e.target.value;
        this.props.filterByType(searchTerm);
    };

    getTypes() {
          const unique = [...new Set(dummyData.map(item => item.type))];
          this.setState({activityTypes: unique});
    }

    render() {
        const { classes } = this.props;
        return (
            <FormControl className={classes.activityselect}>
                <InputLabel id="activity-type">Activity type</InputLabel>
                <Select onChange={this.handleChange} >
                    {this.state.activityTypes.map(activityType =>
                        <MenuItem key={activityType} value={activityType}>{activityType}</MenuItem>
                    )}
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(useStyles)(ActivityTypeSelect)




