export const handleChange = (index, e, formData, setFormData, fieldName) => {
    const updatedFormData = [...formData];
    updatedFormData[index][fieldName] = e.target.value.replace(/\s+/g, " ");
  
    setFormData(updatedFormData);
  };