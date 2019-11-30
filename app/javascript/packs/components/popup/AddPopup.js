import React from "react";

import MakePopupBody from "./MakePopupBody";
import { Modal, Button } from "react-bootstrap";
import { fetch } from "../../utils/Fetch";

class AddPopup extends React.Component {
  state = {
    name: "",
    description: "",
    assignee: {
      id: null,
      first_name: null,
      last_name: null,
      email: null
    }
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleDecriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleAssigneeChange = value => {
    this.setState({ assignee: value });
  };

  handleCardAdd = () => {
    fetch("POST", window.Routes.api_v1_tasks_path(), {
      task: {
        name: this.state.name,
        description: this.state.description,
        assignee_id: this.state.assignee.id
      }
    }).then(response => {
      if (response.statusText == "Created") {
        this.props.onClose(true);
      } else {
        alert(response.status + " - " + response.statusText);
      }
    });
  };

  render() {
    const { name, description } = this.state;
    const handleNameChange = this.handleNameChange;
    const handleDecriptionChange = this.handleDecriptionChange;
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>New task</Modal.Title>
          </Modal.Header>
          <MakePopupBody
            name={name}
            description={description}
            handleDecriptionChange={handleDecriptionChange}
            handleNameChange={handleNameChange}
          />
          <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardAdd}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddPopup;
