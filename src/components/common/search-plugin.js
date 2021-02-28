import React from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

export default class SearchPlugin extends React.Component{
   constructor(props) {
       super(props);
       this.onTextChanged = this.onTextChanged.bind(this);
   }

    onTextChanged(e){
        const searchTerm = e.target.value.trim();
        this.props.filter(searchTerm);
    }

    render() {
        return(
        <TextField
            id="searchInput"
            style={{margin: 8}}
            placeholder="Search hotels by name, contact or address"
            fullWidth
            margin="normal"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                ),
            }}
            onChange={this.onTextChanged}
        />);
    }
}
