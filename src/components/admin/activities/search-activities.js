import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

export default class SearchActivities extends React.Component {
  constructor(props) {
    super(props);
    this.onTextChanged = this.onTextChanged.bind(this);
  }

  onTextChanged(e) {
    const searchTerm = e.target.value;
    this.props.filter(searchTerm);
  }

  render() {
    return (
      <TextField
        id='searchInput'
        placeholder='Search Attributes by name or address'
        fullWidth
        margin='normal'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={this.onTextChanged}
      />
    );
  }
}
