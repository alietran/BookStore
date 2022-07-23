const { default: axiosClient } = require("./axiosClient");

const subCateAPI = {
  getAllSubCate: () => {
    return axiosClient.get("v1/subCategories");
  },
  postCreateSubCategory: (data) => {
    const path = `/v1/subCategories`;
    return axiosClient.post(path, data);
  },
};

export default subCateAPI;
