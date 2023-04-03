import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  getProductos,
  getAreas,
  updateProduct,
} from "../service/ProductService";
import EditIcon from "@material-ui/icons/Edit";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const useStyles2 = makeStyles((theme) => ({
  searchInput: {
    width: "100%",
  },
}));
const data = {
  productArea: "nueva area",
  product: "nombreProducto",
  createdAt: "2023-03-14T23:57:28.833Z",
  updatedAt: "2023-03-14T23:57:31.730Z",
  publishedAt: "2023-03-14T23:57:31.727Z",
  Product: "Producto Area",
  synopsis: "This is a nice synopsis",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const MainPage = () => {
  const classes = useStyles();
  const classes2 = useStyles2();
  const navigate = useNavigate();

  const [dataProducts, setDataProducts] = useState();
  const [dataSearch, setdataSearch] = useState();
  const [areas, setAreas] = useState();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //new product
  const [productName, setProductName] = useState();
  const [first, setfirst] = useState();
  const [synopsis, setSynopsis] = useState();
  const [technicalLeader, setTechnicalLeader] = useState();
  const [productManager, setProductManager] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [flagSave, setFlagSave] = useState(true);
  useEffect(() => {
    getDataProduct();
    getDataArea();
  }, []);

  const getDataProduct = async () => {
    const { data } = await getProductos();
    console.log(data);
    setDataProducts(data);
    setdataSearch(data);
  };

  const getDataArea = async () => {
    const { data } = await getAreas();
    console.log(data);
    setAreas(data);
  };
  const handleRowClick = (rowData) => {
    console.log("Table row clicked!");
    console.log(rowData);
    navigate("/detail/1", { state: rowData });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    cleanInputs();
  };
  const getArea = (e) => {
    // console.log(e);
    if (e.data != undefined) return e.data.attributes?.areaName ?? "";
    else return "";
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value !== "") {
      setdataSearch(
        dataSearch.filter((e) =>
          e.attributes.productName.toLowerCase().includes(event.target.value)
        )
      );
    } else {
      console.log(dataProducts);
      setdataSearch(dataProducts);
    }
    cleanInputs();
  };

  const handleEdit = ({ attributes }, id) => {
    setFlagSave(false);
    console.log(attributes);
    console.log(areas);
    setProductName(attributes.productName);
    setProductManager(attributes.productManager);
    setTechnicalLeader(attributes.productName);
    setSynopsis(attributes.synopsis);
    setSelectedValue(areas.filter((e) => e.id == attributes.area.data.id)[0]);
    let obj = {
      data: {
        productName,
        synopsis,
        technicalLeader,
        productManager,
        area: selectedValue,
      },
    };

    updateProduct(obj, id).then((res) => {
      getDataProduct();
      handleClose();
    });
    handleOpen();
  };

  const handleCreateProduct = (event) => {
    console.log(selectedValue);
    let obj = {
      data: {
        productName,
        synopsis,
        technicalLeader,
        productManager,
        area: selectedValue,
      },
    };
    addProduct(obj).then((res) => {
      console.log(res);
      getDataProduct();
      handleClose();
    });
  };

  const cleanInputs = () => {
    setProductName("");
    setProductManager("");
    setSynopsis("");
    setTechnicalLeader("");
    setProductManager("");
    setSelectedValue();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {flagSave ? "Add new Product" : "Edit Component"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          />
          <TextField
            placeholder="MultiLine with rows: 2 and rowsMax: 4"
            multiline
            maxRows={4}
            fullWidth
            label="Synopsis"
            onChange={(e) => setSynopsis(e.target.value)}
            value={synopsis}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Technical Leader"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTechnicalLeader(e.target.value)}
            value={technicalLeader}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product manager"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProductManager(e.target.value)}
            value={productManager}
          />
          <br />
          {areas != undefined && (
            <>
              <Grid>
                <InputLabel id="dropdown-label">Select an area</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  variant="standard"
                  fullWidth
                  margin="dense"
                  value={selectedValue}
                  onChange={(event) => setSelectedValue(event.target.value)}
                >
                  {areas.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.attributes.areaName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={flagSave ? handleCreateProduct : handleEdit}>
            {flagSave ? "Save" : "Edit"}
          </Button>
        </DialogActions>
      </Dialog>
      <AppBar position="static" style={{ backgroundColor: "#1B2857" }}>
        <Toolbar>
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            Siepe product inventory
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <h1>Product Inventory Demo</h1>
        <Grid alignItems="flex-end" justify="flex-start">
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Create
          </Button>
        </Grid>
        <br />
        <Grid>
          <TextField
            className={classes2.searchInput}
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Grid>
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Area</TableCell>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Synopsis</TableCell>
                <TableCell align="center">Actions</TableCell>
                {/* <TableCell align="right">Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSearch !== undefined &&
                dataSearch.map((row) => (
                  <TableRow hover onClick={() => handleRowClick(row)}>
                    <TableCell component="th" scope="row">
                      <b>{getArea(row.attributes.area)}</b>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.attributes.productName}
                    </TableCell>
                    <TableCell>{row.attributes.synopsis}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(row, row.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
      </Container>
    </div>
  );
};
