import React from "react";
import { Link } from "react-router-dom";
import "./CollectionList.css";
import collection from "./data.json";

const CollectionList = ({}) => {
  return (
    <>
      <div className="grid-flex-collection">
        {collection.map((collection) => {
          return (
            <div className="grid-flex_item">
              <div className="hover-images">
                <a href="/products">
                  <div>
                    <div className="image-wrapper">
                      <img
                        className="border-radius_images zoom-in"
                        src={collection.image_src}
                      ></img>
                    </div>
                  </div>
                </a>
              </div>
              <div className="collection-title">
                <a
                  style={{ color: "black", textDecoration: "underline" }}
                  href=""
                >
                  {collection.title}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default CollectionList;
