import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  fetchProducts,
  fetchProduct,
} from '../actions/productAction';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageProducts.isPending,
    products: state.manageProducts.products,
    error: state.manageProducts.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(fetchProducts()),
    onFetchProduct: (productId) => dispatch(fetchProduct(productId)),
  }
}

const FindProduct = (props) => {

  const {
    open,
    handleClose,
    isPending,
    products,
    error,
    onFetchProducts,
    onFetchProduct,
  } = props;

  const [productId, setProductId] = useState(0);

  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts])

  const onCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? handleClose() : null;
  }

  const onSelectProduct = () => {
    onFetchProduct(productId);
    handleClose();
  }

  const onFindProduct = (event) => {
    setProductId(event.target.value.substring(0, event.target.value.indexOf("|") - 1))
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-root"
      disableEscapeKeyDown={true}
    >
      {error ? <div className="tc red f3">Something went wrong during fetching products!</div> : null}
      {!isPending ?
        <DialogTitle id="form-dialog-title">Find Product</DialogTitle>
        :
        <DialogTitle id="form-dialog-loading">Loading data...</DialogTitle>}
      <DialogContent
        style={{
          width: 400,
        }}
      >
        <DialogContentText>
          Please enter the desired product name.
        </DialogContentText>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          onSelect={onFindProduct}
          options={products?.map((option) => option.id + " | " + option.nameRom + " | " + (option.discountPrice !== null ? Number(option.discountPrice).toFixed(2) : '0.00'))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search product"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSelectProduct}
          className="mr5 w4"
          variant="contained"
          color="primary"
        >
          Select
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          className="btn btn-warning ml5 w4"
          style={{
            color: '#212529',
            backgroundColor: '#ffc107',
            borderColor: '#ffc107',
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FindProduct);