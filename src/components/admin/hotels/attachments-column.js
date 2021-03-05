import React from 'react';
import Attachments from "../../common/attachments";

const AttachmentsColumn = attachments =>
    <Attachments
        attachments={attachments.value}
    />;

export default AttachmentsColumn;