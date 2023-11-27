import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./product.css";
import { relatedProducts } from "../../utils/relatedProduct";
import { ShopContext } from "../cart/context/shop-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const { addToCart } = useContext(ShopContext);
  const product = useLocation().state;

  const notifyAddedToCart = (item) =>
    toast.success(`${item.title} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    });

  return (
    <div className="product-page1">
      <br />
      <div className="product-image1">
        <img src={product.primaryImageSmall} alt={product.title} />
      </div>
      <form className ="product-information">
        <p className ="product_title">{product.title}</p>
        <p className ="artist_name">{product.artistDisplayName}</p>
        <br></br>
        <p className = "product-information-text">Our products come in multiple sizes and types.<br></br>Please choose a product from the drop down list below. </p>
        <br></br>
        <select className= "productbox"
          value={selectedProduct}
          onChange={(e) => {
            setSelectedProduct(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option class ="placeholder" selected disabled value ="">-- Select a product --</option>
          {relatedProducts.map((product) => (
            <option key={product.id} value={product.id}>
              {product.nameType} - ${product.price}
            </option>
          ))}
        </select>
        <br></br>
        <br></br>
        <button className ="cart-btnn"
          type="button"
          onClick={() => {
            addToCart({
              id: product.objectID.toString().concat("-", selectedProduct),
              title: product.title,
              thumbnail: product.primaryImageSmall,
              nameType: relatedProducts[selectedProduct].nameType,
              price: relatedProducts[selectedProduct].price,
            });
            notifyAddedToCart({
              title: product.title,
            });
          }}
        >
          Add to Cart
        </button>
      </form>
    </div>
  );
}
export default ProductPage;
