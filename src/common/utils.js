import Cookies from 'js-cookie';

export const authorizationData = () => {
  return { headers: { 'Authorization': Cookies.get('user') } }
}

export const dataApi = (method, data) => {
  if (data === null || data === undefined) {
    return {
      method: method,
      headers: {
        'Authorization': Cookies.get('user')
      }
    }
  } else {
    return {
      method: method,
      headers: {
        'Authorization': Cookies.get('user'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  }
}

export const checkStatusCode = (data, type, dispatch) => {
  if (data[0]?.statusCode !== undefined && data[0]?.statusCode !== 200) {
    throw data;
  } else if (data !== undefined && data.statusCode === 403) {
    throw data;
  } else {
    return dispatch({ type: type, payload: data })
  }
}

export const validateInputValue = (setInvalidValue, validationRegex, event) => {
  if (event.target.value.match(validationRegex)) {
    setInvalidValue(false);
    return true;
  } else {
    setInvalidValue(true);
    return false;
  }
}

export const validateInputValueAndShowErrorMessage = (setInvalidValue, validationRegex, event, setErrorMessage, errorMessage) => {
  if (event.target.value.match(validationRegex)) {
    setInvalidValue(false);
    setErrorMessage("");
  } else {
    setInvalidValue(true);
    setErrorMessage(errorMessage);
  }
}

export const preventSubmitIfInvalidInput = () => {
  alert('You have provided invalid data. Please correct and submit again.');
}

export const onForbidden = (history, onResetData) => {
  history.push("/forbidden");
  onResetData();
}

export const checkIfInitialRetailPriceIsNull = (initialProduct) => {
  if (initialProduct?.retailPrice !== null && initialProduct?.retailPrice !== undefined)
    return initialProduct.retailPrice;
  else
    return '0.00';
}