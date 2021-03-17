import React from "react";
import {Select, InputLabel, FormControl, MenuItem } from "@material-ui/core";
import { dummyData } from './activities-const'
import Grid from '@material-ui/core/Grid';


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
        return (

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel id="activity-type">Activity type</InputLabel>
                <Select defaultValue='' onChange={this.handleChange} >
                        <MenuItem key={''} value={''}>{'All'}</MenuItem>
                    {this.state.activityTypes.map(activityType =>
                        <MenuItem key={activityType} value={activityType}>{activityType}</MenuItem>
                    )}
                </Select>
            </FormControl>
          </Grid>       
        </Grid>  
        );
    }
}

export default ActivityTypeSelect




