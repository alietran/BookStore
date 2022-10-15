import {
  Autocomplete,
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
import { ErrorMessage, Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  createCate,
  getCateList,
  resetCateList,
} from "../../../../redux/action/categoryAction";
import { createBook } from "../../../../redux/action/bookAction";
import { Editor } from "@tinymce/tinymce-react";
import {
  getAuthorList,
  resetAuthorList,
} from "../../../../redux/action/authorAction";
import {
  getSupplierList,
  resetSupplierList,
} from "../../../../redux/action/supplierAction";

export default function CreateBook() {
  // const { loadingCreateCate, successCreateCate } = useSelector(
  //   (state) => state.CateReducer
  // );
  const { loadingCreateBook } = useSelector((state) => state.BookReducer);
  //  console.log("cateList", cateList)
  const [isReadyCreateCate, setIsReadyCreateCate] = useState(false);
  const { cateList } = useSelector((state) => state.CateReducer);
  const { authorList } = useSelector((state) => state.AuthorReducer);
  const { supplierList } = useSelector((state) => state.SupplierReducer);
  const dispatch = useDispatch();
  const [cate, setCate] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const [srcImage, setSrcImage] = useState(null);
  const [images, setImages] = useState([]);
  const [childrenCate, setChildrencate] = useState(10);
  const [author, setAuthor] = useState(10);
  const [issuer, setIssuer] = useState("");
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleChangeIssuer = (event) => {
    setIssuer(event.target.value);
  };
  const handleChangeChildrenCate = (event) => {
    setChildrencate(event.target.value);
  };
  useEffect(() => {
    // get list user lần đầu
    if (!cateList) {
      dispatch(getCateList());
    }
    return () => dispatch(resetCateList());
  }, []);

  useEffect(() => {
    // get list user lần đầu
    if (!supplierList) {
      dispatch(getSupplierList());
    }
    return () => dispatch(resetSupplierList());
  }, []);

  useEffect(() => {
    // get list user lần đầu
    if (!authorList) {
      dispatch(getAuthorList());
    }
    return () => dispatch(resetAuthorList());
  }, []);

  const handleChangeFileImage = (e) => {
    let file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
      setSrcImage(e.target.result);
      formik.setFieldValue("image", e.target.result);
    };
    // Đem dữ liệu file lưu vào formik
  };

  const [imageFiles, setImageFiles] = useState([]);
  console.log("supplierList", supplierList);
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
        formik.setFieldValue("gallery", images);
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
  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
    desc: Yup.string().required("*Vui lòng nhập thông tin này"),
    price: Yup.string().required("*Vui lòng nhập thông tin này"),
    issuer: Yup.string().required("*Vui lòng nhập thông tin này"),
    bookCover: Yup.string().required("*Vui lòng nhập thông tin này"),
    totalPage: Yup.string().required("*Vui lòng nhập thông tin này"),
    publisher: Yup.string().required("*Vui lòng nhập thông tin này"),
    size: Yup.string().required("*Vui lòng nhập thông tin này"),
    idCate: Yup.string().required("*Vui lòng nhập thông tin này"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      desc: "",
      price: "",
      // quantity: "",
      bookCover: "",
      totalPage: "",
      publisher: "",
      issuer,
      size: "",
      image: "",
      gallery: "",
      idCate: "",
      authorId: "",
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      if (loadingCreateBook) {
        return;
      }
      console.log("data", data);
      dispatch(createBook(data));
      resetForm();
      setOpen(false);
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
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    autoComplete="name"
                    label="Tên sách"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <FormControl
                    fullWidth
                    error={Boolean(touched.idCate && errors.idCate)}
                  >
                    <InputLabel id="select">Chọn thể loại</InputLabel>
                    <Select
                      value={childrenCate}
                      label="childrenCate"
                      onChange={handleChangeChildrenCate}
                      {...getFieldProps("idCate")}
                    >
                      {cateList?.data?.map((cate) => (
                        <MenuItem
                          value={cate._id} // giá trị sẽ được đẩy lên
                          key={cate._id}
                        >
                          {cate.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage
                      name="idCate"
                      render={(msg) => (
                        <span className="text-red-600 text-xs mt-1 ml-3">
                          {msg}
                        </span>
                      )}
                    />
                  </FormControl>
                </Stack>
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
                    height: 300,
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
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    autoComplete="price"
                    label="Giá"
                    {...getFieldProps("price")}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                  {/* <TextField
                    fullWidth
                    autoComplete="quantity"
                    label="Số lượng"
                    {...getFieldProps("quantity")}
                    error={Boolean(touched.quantity && errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  /> */}
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <TextField
                    fullWidth
                    autoComplete="bookCover"
                    label="Bìa sách"
                    {...getFieldProps("bookCover")}
                    error={Boolean(touched.bookCover && errors.bookCover)}
                    helperText={touched.bookCover && errors.bookCover}
                  />
                  <TextField
                    fullWidth
                    autoComplete="totalPage"
                    label="Số trang"
                    {...getFieldProps("totalPage")}
                    error={Boolean(touched.totalPage && errors.totalPage)}
                    helperText={touched.totalPage && errors.totalPage}
                  />
                  <TextField
                    fullWidth
                    autoComplete="size"
                    label="Kích thước"
                    {...getFieldProps("size")}
                    error={Boolean(touched.size && errors.size)}
                    helperText={touched.size && errors.size}
                  />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <TextField
                    fullWidth
                    autoComplete="publisher"
                    label="Nhà xuất bản"
                    {...getFieldProps("publisher")}
                    error={Boolean(touched.publisher && errors.publisher)}
                    helperText={touched.publisher && errors.publisher}
                  />
                  <FormControl
                    fullWidth
                    error={Boolean(touched.issuer && errors.issuer)}
                  >
                    <InputLabel id="select">Chọn nhà phát hành</InputLabel>
                    <Select
                      value={issuer}
                      label="Chọn nhà phát hành"
                      onChange={handleChangeIssuer}
                      {...getFieldProps("issuer")}
                    >
                      {supplierList?.data?.map((issuer) => (
                        <MenuItem
                          value={issuer._id} // giá trị sẽ được đẩy lên
                          key={issuer._id}
                        >
                          {issuer.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage
                      name="issuer"
                      render={(msg) => (
                        <span className="text-red-600 text-xs mt-1 ml-3">
                          {msg}
                        </span>
                      )}
                    />
                  </FormControl>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.authorId && errors.authorId)}
                  >
                    <InputLabel id="select">Chọn tác giả</InputLabel>
                    <Select
                      value={author}
                      label="Chọn tác giả"
                      onChange={handleChangeAuthor}
                      {...getFieldProps("authorId")}
                    >
                      {authorList?.data?.map((author) => (
                        <MenuItem
                          value={author._id} // giá trị sẽ được đẩy lên
                          key={author._id}
                        >
                          {author.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage
                      name="authorId"
                      render={(msg) => (
                        <span className="text-red-600 text-xs mt-1 ml-3">
                          {msg}
                        </span>
                      )}
                    />
                  </FormControl>
                </Stack>
                {/* <Stack spacing={2}> */}
                <Button
                  variant="contained"
                  component="label"
                  sx={{ width: "15%", textTransform: "none !important" }}
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
                  sx={{ width: "15%", textTransform: "none !important" }}
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
