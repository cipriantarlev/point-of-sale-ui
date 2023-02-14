import React from 'react';
import Form from 'react-bootstrap/Form'

const InvalidFieldText = ({ isInvalid, message, ariaDescribedbyId }) => {
  return isInvalid ?
    <Form.Text id={`${ariaDescribedbyId}`} style={{ color: 'red' }}>
      {`${message}`}
    </Form.Text>
    : null
}
export default InvalidFieldText;