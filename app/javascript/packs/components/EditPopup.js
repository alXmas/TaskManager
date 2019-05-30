import React from 'react';
import {
  Modal, Button, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';
import UserSelect from './UserSelect';
import { fetch } from '../utils/Fetch';

export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: '',
      description: '',
      state: null,
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
      },
      assignee: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
      },
    },
    isLoading: true,
  }

  constructor(props) {
    super(props);

    if (props.cardId) {
      this.state.isLoading = true;
      this.loadCard(props.cardId);
    }
  }

  loadCard = (cardId) => {
    const taskUrl = Routes.api_v1_task_path(cardId, { format: 'json' });

    fetch('GET', taskUrl)
      .then(({ data }) => {
        this.setState({ task: data, isLoading: false });
      });
  }

  handleNameChange = (e) => {
    this.setState({ task: { ...this.state.task, name: e.target.value } });
  }

  handleDescriptionChange = (e) => {
    this.setState({ task: { ...this.state.task, description: e.target.value } });
  }

  handleCardEdit = () => {
    const { task } = this.state;
    const taskUrl = Routes.api_v1_task_path(this.props.cardId, { format: 'json' });

    fetch('PUT', taskUrl, {
      name: task.name,
      description: task.description,
      author_id: task.author.id,
      assignee_id: task.assignee.id,
      state: task.state,
    }).then((response) => {
        this.props.onClose(true);
    });
  }

  handleCardDelete = () => {
    const taskUrl = Routes.api_v1_task_path(this.props.cardId, { format: 'json' });

    fetch('DELETE', taskUrl)
      .then((response) => {
        this.props.onClose(true);
      });
  }

  handleAuthorChange = (value) => {
    this.setState({ task: { ...this.state.task, author: value } });
  }

  handleAssigneeChange = (value) => {
    this.setState({ task: { ...this.state.task, assignee: value } });
  }

  render() {
    const { show, onClose } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your task is loading. Please be patient.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    const { task } = this.state;

    return (
      <div>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {task.id} [{task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formAuthor">
                <ControlLabel type="text">Author:</ControlLabel>
                <UserSelect
                  id="Author"
                  isDisabled
                  value={task.author}
                  onChange={this.handleAuthorChange}
                />
              </FormGroup>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={task.name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={task.description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDescriptionChange}
                />
              </FormGroup>
              <FormGroup controlId="formAssignee">
                <ControlLabel type="text">Assignee:</ControlLabel>
                <UserSelect
                  id="Assignee"
                  onChange={this.handleAssigneeChange}
                  value={task.assignee}
                />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleCardDelete}>Delete</Button>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardEdit}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}