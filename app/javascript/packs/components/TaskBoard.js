import React from 'react';
import Board from 'react-trello';
import { Button } from 'react-bootstrap';
import { fetch } from '../utils/Fetch';
import AddPopup from './AddPopup';
import EditPopup from './EditPopup';
import LaneHeader from './LaneHeader';

export default class TasksBoard extends React.Component {
  state = {
    addPopupShow: false,
    editPopupShow: false,
    editCardId: null,
    board: {
      new_task: null,
      in_development: null,
      in_qa: null,
      in_code_review: null,
      ready_for_release: null,
      released: null,
      archived: null,
    },
  }

  state_events = {
    new_task: null,
    in_development: 'start_develop',
    in_qa: 'start_qa',
    in_code_review: 'start_review',
    ready_for_release: 'mark_as_ready',
    released: 'release',
    archived: 'archive',
  }

  generateLane(id, title, state_event) {
    const tasks = this.state[id];

    return {
      id,
      title,
      total_count: (tasks) ? tasks.meta.total_count : 'None',
      cards: (tasks) ? tasks.items.map(task => ({
        ...task,
        label: task.state,
        title: task.name,
      })) : [],
    };
  }

  getStateEventName = stateId => this.state_events[stateId];

  getBoard() {
    return {
      lanes: [
        this.generateLane('new_task', 'New'),
        this.generateLane('in_development', 'In Dev'),
        this.generateLane('in_qa', 'In QA'),
        this.generateLane('in_code_review', 'In CR'),
        this.generateLane('ready_for_release', 'Ready for release'),
        this.generateLane('released', 'Released'),
        this.generateLane('archived', 'Archived'),
      ],
    };
  }

  loadLines() {
    this.loadLine('new_task');
    this.loadLine('in_development');
    this.loadLine('in_qa');
    this.loadLine('in_code_review');
    this.loadLine('ready_for_release');
    this.loadLine('released');
    this.loadLine('archived');
  }

  componentDidMount() {
    this.loadLines();
  }

  loadLine(state, page = 1) {
    this.fetchLine(state, page).then((data) => {
      this.setState({
        [state]: data,
      });
    });
  }

  fetchLine(state, page = 1) {
    const params = {q: { state_eq: state }, page, per_page: 10, format: 'json'};
    const tasks_url = Routes.api_v1_tasks_path(params);

    return fetch('GET', tasks_url)
      .then(({ data }) => data);
  }

  onLaneScroll = (requestedPage, state) => {
    return this.fetchLine(state, requestedPage).then(({items}) => {
      return items.map((task) => {
        return {
          ...task,
          label: task.state,
          title: task.name
        };
      });
    })
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    const update_task_url = Routes.api_v1_task_path(cardId, { format: 'json' });
    const body = { task: { state_event: this.getStateEventName(targetLaneId) } };

    fetch('PUT', update_task_url, body)
      .then(() => {
        this.loadLine(sourceLaneId);
        this.loadLine(targetLaneId);
      });
  }

  handleAddShow = () => {
    this.setState({ addPopupShow: true });
  }

  handleAddClose = (added = false) => {
    this.setState({ addPopupShow: false });
    if (added == true) {
      this.loadLine('new_task');
    };
  }

  onCardClick = (cardId) => {
    this.setState({editCardId: cardId});
    this.handleEditShow();
  }

  handleEditClose = (edited = '') => {
    this.setState({ editPopupShow: false });
    switch (edited) {
      case 'new_task':
      case 'in_development':
      case 'in_qa':
      case 'in_code_review':
      case 'ready_for_release':
      case 'released':
      case 'archived':
        this.loadLine(edited);
        break;
      default:
        break;
    }
  }

  handleEditShow = () => this.setState({ editPopupShow: true });

  render() {
    return (
      <div>
        <h1>Your tasks</h1>
        <Button bsStyle="primary" onClick={this.handleAddShow}>Create new task</Button>

        <Board
          draggable
          laneDraggable={false}
          handleDragEnd={this.handleDragEnd}
          onLaneScroll={this.onLaneScroll}
          data={this.getBoard()}
          customLaneHeader={<LaneHeader />}
          cardsMeta={this.state}
          onCardClick={this.onCardClick}
        />

        <AddPopup
          show = {this.state.addPopupShow}
          onClose={this.handleAddClose}
        />

        <EditPopup
          key={this.state.editCardId}
          show={this.state.editPopupShow}
          onClose={this.handleEditClose}
          cardId={this.state.editCardId}
        />
      </div>
    );
  }
}