import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import trash2Fill from "@iconify/icons-eva/trash-2-outline";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
// material

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";

import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { useState } from "react";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ cusTomSearch, theme }) => ({
  ...(cusTomSearch
    ? {
        width: "100%",
      }
    : {
        width: 240,
        transition: theme.transitions.create(["box-shadow", "width"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
        "& fieldset": {
          borderWidth: `1px !important`,
          borderColor: `${theme.palette.grey[500_32]} !important`,
        },
      }),
}));

// ----------------------------------------------------------------------

OrderToolbar.propTypes = {
  filterList: PropTypes.string,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  selectTag: PropTypes.string,
  onSelectTag: PropTypes.func,
  valueDate: PropTypes.string,
  onFilterDate: PropTypes.func,
  haveInput: PropTypes.bool,
};

export default function OrderToolbar({
  onFilterName,
  filterName,
  filterList,
  selectTag,
  onSelectTag,
  valueDate,
  onFilterDate,
  haveInput,
}) {
  console.log("selectTag", selectTag);
  // const [value, setValue] = useState(null);

  return (
    <RootStyle>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <Select
              value={selectTag}
              onChange={onSelectTag}
              defaultValue={"infoUser"}
              label="    "
            >
              <MenuItem value={`infoUser`}>Th??ng tin kh??ch h??ng</MenuItem>

              <MenuItem value={`createdDate`}>Ng??y ?????t</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {
          selectTag === "infoUser" ? (
            <Grid item xs={9}>
              <SearchStyle
                cusTomSearch={true}
                value={filterName}
                onChange={onFilterName}
                label="    "
                placeholder={"Nh???p t??n ho???c s??? ??i???n tho???i kh??ch h??ng"}
                startAdornment={
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={searchFill}
                      sx={{ color: "text.disabled" }}
                    />
                  </InputAdornment>
                }
              />
            </Grid>
          ) : haveInput ? (
            <Grid item xs={9}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ng??y ?????t"
                  value={valueDate}
                  onChange={onFilterDate}
                  inputFormat="DD/MM/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          ) : (
            ""
          )
          // <Grid item xs={9}>
          //   <LocalizationProvider dateAdapter={AdapterDayjs}>
          //     <DatePicker
          //       label="Ng??y ?????t"
          //       value={valueDate}
          //       onChange={onFilterDate}
          //       renderInput={(params) => <TextField {...params} />}
          //     />
          //   </LocalizationProvider>
          // </Grid>
        }
      </Grid>
    </RootStyle>
  );
}
