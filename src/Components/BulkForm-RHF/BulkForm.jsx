import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { FaFileAlt, FaUpload } from "react-icons/fa";
import InputField from "./InputField";

const BulkFileForm = () => {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();
  const fileInputField = useRef(null);
  const [files, setFiles] = useState([]);
  const [coverPictures, setCoverPictures] = useState({});

  const clickInputField = () => {
    fileInputField.current.click();
  };

  const onSelectedFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 10) {
      alert("You cannot upload more than 10 files at a time");
      setFiles([]);
    } else {
      setFiles(selectedFiles);
    }
  };

  const removeFile = (index) => {
    unregister(`files[${index}]`);

    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newCoverPictures = { ...coverPictures };
    delete newCoverPictures[index];
    setCoverPictures(newCoverPictures);
  };

  const handleCoverPictureChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPictures((prevState) => ({
        ...prevState,
        [index]: file,
      }));
    }
  };

  const onSubmit = (data) => {
    data.files.forEach((fileData, index) => {
      const profilePictureFile = files[index];
      const coverPictureFile = coverPictures[index];

      if (profilePictureFile) {
        fileData.profilePicture = profilePictureFile;
      }

      if (coverPictureFile) {
        fileData.coverPicture = coverPictureFile;
      }
    });

    // Loop for api 
    const formData = data.files;
    for (let i = 0; i < formData.length; i++) {
      const element = formData[i];
      console.log(element);
    }
    console.log("Processed form data:", data.files);
  };


  return (
    <div className="max-w-[750px] lg:max-w-7xl pb-5 mx-auto p-4">
      <div className="w-full mx-auto ">
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .svg, .webp"
          multiple
          onChange={onSelectedFiles}
          ref={fileInputField}
          style={{ display: "none" }}
        />
        <div className="flex justify-center items-center w-full ">
          {files.length === 0 && (
            <button
              type="button"
              onClick={clickInputField}
              className="w-60 h-48 border border-[#ff0000] rounded-2xl flex flex-col gap-2 justify-center items-center text-5xl text-[#ff0000] "
            >
              <FaUpload />
              <span className="text-sm text-gray-600 mt-2 font-semibold">
                Create Multiple Channels
              </span>
            </button>
          )}
        </div>
        {files.length > 0 && (
          <div className="flex justify-start">
            <span className="text-end text-gray-600 font-semibold">
              Total Selected Files: <span className="text-[#ff0000]">{files.length}</span>
            </span>
          </div>
        )}
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {files.map((file, index) => (
            <div className="border border-gray-100 p-4 rounded-lg shadow mt-3" key={index}>
              {/* Delete row */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="w-10 h-10 border rounded-xl bg-red-500 text-white"
                  onClick={() => removeFile(index)}
                >
                  <span className="flex justify-center text-3xl">
                    <RxCross2 />
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Show selected profile picture */}
                <div>
                  <div className="space-y-2">
                    <label className="mb-3 text-center block text-sm font-medium text-gray-600 uppercase">Profile Picture</label>
                    <div className="flex justify-center items-center ">

                      <img
                        src={URL.createObjectURL(file)}
                        alt="Cover Preview"
                        className="w-[35%] h-[35%] bg-cover rounded-xl border-2"
                      />

                    </div>

                    <h2 className="text-center text-gray-400 text-xs leading-4">
                      PNG, JPG, or WebP
                    </h2>
                  </div>
                </div>
                {/* Cover picture */}
                <div>
                  <div className="space-y-2">
                    <label className="mb-3 text-center block text-sm font-medium text-gray-600 uppercase">Cover Picture</label>
                    <div className="flex justify-center items-center">
                      {coverPictures[index] ? (
                        <img
                          src={URL.createObjectURL(coverPictures[index])}
                          alt="Cover Preview"
                          className="w-[35%] h-[35%] bg-cover rounded-xl border-2"
                        />
                      ) : (
                        <FaFileAlt className="text-3xl hover:text-[#ff0000]" />
                      )}
                    </div>

                    <h2 className="text-center text-gray-400 text-xs leading-4">
                      PNG, JPG, or WebP
                    </h2>
                  </div>
                  <div className="grid gap-2 mt-2">
                    <div className="flex items-center justify-center">
                      <label>
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          {...register(`files[${index}].coverPicture`, {
                            required: "Cover Picture is required",
                          })}
                          onChange={(e) => handleCoverPictureChange(e, index)}
                        />
                        <div className="flex w-28 h-9 px-2 flex-col bg-transparent hover:bg-[#ff0000] border border-[#ff0000] text-[#ff0000] rounded-full shadow hover:text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                          Choose File
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-5">
                <InputField
                  label="Channel Name"
                  register={register}
                  registerName={`files[${index}].channelName`}
                  errors={errors}
                  required
                />
                <InputField
                  label="Subscribers"
                  register={register}
                  registerName={`files[${index}].subscribers`}
                  errors={errors}
                  required
                />
                <InputField
                  label="Channel Description"
                  register={register}
                  registerName={`files[${index}].channelDescription`}
                  errors={errors}
                  required
                />
              </div>
            </div>
          ))}

          {/* submit button */}
          
        </form>
      </div>
    </div>
  );
};

export default BulkFileForm;