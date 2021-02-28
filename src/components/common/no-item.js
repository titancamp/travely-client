import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HotelIcon from "@material-ui/icons/Hotel";
import Box from "@material-ui/core/Box";

class NoItem extends React.Component {

    constructor(props) {
        super(props);
    }

    onAddClick = () => {
         this.props.addNewItem();
    }

    render() {
        return (
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                style={{marginTop: '100px'}}
            >

                <Typography paragraph>
                    You haven't added any {this.props.pluralItemName} yet.
                </Typography>
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<HotelIcon/>}
                    onClick={this.onAddClick}
                >
                    Add new {this.props.singularItemName}
                </Button>
            </Box>
        );
    }
}

export default NoItem;
