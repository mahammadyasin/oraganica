import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { useShop } from "../../context/ShopContext";

export const ProductCard = (props) => {
  // const { role } = useShop();
  const role = sessionStorage.getItem("role");
  console.log("check props data=============", props);

  const navigate = useNavigate();

  // const res = props;

  // console.log("res" + props.body);
  // console.log("res", JSON.stringify(props, null, 2));

  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const onToast = () => {
    toast.success("Added to cart!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handalClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handalCart = async () => {
    token ? setToken(token) : setToken(sessionStorage.getItem("token"));
    if (token === null) {
      toast.error("Please login to add items to cart.");
      navigate("/login");
      return;
    } else {
      console.log("Correct token:", token);
    }

    if (!token) {
      navigate("/login");
    } else {
      console.log("object", token);
    }
    const res = await fetch("http://localhost:9192/cart/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId: props?.id,
        quantity: 1,
      }),
    });
    if (res.status === 200) {
      onToast();
      const data = await res.json();
    } else {
      navigate("/login");
    }
  };
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:9192/product/del/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res.status === 200) {
      toast.success("Product deleted successfully!");
      await props.fatchData();
    }
  };

  return (
    <>
      <li>
        <div
          className="product-card"
          style={{
            width: "220px",
            height: "500px",
            overflow: "hidden",
            border: "1px solid #ccc",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <figure className="card-banner">
            <img
              // src="./images/product-1.png"
              src={`data:image/png;base64,${props.img}`}
              // src={base64Image}

              width={189}
              height={189}
              loading="lazy"
              alt="Fresh Orangey"
              style={{ width: "100%", height: "180px", objectFit: "cover" }} //
            />
            <div className="btn-wrapper">
              <button className="product-btn" aria-label="Add to Whishlist">
                <ion-icon name="heart-outline" />
                <div className="tooltip">Add to Whishlist</div>
              </button>
              <button
                className="product-btn"
                onClick={() => handalClick(props.id)}
                aria-label="Quick View"
              >
                <ion-icon name="eye-outline" />
                <div className="tooltip">Quick View</div>
              </button>
            </div>
          </figure>
          <div className="rating-wrapper">
            <ion-icon name="star" />
            <ion-icon name="star" />
            <ion-icon name="star" />
            <ion-icon name="star" />
            <ion-icon name="star" />
          </div>
          <h3 className="h4 card-title">
            <a href="/product/1">{props.name}</a>
          </h3>
          <div className="price-wrapper">
            <del className="del">Rs {props.price + 100}</del>
            <data className="price" value={85.0}>
              Rs {props.price}
            </data>
          </div>
          <button className="btn btn-primary" onClick={() => handalCart()}>
            Add to Cart
          </button>
          {role === "ADMIN" && (
            <>
              <button
                className="btn btn-primary"
                style={{ marginTop: "6px", backgroundColor: "grey" }}
                onClick={() =>
                  navigate("/update-product/" + props.id, {
                    state: {
                      productId: props.id,
                      productname: props.name,
                      description: props.description,
                      price: props.price,
                      img: props.img,
                      weight: props.weight,
                    },
                  })
                }
              >
                Edit
              </button>
              <button
                className="btn"
                onClick={handleDelete}
                style={{ marginTop: "6px", backgroundColor: "red" }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </li>
    </>
  );
};
