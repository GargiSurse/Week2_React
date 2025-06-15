// src/components/RegistrationForm.jsx
import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const initialForm = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    terms: false,
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  // Handles input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.gender) newErrors.gender = "Please select a gender.";
    if (!formData.country) newErrors.country = "Select your country.";
    if (!formData.terms) newErrors.terms = "You must agree to the terms.";
    return newErrors;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Submitted Data:", formData);
      setSubmittedData({ name: formData.fullName, email: formData.email });
      setFormData(initialForm);
    } else {
      setSubmittedData(null);
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">-- Select Country --</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
        {errors.country && <p className="error">{errors.country}</p>}

        <label className="terms">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />{" "}
          I agree to the Terms and Conditions
        </label>
        {errors.terms && <p className="error">{errors.terms}</p>}

        <button type="submit">Register</button>
      </form>

      {submittedData && (
        <p className="success">
          Hello! <strong>{submittedData.name}</strong>, you have successfully registered
          with email: <strong>{submittedData.email}</strong>
        </p>
      )}
    </div>
  );
};

export default RegistrationForm;
