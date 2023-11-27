// SearchResult.jsx
import React, { useState, useEffect } from "react";
import ProductContainer3 from "../../component/product-card/productContainer3";
import { eachEndpoint, searchEndpoint } from "../../utils/constant";
import { useLocation } from "react-router";

const SearchResult = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const initialPhotos = photos.slice(0, itemsPerPage);
  const [isShowedAll, setIsShowedAll] = useState(false);

  const { state } = useLocation();
  //console.log(state);

  const showMore = () => {
    setItemsPerPage(itemsPerPage + 15);
    if (itemsPerPage >= photos.length) {
      setIsShowedAll(true);
    } else {
      setIsShowedAll(false);
    }
  };

  useEffect(() => {
    setPhotos([]);
    setItemsPerPage(15);
    setIsShowedAll(false);
    if (state?.query) {
      const query = encodeURIComponent(state.query);
      fetch(searchEndpoint + query)
      .then((IDs) => {
        return IDs.json();
      })
      .then((data) => {
        data.objectIDs.forEach((element) => {
          fetch(eachEndpoint + element)
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              }
            })
            .then((photo) => {
              if (photo !== undefined) {
                if (photo.primaryImageSmall) {
                  setPhotos((prevPhotos) => prevPhotos.concat(photo));
                }
              }
            });
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {});
    }
  }, [state]);

  return (
    <div>
      <div>
        <div style={{ height: "18vw" }}>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ 
            height: "100%", 
            backgroundImage: "url(/background2.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            color: "white"}}
          >
            <p className = "searchresulttext" style={{ marginTop: "3vw" }}>Search Results for {state?.query}</p>
          </div>
        </div>
        <ProductContainer3 photos={initialPhotos} />
        <div className="d-flex justify-content-center showmorebox">
          {!isShowedAll ? (
            <button className="btn btn-primary searchshowmore" onClick={() => showMore()}>
              Show More
            </button>
          ) : (
            <h1>That's all!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
