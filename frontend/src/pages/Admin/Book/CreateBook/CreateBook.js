import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { styled } from "@mui/material/styles";
import { useStyles } from "./style";
import { LoadingButton } from "@mui/lab";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createCate } from "../../../../redux/action/categoryAction";
import { createBook } from "../../../../redux/action/bookAction";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateBook() {
  // const { loadingCreateCate, successCreateCate } = useSelector(
  //   (state) => state.CateReducer
  // );
  const { loadingCreateBook } = useSelector((state) => state.BookReducer);
  //  console.log("cateList", cateList)
  const [isReadyCreateCate, setIsReadyCreateCate] = useState(false);

  const dispatch = useDispatch();
  const [cate, setCate] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleChangeCategory = (event) => {
    setCate(event.target.value);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const [srcImage, setSrcImage] = useState(null);
  const [images, setImages] = useState([]);
  const handleChangeFileImage = (e) => {
    let file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
      setSrcImage(e.target.result);
    };
    // Đem dữ liệu file lưu vào formik
    formik.setFieldValue("image", file);
  };

  const [imageFiles, setImageFiles] = useState([]);

  const handleChangeFileGallery = (e) => {
    let files = e.target.files;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      console.log("values.gallery", values.gallery);

      values.gallery = e.target.files;
      return;
    }
  };

  useEffect(() => {
    const images = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);
  console.log("images", images);
  console.log("images", images.length);
  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
    desc: Yup.string().required("*Vui lòng nhập thông tin này"),
    price: Yup.string().required("*Vui lòng nhập thông tin này"),
    quantity: Yup.string().required("*Vui lòng nhập thông tin này"),
    bookCover: Yup.string().required("*Vui lòng nhập thông tin này"),
    totalPage: Yup.string().required("*Vui lòng nhập thông tin này"),
    publisher: Yup.string().required("*Vui lòng nhập thông tin này"),
    issuer: Yup.string().required("*Vui lòng nhập thông tin này"),
    size: Yup.string().required("*Vui lòng nhập thông tin này"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      desc: "",
      price: "",
      quantity: "",
      bookCover: "",
      totalPage: "",
      publisher: "",
      issuer: "",
      size: "",
      image: "",
      gallery: "",
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      if (loadingCreateBook) {
        return;
      }
      dispatch(createBook(data));

      // resetForm();
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (values.name && values.parentCateId) setIsReadyCreateCate(true);
    else setIsReadyCreateCate(false);
  }, [values.name, values.parentCateId]);

  const handleCreate = () => {
    if (isReadyCreateCate) setOpen(false);
  };
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handleEditorChange = (content, editor) => {
    console.log("content", content);
    console.log("editor", editor);
    setFieldValue("desc", content);
  };
  return (
    <Box>
      <Button
        variant="contained"
        component={RouterLink}
        onClick={handleClick}
        to="#"
        startIcon={<Icon icon={plusFill} />}
        sx={{ "&:hover": { color: "#fff" } }}
      >
        Thêm sách mới
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        className="text-center"
        fullWidth={true}
        maxWidth="md"
      >
        <Formik value={formik}>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <ModalDialog
              sx={{ fontSize: "23px !important" }}
              onClose={handleClose}
            >
              {" "}
              Tạo sách mới
            </ModalDialog>

            <DialogContent dividers>
              <Stack spacing={3}>
                {" "}
                <TextField
                  fullWidth
                  autoComplete="name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Tên sách"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                {/* <TextField
                  fullWidth
                  autoComplete="desc"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Mô tả"
                  {...getFieldProps("desc")}
                  error={Boolean(touched.desc && errors.desc)}
                  helperText={touched.desc && errors.desc}
                /> */}
                <Editor
                  {...getFieldProps("desc")}
                  tinymceScriptSrc={
                    "https://cdn.tiny.cloud/1/i2cpflyq3xn1h4uemftejor2d8p292ct4ckywqat4tvbp7iq/tinymce/6/tinymce.min.js"
                  }
                  name="desc"
                  onEditorChange={handleEditorChange}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "preview",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                <TextField
                  fullWidth
                  autoComplete="price"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Giá"
                  {...getFieldProps("price")}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
                <TextField
                  fullWidth
                  autoComplete="quantity"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Số lượng"
                  {...getFieldProps("quantity")}
                  error={Boolean(touched.quantity && errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                />
                <TextField
                  fullWidth
                  autoComplete="bookCover"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Bìa sách"
                  {...getFieldProps("bookCover")}
                  error={Boolean(touched.bookCover && errors.bookCover)}
                  helperText={touched.bookCover && errors.bookCover}
                />
                <TextField
                  fullWidth
                  autoComplete="totalPage"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Số trang"
                  {...getFieldProps("totalPage")}
                  error={Boolean(touched.totalPage && errors.totalPage)}
                  helperText={touched.totalPage && errors.totalPage}
                />
                <TextField
                  fullWidth
                  autoComplete="publisher"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Nhà xuất bản"
                  {...getFieldProps("publisher")}
                  error={Boolean(touched.publisher && errors.publisher)}
                  helperText={touched.publisher && errors.publisher}
                />
                <TextField
                  fullWidth
                  autoComplete="issuer"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Nhà phát hành"
                  {...getFieldProps("issuer")}
                  error={Boolean(touched.issuer && errors.issuer)}
                  helperText={touched.issuer && errors.issuer}
                />
                <TextField
                  fullWidth
                  autoComplete="size"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Kích thước"
                  {...getFieldProps("size")}
                  error={Boolean(touched.size && errors.size)}
                  helperText={touched.size && errors.size}
                />
                {/* <Stack spacing={2}> */}
                <Button
                  variant="contained"
                  component="label"
                  sx={{ width: "15%" }}
                >
                  Thư viện ảnh
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleChangeFileGallery}
                  />
                </Button>
                <div className="flex">
                  {images &&
                    images.map((image) => (
                      <img
                        accept="image/*"
                        multiple
                        src={image}
                        alt="avatar"
                        className="w-24 h-auto rounded-2xl mr-3"
                      />
                    ))}
                </div>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ width: "15%" }}
                >
                  Hình ảnh
                  <input
                    hidden
                    accept="image/*"
                    id="fileUpload"
                    type="file"
                    onChange={handleChangeFileImage}
                  />
                </Button>
                <div className="flex">
                  {srcImage && (
                    <img
                      accept="image/*"
                      multiple
                      src={srcImage}
                      alt="avatar"
                      className="w-24 h-auto rounded-2xl mr-3"
                    />
                  )}
                </div>
                {/* </Stack> */}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ margin: "0 16px !important" }}>
              <Button
                sx={{
                  color: "gray",
                  borderColor: "gray ",
                  "&:hover": { color: "primary.main" },
                  width: "100%",
                  height: "33px !important",
                }}
                variant="outlined"
                onClick={handleClose}
                className={classes.buttonCreate}
              >
                Huỷ
              </Button>
              <LoadingButton
                sx={{ width: "100%", height: "33px !important" }}
                size="large"
                type="submit"
                variant="contained"
                loading={loadingCreateBook}
                onClick={handleCreate}
                // disabled={!isReadyCreateCate}
                className={classes.buttonCreate}
              >
                Tạo
              </LoadingButton>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </Box>
  );
}
