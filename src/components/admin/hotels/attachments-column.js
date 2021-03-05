import React from 'react';
import Attachments from "../../common/attachements";

const AttachmentsColumn = attachments =>
    <Attachments
        attachments={attachments.value}
    />;

export default AttachmentsColumn;