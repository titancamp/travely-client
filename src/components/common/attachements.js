import React from 'react';
import Box from "@material-ui/core/Box";
import PdfAttachment from "./pdf-attachement";
import ImgAttachment from "./img-attachement";
import FileAttachment from "./file-attachement";

const Attachments = ({attachments}) => {
    const files = attachments.map((attachment, index) => {
        switch (attachment.extension) {
            case 'pdf':
                return (
                    <PdfAttachment
                        key={index}
                        name={attachment.name}
                        filePath={attachment.filePath}
                    />
                );
            case 'img':
            case 'png':
            case 'jpg':
                return (
                    <ImgAttachment
                        key={index}
                        name={attachment.name}
                        filePath={attachment.filePath}
                    />
                );
            default:
                return (
                    <FileAttachment
                        key={index}
                        name={attachment.name}
                        filePath={attachment.filePath}
                    />
                );
        }
    });

    return (
        <Box display={'flex'}>
            {files}
        </Box>
    );
};
export default Attachments;