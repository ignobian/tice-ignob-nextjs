import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input } from 'reactstrap';
import { isAuth, getCookie, signout, deleteProfile } from '../../actions/auth';
import Router from 'next/router';
import Error from '../Error';

const DeleteProfileModal = ({ isOpen, toggle }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const token = getCookie('token');

  const handleChange = e => {
    setError('');
    setUsername(e.target.value);
  }

  const handleDeleteProfile = async () => {
    const data = await deleteProfile(token);
    if (data.error) return setError(data.error);
    signout(() => Router.push('/'));
  }

  const disabled = username !== (isAuth() && isAuth().username);

  const showError = () => error && <Error content={error} />

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}><p className="text-danger">Delete profile</p></ModalHeader>
      <ModalBody>
        <p>Please type your username to confirm the removal of your profile:</p>

        {showError()}

        <FormGroup>
          <Input placeholder={isAuth() && isAuth().username} onChange={handleChange} value={username} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" disabled={disabled} outline onClick={handleDeleteProfile}>Delete profile</Button>{' '}
        <Button color="secondary" outline onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteProfileModal;
