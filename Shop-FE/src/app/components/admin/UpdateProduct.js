import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProduct.css";
// import './Dashboard.css'
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
} from "../../../redux/actions/productAction";
import { getProductDetails } from "../../../redux/actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../redux/constants/productConstants";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cập nhật sản phẩm thành công");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Cập nhập sản phẩm" />
      <SideBar />
      <div className="main-content">
        <div className="main-content-dashboard">
          <section className="recent">
            <div className="table-grid">
              <div className="table-card">
                <h3 id="productListHeading">Sửa sản phẩm</h3>
                <form
                  className="updateProductForm"
                  encType="multipart/form-data"
                  onSubmit={updateProductSubmitHandler}
                >
                  <div>
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Tên sản phẩm"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <AttachMoneyIcon />
                    <input
                      type="number"
                      placeholder="Giá"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>

                  <div>
                    <DescriptionIcon />

                    {/* <textarea
                      placeholder="Mô tả sản phẩm"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea> */}
                    <CKEditor
                      placeholder="Mô tả sản phẩm"
                      data={description}
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);
                      }}
                    />
                  </div>

                  <div>
                    <AccountTreeIcon />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Danh mục</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <StorageIcon />
                    <input
                      type="number"
                      placeholder="Stock"
                      required
                      onChange={(e) => setStock(e.target.value)}
                      value={Stock}
                    />
                  </div>

                  <div id="updateProductFormFile">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProductImagesChange}
                      multiple
                    />
                  </div>

                  <div id="updateProductFormImage">
                    {oldImages &&
                      oldImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt="Hình ảnh sản phẩm cũ"
                        />
                      ))}
                  </div>

                  <div id="updateProductFormImage">
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Hình ảnh cập nhật" />
                    ))}
                  </div>

                  <Button
                    id="updateProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Cập nhật
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
