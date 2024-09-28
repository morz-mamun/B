export const handleFileDelete = (
    index,
    files,
    setFiles,
    formData,
    setFormData
  ) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
};