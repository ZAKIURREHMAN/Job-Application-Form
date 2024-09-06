import "./JobForm.css";
import FormInputs from "./FormInputs";
import GenderOption from "../../constant/GenderOption";
import CountryOption from "../../constant/CountryOption";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Language from "../../constant/Language";

function JobForm() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectGender, setSelectGender] = useState("");
  const [selectMultipleLanguage, setSelectMultipleLanguage] = useState([]);
  const [step, setSteps] = useState(1);

  const schemaObject = yup
    .object({
      firstName: yup.string().required("Enter Your First Name"),
      lastName: yup.string().required("Enter Your Last Name"),
      gender: yup.string().required("select your Gender"),
      email: yup
        .string()
        .email("Enter valid E-mail")
        .required("select your Gender"),
      phoneNumber: yup
        .string()
        .required("Enter Your Phone Number")
        .min(11, "Your Phone Number must be Eleven characters"),
      dateOfBirth: yup.string().required("Select Your Date of Birth"),
      address: yup.string().required("Enter Your Current Address"),
      skills: yup
        .array()
        .min(2, "Select at least Two skill")
        .required("Select at least one skill"),
      country: yup.string().required("Select Your Country"),
      language: yup
        .array()
        .min(1, "You must select at least One languages")
        .required("Language is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaObject),
    defaultValues: {
      skills: [],
      language: [],
    },
  });

  const handleSkillChange = (event, name) => {
    clearErrors("skills");
    const { checked } = event.target;
    if (checked) {
      setSelectedSkills((pre) => [...pre, name]);
    } else {
      setSelectedSkills((prevSkills) =>
        prevSkills.filter((s) => s !== checked)
      );
    }
  };

  const selectLanguage = (e) => {
    clearErrors("language");
    const { value } = e.target;
    if (value) {
      setSelectMultipleLanguage((pre) => [...pre, value]);
    } else {
      setSelectMultipleLanguage((pre) => {
        pre.filter((s) => s !== value);
      });
    }
  };

  const getGender = (value) => {
    setSelectGender(value);
  };

  const handleNextButton = async () => {
    if (step === 1) {
      const checkForValidation = await trigger([
        "firstName",
        "lastName",
        "gender",
      ]);
      if (checkForValidation) {
        setSteps(step + 1);
      }
    }

    if (step === 2) {
      const checkForValidation = await trigger([
        "email",
        "phoneNumber",
        "dateOfBirth",
      ]);
      if (checkForValidation) {
        setSteps(step + 1);
      }
    }
  };

  const handleInputChange = (field) => {
    return function () {
      clearErrors(field);
    };
  };

  const onSubmit = useCallback(
    (data) => {
      data.skills = selectedSkills;
      data.gender = selectGender;
      data.language = selectMultipleLanguage;
      localStorage.setItem("data", JSON.stringify(data));
      reset();
    },
    [selectedSkills, selectGender, selectMultipleLanguage, reset]
  );

  return (
    <div className="job-form-container">
      <div className="container-box">
        <div className="jobs-heading">
          <h2>
            <span>Job Application</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div>
              <div className="input-form">
                <FormInputs
                  name="firstName"
                  labelName="First Name: "
                  type="text"
                  placeholder="Enter Your First Name"
                  {...register("firstName")}
                  onChange={handleInputChange("firstName")}
                />
                <br />
                {errors.firstName && (
                  <span style={{ color: "red", marginLeft: "160px" }}>
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <br />
              <div className="input-form">
                <FormInputs
                  name="lastName"
                  labelName="Last Name: "
                  type="text"
                  placeholder="Enter Your Last Name"
                  {...register("lastName")}
                  onChange={handleInputChange("lastName")}
                />
              </div>
              <br />
              {errors.lastName && (
                <span style={{ color: "red", marginLeft: "160px" }}>
                  {errors.lastName.message}
                </span>
              )}
              <div
                className="select-gender"
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3>
                  <span>Gender: </span>
                </h3>

                {GenderOption.map((item) => (
                  <div key={item.id} onChange={handleInputChange("gender")}>
                    <FormInputs
                      name="gender"
                      labelName={item.label}
                      type="radio"
                      {...register("gender")}
                      onChange={() => getGender(item.value)}
                    />
                  </div>
                ))}
              </div>
              {errors.gender && (
                <span style={{ color: "red", marginLeft: "160px" }}>
                  {errors.gender.message}
                </span>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="email">
                <FormInputs
                  name="email"
                  labelName="Email: "
                  type="email"
                  placeholder="Enter Your Email"
                  {...register("email")}
                  onChange={handleInputChange("email")}
                />
                <br />
                {errors.email && (
                  <span style={{ color: "red", marginLeft: "160px" }}>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="number">
                <br />
                <FormInputs
                  name="phoneNumber"
                  labelName="Phone Number: "
                  type="number"
                  placeholder="Enter Your Phone Number"
                  {...register("phoneNumber")}
                  onChange={handleInputChange("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <span style={{ color: "red", marginLeft: "160px" }}>
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
              <br />
              <div className="date-of-birth">
                <FormInputs
                  name="dateOfBirth"
                  labelName="Date of Birth: "
                  type="date"
                  {...register("dateOfBirth")}
                  onChange={handleInputChange("dateOfBirth")}
                />
                <br />
                {errors.dateOfBirth && (
                  <span style={{ color: "red", marginLeft: "160px" }}>
                    {errors.dateOfBirth.message}
                  </span>
                )}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="address">
                <FormInputs
                  name="address"
                  labelName="Address: "
                  type="text"
                  placeholder="Enter Your Current address"
                  {...register("address")}
                />
                <br />
                {errors.address && (
                  <span style={{ color: "red", marginLeft: "160px" }}>
                    {errors.address.message}
                  </span>
                )}
              </div>

              <div className="skills">
                <h3>
                  <span>Skills</span>
                </h3>
                <FormInputs
                  name="html"
                  labelName="HTML"
                  type="checkbox"
                  {...register("skills")}
                  onChange={(e) => handleSkillChange(e, "html")}
                />
                <FormInputs
                  name="css"
                  labelName="CSS"
                  type="checkbox"
                  {...register("skills")}
                  onChange={(e) => handleSkillChange(e, "css")}
                />
                <FormInputs
                  name="javaScript"
                  labelName="JAVASCRIPT"
                  type="checkbox"
                  {...register("skills")}
                  onChange={(e) => handleSkillChange(e, "javaScript")}
                />
                <FormInputs
                  name="reactJs"
                  labelName="REACT JS"
                  type="checkbox"
                  {...register("skills")}
                  onChange={(e) => handleSkillChange(e, "reactJs")}
                />
              </div>

              {errors.skills && (
                <span style={{ color: "red", marginLeft: "160px" }}>
                  {errors.skills.message}
                </span>
              )}
              <div className="country">
                <label htmlFor="country">Country</label>
                <select {...register("country")}>
                  <option value="">Select Your Country</option>
                  {CountryOption.map((item) => (
                    <option value={item.value} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              {errors.country && (
                <span style={{ color: "red", marginLeft: "160px" }}>
                  {errors.country.message}
                </span>
              )}
              <div className="language">
                <label htmlFor="language">Language</label>
                <select
                  {...register("language")}
                  multiple
                  onChange={(e) => selectLanguage(e)}
                >
                  <option value="">Select Your Language</option>
                  {Language.map((item) => (
                    <option value={item.language} key={item.id}>
                      {item.language}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              {errors.language && (
                <span style={{ color: "red", marginLeft: "160px" }}>
                  {errors.language.message}
                </span>
              )}

              <div className="submit-button">
                <button type="submit">Submit</button>
              </div>
            </div>
          )}

          <div className="steps-button">
            <div className="previous-button" onClick={() => setSteps(step - 1)}>
              <i
                className="fa-solid fa-circle-arrow-left"
                style={{ display: step <= 1 ? "none" : "block" }}
              ></i>
            </div>
            <div className="next-button" onClick={handleNextButton}>
              <i
                className="fa-solid fa-circle-arrow-right"
                style={{ display: step >= 3 ? "none" : "block" }}
              ></i>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
