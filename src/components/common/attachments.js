import React from "react";
import Box from "@material-ui/core/Box";
import PdfAttachment from "./pdf-attachment";
import ImgAttachment from "./img-attachment";
import FileAttachment from "./file-attachment";

const Attachments = (props) => {
    const attachments = props.value;

    const attachmentComponents = {
        'pdf': PdfAttachment,
        'img': ImgAttachment,
        'png': ImgAttachment,
        'jpg': ImgAttachment,
    };

    const files = attachments.map((attachment, index) => {
        const Component = attachmentComponents.hasOwnProperty(attachment.extension)
            ? attachmentComponents[attachment.extension]
            : FileAttachment;

        return <Component
            key={index}
            name={attachment.name}
            filePath={attachment.filePath}
        />
    });

    return (
        <Box display="flex">
            {files}
        </Box>
    );
};
export default Attachments;
