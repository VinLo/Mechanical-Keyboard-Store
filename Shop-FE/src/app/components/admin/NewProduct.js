import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createProduct,
} from "../../../redux/actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ConstructionIcon from "@mui/icons-material/Construction";
import { NEW_PRODUCT_RESET } from "../../../redux/constants/productConstants";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Thêm sản phẩm thành công");
      history.push("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
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
    console.log("nhan");
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      <MetaData title="Create Product" />
      <SideBar />
      <div className="main-content">
        <div className="main-content-dashboard">
          <section className="recent">
            <div className="table-grid">
              <div className="table-card">
                <h3 id="productListHeading">Thêm sản phẩm</h3>
                <form
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                  className="createProductForm"
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
                    />
                  </div>
                  <div>
                    {/* <DescriptionIcon /> */}

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
                    <select onChange={(e) => setCategory(e.target.value)}>
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
                      placeholder="Số lượng"
                      required
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div id="createProductFormFile">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={createProductImagesChange}
                      multiple
                    />
                  </div>

                  <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Thêm
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* <div className="dashboard">
         <SideBar />
         <div className="newProductContainer">
           <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Thêm sản phẩm</h1>

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
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Thông tin sản phẩm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
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
                placeholder="Số lượng"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Thêm
            </Button>
          </form>
        </div>
      </div> */}
    </Fragment>
  );
};

export default NewProduct;
