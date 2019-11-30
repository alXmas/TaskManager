import React from "react";
import { Modal, FormGroup, FormControl } from "react-bootstrap";

const MakePopupBody = ({
  name,
  description,
  handleNameChange,
  handleDecriptionChange
}) => (
  <Modal.Body>
    <form>
      <FormGroup controlId="formTaskName">
        <controlLabel>Task name:</controlLabel>
        <FormControl
          type="text"
          value={name}
          placeholder="Set the name for the task"
          onChange={handleNameChange}
        />
      </FormGroup>
      <FormGroup controlId="formDescriptionName">
        <controlLabel>Task description:</controlLabel>
        <FormControl
          componentClass="textarea"
          value={description}
          placeholder="Set the description for the task"
          onChange={handleDecriptionChange}
        />
      </FormGroup>
    </form>
  </Modal.Body>
);

export default MakePopupBody;
