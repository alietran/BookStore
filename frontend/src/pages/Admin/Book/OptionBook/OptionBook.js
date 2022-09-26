import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Option from "../../../../components/OptionEdit&Delete/Option";
import { LoadingButton } from "@mui/lab";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { useStyles } from "../CreateBook/style";
import {
  deleteBook,
  getDetailBook,
  updateBook,
} from "../../../../redux/action/bookAction";
import { Editor } from "@tinymce/tinymce-react";

export default function OptionBook({ id, book }) {
  console.log("book", book);
  const { authorList } = useSelector((state) => state.AuthorReducer);
  const { loadingUpdateBook } = useSelector((state) => state.BookReducer);
  const { cateList } = useSelector((state) => state.CateReducer);
  const classes = useStyles();
  const [author, setAuthor] = useState(10);
  const [open, setOpen] = useState(false);
  const [cate, setCate] = useState("");
  const [isReadyEditCate, setIsReadyEditCate] = useState(false);
  const [childrenCate, setChildrencate] = useState(10);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const editorRef = useRef(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleChangeCategory = (event) => {
    setCate(event.target.value);
  };
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const [srcImage, setSrcImage] = useState(book?.image);
  const [images, setImages] = useState(book?.gallery);

  const onClickEdit = () => {
    setOpen(true);
    dispatch(getDetailBook(id));
  };
  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
    // parentCateId: Yup.string().required("*Vui lòng nhập thông tin này"),
  });
  const handleEditorChange = (content, editor) => {
    setFieldValue("desc", content);
  };

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
      // values.gallery = e.target.files;
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

  // editorRef.current.getContent("desc");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: book.name,
      idCate: book.idCate._id,
      desc: book.desc,
      price: book.price,
      quantity: book.quantity,
      bookCover: book.bookCover,
      totalPage: book.totalPage,
      publisher: book.publisher,
      issuer: book.issuer,
      size: book.size,
      authorId: book.authorId._id,
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      if (loadingUpdateBook) {
        return;
      }
      dispatch(updateBook(book._id, data));
      console.log("data",data);
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
  // useEffect(() => {
  //   if (values.name && values.parentCateId) setIsReadyEditCate(true);
  //   else setIsReadyEditCate(false);
  // }, [values.name, values.parentCateId]);

  const handleChangeChildrenCate = (event) => {
    setChildrencate(event.target.value);
  };
  const handleUpdate = () => {
    if (isReadyEditCate) setOpen(false);
  };

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleClickConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCancel = () => {
    setOpenConfirm(false);
  };
  // handleCancel;
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    onClickDelete(id);
  };

  const onClickDelete = (id) => {
    dispatch(deleteBook(book._id));
  };
  return (
    <Box>
      <Option
        // onClickDelete={() => {
        //   onClickDelete(id);
        // }}
        onClickDelete={handleClickConfirm}
        onClickEdit={onClickEdit}
      ></Option>

      <Dialog
        open={openConfirm}
        // onClose={handleCloseCnfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa thể loại"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa thể loại này.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button onClick={handleCloseConfirm} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        className="text-center"
        fullWidth={true}
        maxWidth="md"
      >
        <Formik value={formik}>
          <Form onSubmit={handleSubmit}>
            <ModalDialog
              sx={{ fontSize: "23px !important" }}
              onClose={handleClose}
            >
              {" "}
              Chỉnh sửa sách
            </ModalDialog>

            <DialogContent dividers>
              <Stack spacing={3}>
                {" "}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
                      {cateList?.data?.map((cate, index) => (
                        <MenuItem
                          value={`${cate._id}`} // giá trị sẽ được đẩy lên
                          key={index}
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
                  tinymceScriptSrc={
                    "https://cdn.tiny.cloud/1/i2cpflyq3xn1h4uemftejor2d8p292ct4ckywqat4tvbp7iq/tinymce/6/tinymce.min.js"
                  }
                  onEditorChange={handleEditorChange}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={book.desc}
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
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
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
                    autoComplete="size"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                loading={loadingUpdateBook}
                onClick={handleUpdate}
                // disabled={!isReadyEditCate}
                className={classes.buttonCreate}
              >
                Chỉnh sửa
              </LoadingButton>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </Box>
  );
}
