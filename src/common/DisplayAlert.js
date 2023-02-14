import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

const DisplayAlert = ({ error, open, setOpen }) => {
  if (Array.isArray(error)) {
    return error.map((element, index) => (
      <Collapse key={`${element.message}_${index}`} in={open}>
        <Alert
          className="mb1"
          variant="filled"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {`Error: ${element?.message}. Please try again.`}
        </Alert>
      </Collapse>
    ))
  } else {
    return <Collapse in={open}>
      <Alert
        className="mb1"
        variant="filled"
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {`Error: ${error}. Please try again.`}
      </Alert>
    </Collapse>
  }
}

export default DisplayAlert;