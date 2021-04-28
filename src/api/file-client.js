import ApiClient from "./api";

export const FILE_SERVICE_URL = process.env.REACT_APP_FILE_SERVICE_URL;

const FileClient = {
  upload: function (companyId, formData) {
    return ApiClient.post(
      `${FILE_SERVICE_URL}/api/file/upload?companyId=${companyId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((response) => response.data);
  },
  download: function (companyId, fileId) {
    return ApiClient.get(
      `${FILE_SERVICE_URL}/api/file/download?companyId=${companyId}&${fileId}`,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((response) => response.data);
  },
  deleteFile: function (companyId, fileId) {
    return ApiClient.delete(
      `${FILE_SERVICE_URL}/api/file?companyId=${companyId}&${fileId}`
    ).then((response) => response.data);
  },
};

export default FileClient;
