import React from 'react';
import Box from "@material-ui/core/Box";
import Attachment from './attachement'

const Attachments = ({attachments}) => {
    const files = attachments.map((attachment, index) =>
        <Attachment key={index}
                    name={attachment.name}
                    filePath={attachment.filePath}
                    extension={attachment.extension}/>
    );

    return (
        <Box display={'flex'}>
            {files}
        </Box>
    );
};
export default Attachments;