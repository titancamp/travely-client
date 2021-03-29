import ApiClient from "./api";

// example API object
const FileClient = {
  // example method
  upload: function (companyId, formData) {
    return ApiClient.post(`/api/file/upload?companyId=${companyId}`, formData,
      {
        headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  download: function (companyId, fileId) {
    return ApiClient.get(`/api/file/download?companyId=${companyId}&${fileId}`,
      {
        responseType: 'arraybuffer',
        headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
};

export default FileClient;