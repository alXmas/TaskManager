import React from "react";

import { FormGroup, FormLabel } from "react-bootstrap";

const FormControl = ({ controlId, controlLabel, children }) => (
  <FormGroup controlId={controlId}>
    <FormLabel>{controlLabel}</FormLabel>
    {children}
  </FormGroup>
);

export default FormControl;
