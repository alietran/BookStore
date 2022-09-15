import React, { useEffect, useState } from "react";
import { Box, Button, Rating } from "@mui/material";
import useStyles from "../OrderHistory/style";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
const labels = {
  1: "Tệ",
  2: "Không hài lòng",
  3: "Bình thường",
  4: "Hài lòng",
  5: "Tuyệt vời",
};

export default function RatingItem() {
  // const [imgValue, setImgValue] = useState();

//   const {
//     errors,
//     touched,
//     handleSubmit,
//     getFieldProps,
//     values,
//     setFieldValue,
//   } = formik;
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const classes = useStyles();
  const handleChangeFileGallery = (e) => {
    let files = e.target.files;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      //chọn file hợp lệ
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);

      // setImageFiles(e.target.files);
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
          //đọc từng file
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result) {
              images.push(result);
            }
            // sl file nhập vào bằng sl file đã đọc
            if (images.length === imageFiles.length && !isCancel) {
              setImages(images);
            }
          };
          //đọc url
          fileReader.readAsDataURL(file);
        });
      }
      return () => {
        isCancel = true;
        fileReaders.forEach((fileReader) => {
          if (fileReader.readyState === 1) {
            // nhiều ảnh thì dùng
            fileReader.abort();
          }
        });
      };
    }, [imageFiles]);
  const [value, setValue] = useState(3);
  return (
    <div>
      {" "}
      <div className="flex  ">
        <p>Mức độ hài lòng</p>{" "}
        <span>
          <Rating
            className="ml-5"
            value={value}
            size={"medium"}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </span>
        <Box sx={{ ml: 2 }}>
          {value >= 4 ? (
            <span className="text-orange-600">{labels[value]}</span>
          ) : (
            <span>{labels[value]}</span>
          )}
        </Box>
      </div>
      <input
        className={classes.inputReviwer}
        type="text"
        placeholder="Bạn nghĩ gì về trải nghiệm mua hàng này ?"
      />
      <Button
        variant="contained"
        component="label"
        sx={{
          margin: "10px 0 20px 0",
          padding: " 5x 5px",
          width: "25%",
          textTransform: "none !important",
        }}
      >
        <CameraAltIcon /> <span className="ml-2">Thêm ảnh</span>
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
              className="w-24 h-auto  mr-3"
            />
          ))}
      </div>
    </div>
  );
}
