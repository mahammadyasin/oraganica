import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import "../Css/AddAddressForm.css";
// Use this in your JS/React file

const AddAddressForm = () => {
  const [formData, setFormData] = useState({
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = "123"; // Replace with actual logic
      const response = await fetch(
        `http://localhost:8080/auth/addAddress?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Submission failed");

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="address-container">
      <h2>Add New Address</h2>

      {isSubmitted ? (
        <div className="success-message">
          <CheckCircle size={48} color="green" />
          <p>Address submitted successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="address-form">
          {[
            { label: "Street", name: "street" },
            { label: "Apartment", name: "apartment" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Zip Code", name: "zipCode" },
            { label: "Country", name: "country" },
            { label: "Phone Number", name: "phone", type: "tel" },
          ].map(({ label, name, type = "text" }) => (
            <div className="form-group" key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required={name !== "apartment"}
              />
            </div>
          ))}

          <div className="submit-btn">
            <button type="submit">Submit Address</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddAddressForm;
