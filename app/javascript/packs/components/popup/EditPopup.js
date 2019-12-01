import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { getCard, updateCard, deleteCard } from "../../utils/FetchHelper";
import Form from "./Form";
import MakePopupBody from "./MakePopupBody";

class EditPopup extends Component {
  state = Form.defaultAttributes();

  loadCard = cardId => {
    this.setState({ isLoading: true });

    getCard(cardId).then(({ data }) => {
      this.setState({ task: data, isLoading: false });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.cardId != null && this.props.cardId !== prevProps.cardId) {
      this.loadCard(this.props.cardId);
    }
  }

  handleNameChange = e => {
    this.setState({ task: { ...this.state.task, name: e.target.value } });
  };

  handleDecriptionChange = e => {
    this.setState({
      task: { ...this.state.task, description: e.target.value }
    });
  };

  handleCardEdit = () => {
    updateCard(
      this.props.cardId,
      Form.attributesToSubmit(this.state.task)
    ).then(response => {
      if (response.statusText === "OK") {
        this.props.onClose(this.state.task.state);
      } else {
        alert(
          "Update failed! " + response.status + " - " + response.statusText
        );
      }
    });
  };

  handleCardDelete = () => {
    deleteCard(this.props.cardId).then(response => {
      if (response.statusText === "OK") {
        this.props.onClose(this.state.task.state);
      } else {
        alert(
          "DELETE failed! " + response.status + " - " + response.statusText
        );
      }
    });
  };

  handleAuthorChange = value => {
    this.setState({ task: { ...this.state.task, author: value } });
  };

  handleAssigneeChange = value => {
    this.setState({ task: { ...this.state.task, assignee: value } });
  };

  render() {
    const { name, description, id, state, author } = this.state.task;
    const handleNameChange = this.handleNameChange;
    const handleDecriptionChange = this.handleDecriptionChange;

    if (this.state.isLoading) {
      return (
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {id} [{state}]
            </Modal.Title>
            Author: {author.first_name} {author.last_name}
          </Modal.Header>
          <MakePopupBody
            name={name}
            description={description}
            handleDecriptionChange={handleDecriptionChange}
            handleNameChange={handleNameChange}
          />
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleCardDelete}>
              Delete
            </Button>
            <Button bsStyle="primary" onClick={this.handleCardEdit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditPopup;
