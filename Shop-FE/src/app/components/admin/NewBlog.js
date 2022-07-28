import React, { Fragment, useEffect, useState } from "react";
import "./NewBlog.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBlog } from "../../../redux/actions/blogAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SideBar from "./Sidebar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DescriptionIcon from "@material-ui/icons/Description";
import { NEW_BLOG_RESET } from "../../../redux/constants/blogConstants";

const NewBlog = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newBlog);

  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Blog Created Successfully");
      history.push("/admin/blogs");
      dispatch({ type: NEW_BLOG_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createBlogSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("info", info);
    myForm.set("description", description);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    console.log("nhan");
    dispatch(createBlog(myForm));
  };

  const createBlogImagesChange = (e) => {
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
                <h3 id="productListHeading">Thêm bài viết</h3>
                <form
                  encType="multipart/form-data"
                  onSubmit={createBlogSubmitHandler}
                  className="createProductForm"
                >
                  <div>
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Tên bài viết"
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
                      placeholder="Mô tả bài viết"
                      data={description}
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);
                      }}
                    />
                  </div>
                  <div id="createProductFormFile">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={createBlogImagesChange}
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
    </Fragment>
  );
};

export default NewBlog;
