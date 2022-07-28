import React, { Fragment, useEffect } from "react";
import "./Home.css";
import "./BlogCard.css";
import "./Grid.css";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProduct, clearErrors } from "../../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import Headers from "../layout/header/Headers";
import Footer from "../layout/footer/Footer";
import CollectionList from "./CollectionList";
import Slider from "react-slick";
import DataBanner from "./DataBanner.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBlog } from "../../../redux/actions/blogAction";
import BlogCard from "./BLogCard";
const Home = () => {
  // Connect value BE
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { blogs } = useSelector((state) => state.blogs);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBlog());
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Fragment>
      <Headers product={products} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="homebody">
            <button id="button_bttop" onClick={topFunction} />
            <Slider {...settings}>
              {DataBanner.map((item) => {
                return (
                  <div>
                    <img src={item.image_src} />
                  </div>
                );
              })}
            </Slider>
            <h2 className="homeHeading">Bộ sưu tập</h2>
            <CollectionList />
            <h2 className="homeHeading">Sản phẩm</h2>

            <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <Link to="/products">
              <div className="more_products">
                Xem tất cả
                <div class="more_products_icon">
                  <svg
                    enable-background="new 0 0 11 11"
                    viewBox="0 0 11 11"
                    x="0"
                    y="0"
                    class="icon-arrow-right"
                  >
                    <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path>
                  </svg>
                </div>
              </div>
            </Link>
            <div class="box-cards-blog -grid">
              {blogs &&
                blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
            <section className="cta">
              <h1>Hãy cùng nhau lập nên bàn phím của riêng mình</h1>
              <a href="/about">Biết thêm về chúng tôi</a>
            </section>
          </div>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};
export default Home;
