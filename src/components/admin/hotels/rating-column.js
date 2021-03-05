import React from 'react';
import Rating from "@material-ui/lab/Rating/Rating";

const RatingColumn = count =>
    <Rating
        name="read-only"
        value={count.value}
        readOnly
    />;

export default RatingColumn;