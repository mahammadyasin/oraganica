import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import "../Css/AddAddressForm.css";

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
  const [userData, setUserData] = useState(null); // Store updated user data
  const [loadingUser, setLoadingUser] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        alert("User ID not found in sessionStorage");
        return;
      }

      const response = await fetch(
        `http://localhost:9192/auth/addAddress?userId=${userId}`,
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

      // Fetch updated user data after submitting address
      setLoadingUser(true);
      const userRes = await fetch(
        `http://localhost:9192/auth/getUser`
      );
      if (!userRes.ok) throw new Error("Failed to fetch updated user data");

      const userJson = await userRes.json();
      setUserData(userJson);
      setLoadingUser(false);
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="address-container m-auto">
      <h2>Add New Address</h2>

      {isSubmitted ? (
        <>
          <div className="success-message">
            <CheckCircle size={48} color="green" />
            <p>Address submitted successfully!</p>
          </div>

          {loadingUser ? (
            <p>Loading updated user data...</p>
          ) : userData ? (
            <div className="user-data">
              <h3>User Information</h3>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <h4>Addresses:</h4>
              {userData.addresses && userData.addresses.length > 0 ? (
                <ul>
                  {userData.addresses.map((addr, idx) => (
                    <li key={idx}>
                      {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}, {addr.country}
                      <br />
                      Phone: {addr.phone}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No address found</p>
              )}
            </div>
          ) : null}
        </>
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
