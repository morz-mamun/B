import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

/**** Define custom styles ****/
const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.375rem",
    border: "1px solid #C0C0C0",
    backgroundColor: "white",
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: 500,
    color: "#6B7280",
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      borderColor: "#ff0000",
      boxShadow: "none",
    },
    "&.Mui-focused": {
      borderColor: "#ff0000",
      boxShadow: "0 0 10px rgba(106, 100, 241, 0.2)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-error": {
      borderColor: "#FF0000",
    },
  },
  "& .MuiInputBase-input": {
    padding: 0,
    "&:focus": {
      outline: "none",
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    fontSize: "0.75rem",
    color: "#FF0000",
  },
}));

/*** InputField Component ***/
const InputField = ({
  label,
  registerName,
  register,
  type,
  errors,
  required = false,
  defaultValue,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label className="mb-3 block text-sm font-medium text-gray-600 uppercase">
        {label} {required && "*"}
      </label>
      <StyledTextField
        size="small"
        fullWidth
        {...register(registerName, {
          required: required ? "This field is required" : false,
        })}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        error={!!errors[registerName]}
        helperText={errors[registerName]?.message}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,             
  registerName: PropTypes.string, 
  register: PropTypes.func,     
  type: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
};

export default InputField;
