import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../../redux/actions/productAction";
import { getProductDetails } from "../../../redux/actions/productAction";
import Loader from "../layout/loader/Loader";
import ProductCard from "../Home/Product";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import Headers from "../layout/header/Headers";
import Footer from "../layout/footer/Footer";
const categories = [
  "Sản phẩm sắp tới",
  "Nút phím",
  "Công tắc phím",
  "Kit bàn phím",
  "Bo mạch bàn phím",
  "Tấm đệm bàn phím",
  "Phụ kiện đi kèm",
  "Vỏ bàn phím",
  "Bàn phím hoàn chỉnh",
  "Túi đựng bàn phím",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const [price, setPrice] = useState([0, 3000000]);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  let count = filteredProductsCount;

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category, ratings, price));
  }, [dispatch, keyword, currentPage, category, alert, error, ratings, price]);
  return (
    <Fragment>
      <Headers product={products} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS" />
          <div className="container_products">
            <h2 className="productsHeading">Sản phẩm</h2>
            <div className="products">
              <div className="filterBox">
                <div className="filterTitle">
                  Bộ lọc
                  <span>{productsCount} Sản Phẩm</span>
                </div>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                  <div className="slider_filter">
                    Giá
                    <Slider
                      value={price}
                      onChange={priceHandler}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={3000000}
                    />
                  </div>
                  <div className="slider_filter" style={{ border: "none" }}>
                    Sao
                    <Slider
                      value={ratings}
                      onChange={(e, newRating) => {
                        setRatings(newRating);
                      }}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={0}
                      max={5}
                    />
                  </div>
                </ul>
              </div>
              <div className="products_flex">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </div>
            {resultPerPage < count && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default Products;
