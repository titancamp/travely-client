import React from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';

const Stars = ({count}) => {
    let stars = [];

    while (count) {
        stars.push(<StarRateIcon key={count}/>);
        count--;
    }

    return (
        <>{stars}</>
    );
};

export default Stars;