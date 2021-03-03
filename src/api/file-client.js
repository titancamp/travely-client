import ApiClient, { JsonConfig, FormDataConfig } from "./api";

const FileClient = {
    uploadFiles: function (file) {
        const formData = new FormData();

        formData.append("File", file);

        return ApiClient.post('/files', formData, FormDataConfig);
    },
    deleteFileById: function (fileId) {
        return ApiClient.delete(`files/${fileId}`, JsonConfig);
    },
};

export default FileClient;