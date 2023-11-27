// content6.jsx

import React, { useState, useEffect } from "react";
import ProductContainer3 from "../../component/product-card/productContainer3";
import { eachEndpoint, testEndpoint } from "../../utils/constant";
import { toast } from "react-toastify";

const Content6 = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  //const [totalPosts, setTotalPosts] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  //const initialPhotos = slice(photos, 0, itemsPerPage);
  const initialPhotos = photos.slice(0, itemsPerPage);
  const [isShowedAll, setIsShowedAll] = useState(false);

  const showMore = () => {
    setItemsPerPage(itemsPerPage + 15);
    if (itemsPerPage >= photos.length) {
      setIsShowedAll(true);
    } else {
      setIsShowedAll(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(testEndpoint)
      .then((IDs) => {
        return IDs.json();
      })
      .then((data) => {
        //setTotalPosts(data.total); // this is the total number of posts
        data.objectIDs.forEach((element) => {
          fetch(eachEndpoint + element)
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              }
            })
            .then((photo) => {
              //console.log(photo);
              if (photo !== undefined) {
                //console.log(photo, "gethereanyway");
                if (photo.primaryImageSmall) {
                  //console.log(photo);
                  setPhotos((prevPhotos) => prevPhotos.concat(photo));
                }
              }
            });
        });
      })
      .catch((err) => console.log(err, "hihi"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    // need to adjust to be in the center of the screen
    <div
      style={{
        backgroundImage: "url(/background2.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "50vh" }}
      >
        <p className="phrase text-center">
            Make your space an art gallery with public domain artwork
        </p>
      </div>
      {loading ? (
        <div className="p-5" style={{ height: 100 }}>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p
            className="blockquote text-center"
          >
            New Content
          </p>
          <ProductContainer3 photos={initialPhotos} />
          <div
            className="bottom-page d-flex justify-content-center"
          >
            {isShowedAll ? (
              <button className="btn btn-light m-3">End of list !!!</button>
            ) : (
              <button onClick={showMore} className="btn btn-dark m-3">
                Show More
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content6;
