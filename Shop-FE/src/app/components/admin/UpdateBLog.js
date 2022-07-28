import React, { Fragment, useEffect, useState } from "react";
import "./UpdateBlog.css";
// import './Dashboard.css'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateBlog } from "../../../redux/actions/blogAction";
import { getBlogDetails } from "../../../redux/actions/blogAction";
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
import { UPDATE_BLOG_RESET } from "../../../redux/constants/blogConstants";

const UpdateBlog = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, blog } = useSelector((state) => state.blogDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.blog);

  const [name, setName] = useState("");
  const [info, setInfo] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const blogId = match.params.id;

  useEffect(() => {
    if (blog && blog._id !== blogId) {
      dispatch(getBlogDetails(blogId));
    } else {
      setName(blog.name);
      setInfo(blog.info);
      setDescription(blog.description);
      setOldImages(blog.images);
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
      alert.success("Cập nhật bài viết thành công");
      history.push("/admin/blogs");
      dispatch({ type: UPDATE_BLOG_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, blogId, blog, updateError]);

  const updateBlogSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("info", info);
    myForm.set("description", description);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateBlog(blogId, myForm));
  };

  const updateBlogImagesChange = (e) => {
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
                  onSubmit={updateBlogSubmitHandler}
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
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Giới thiệu bài viết"
                      required
                      value={info}
                      onChange={(e) => setInfo(e.target.value)}
                    />
                  </div>
                  <div>
                    <DescriptionIcon />
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
                  <div id="updateProductFormFile">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateBlogImagesChange}
                    />
                  </div>

                  <div id="updateProductFormImage">
                    {oldImages &&
                      oldImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt="Hình ảnh bài viết cũ"
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

export default UpdateBlog;
