import ApiClient from "./api";

// example API object
const FileClient = {
  // example method
  upload: function (companyId, formData) {
    return ApiClient.post(`https://localhost:44384/api/file/upload?companyId=${companyId}`, formData,
      {
        headers: {
        // Authorization: "Bearer " + jwtToken,
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  download: function (companyId, fileId) {
    return ApiClient.get(`https://localhost:44384/api/file/download?companyId=${companyId}&${fileId}`,
      {
        responseType: 'arraybuffer',
        headers: {
        // Authorization: "Bearer " + jwtToken,
        'Content-Type': 'multipart/form-data'
      }
    });
  },
};

export default FileClient;
