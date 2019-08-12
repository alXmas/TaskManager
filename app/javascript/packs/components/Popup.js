// import React from 'react';
// import {
//   Modal, Button, FormGroup, ControlLabel, FormControl,
// } from 'react-bootstrap';
// import UserSelect from './UserSelect';

//  const Popup = ({ show, onClose, isLoading, task }) => {

//     if (isLoading) {
//       return (
//         <Modal show={show} onHide={onClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>
//               Info
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             Your task is loading. Please be patient.
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={onClose}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       );
//     }

//     return (
//       <div>
//         <Modal show={show} onHide={onClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>
//               Task # {task.id} [{task.state}]
//             </Modal.Title>
//           </Modal.Header>

//           <Modal.Body>
//             <form>
//               <FormGroup controlId="formAuthor">
//                 <ControlLabel type="text">Author:</ControlLabel>
//                 <UserSelect
//                   id="Author"
//                   isDisabled
//                   value={task.author}
//                   onChange={this.handleAuthorChange}
//                 />
//               </FormGroup>
//               <FormGroup controlId="formTaskName">
//                 <ControlLabel>Task name:</ControlLabel>
//                 <FormControl
//                   type="text"
//                   value={task.name}
//                   placeholder="Set the name for the task"
//                   onChange={this.handleNameChange}
//                 />
//               </FormGroup>
//               <FormGroup controlId="formDescriptionName">
//                 <ControlLabel>Task description:</ControlLabel>
//                 <FormControl
//                   componentClass="textarea"
//                   value={task.description}
//                   placeholder="Set the description for the task"
//                   onChange={this.handleDescriptionChange}
//                 />
//               </FormGroup>
//               <FormGroup controlId="formAssignee">
//                 <ControlLabel type="text">Assignee:</ControlLabel>
//                 <UserSelect
//                   id="Assignee"
//                   onChange={this.handleAssigneeChange}
//                   value={task.assignee}
//                 />
//               </FormGroup>
//             </form>
//           </Modal.Body>

//           <Modal.Footer>
//             <Button bsStyle="danger" onClick={this.handleCardDelete}>Delete</Button>
//             <Button onClick={onClose}>Close</Button>
//             <Button bsStyle="primary" onClick={this.handleCardEdit}>Save changes</Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

//  export default Popup
