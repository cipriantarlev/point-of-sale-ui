import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    marginTop: "100px",
  },
});

const ProgressLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export default ProgressLoading;