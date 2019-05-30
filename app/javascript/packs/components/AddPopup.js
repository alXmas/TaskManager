import React from 'react';
import {
  Modal, Button, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';
import { fetch } from '../utils/Fetch';
import UserSelect from './UserSelect';

export default class AppPopup extends React.Component {
  state = {
    task: {
      name: '',
      description: '',
      assignee: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
      },
    },
  }

  handleNameChange = (e) => {
    this.setState({ task: { ...this.state.task, name: e.target.value } });
  }

  handleDescriptionChange = (e) => {
    this.setState({ task: { ...this.state.task, description: e.target.value } });
  }

  handleCardAdd = () => {
    const { task } = this.state;
    const tasksUrl = Routes.api_v1_tasks_path();

    fetch('POST', tasksUrl, {
      task: {
        name: task.name,
        description: task.description,
        assignee_id: task.assignee.id
      }
    }).then(() => {
        this.props.onClose(true);
    });
  }

  handleAssigneeChange = (value) => {
    this.setState({ task: { ...this.state.task, assignee: value } });
  }

  render() {
    const { task } = this.state;
    const { show, onClose } = this.props;

    return (
      <div>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              New task
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel type="text">Task name:</ControlLabel>
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
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardAdd}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}