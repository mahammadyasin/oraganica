import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    productname: "",
    description: "",
    weight: "",
    price: "",
    category: "",
  });

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productname", product.productname);
    formData.append("description", product.description);
    formData.append("weight", product.weight);
    formData.append("price", product.price);
    formData.append("img", file);
    formData.append("category", product.category);

    try {
      const res = await axios.post(
        "http://localhost:9192/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast("Product added successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error uploading product.");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 style={styles.header}>Add Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="productname"
          placeholder="Product Name"
          value={product.productname}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (in grams)"
          value={product.weight}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={product.price}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.fileInput}
          required
        />

        <button type="submit" style={styles.button}>
          Submit
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "black" }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontFamily: "Arial",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  fileInput: {
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  message: {
    marginTop: "15px",
    color: "green",
    textAlign: "center",
  },
};

export default AddProductForm;
