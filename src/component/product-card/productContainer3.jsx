import React from "react";
import { useNavigate } from "react-router-dom";

const ProductContainer3 = (postToRender) => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row row-cols-2 row-cols-md-3 g-4">
        {postToRender.photos.map((product) => (
          <div className="col" key={product.objectID}>
            <div className="card bg-dark text-white">
              <img
                src={product.primaryImage}
                className="card-img-top center-block"
                alt={product.title}
                style={{ height: "18vw", objectFit: "cover", width: "100%" }}
              />
              <div
                className="card-img-overlay d-flex flex-column justify-content-end"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
              >
                <h5 className="card-title">{product.artistDisplayName}</h5>
                <p className="card-text">{product.title}</p>
                <button
                  onClick={() => {
                    navigate(`/product/${product.objectID}`, {
                      state: product,
                    });
                  }}
                  className="btn btn-dark"
                  style={{ maxWidth: 100 }}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
};

export default ProductContainer3;
