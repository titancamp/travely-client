import React, { useMemo } from "react";
import FileClient, { FILE_SERVICE_URL } from "../../../api/file-client";

const LogoUpload = ({ logoId }) => {
  const logo = useMemo(() => {
    return `${FILE_SERVICE_URL}/api/File/Download?fileId=${logoId}&companyId=${localStorage.getItem(
      "agencyId"
    )}`;
  }, [logoId]);
  if (!logoId) {
    return null;
  }

  return <img src={logo} width="100%" />;
};

export default LogoUpload;
