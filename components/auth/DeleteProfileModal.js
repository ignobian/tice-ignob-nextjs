import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, FormGroup, Input } from 'reactstrap';
import { isAuth, getCookie, signout, deleteProfile } from '../../actions/auth';
import Router from 'next/router';
import Error from '../Error';

const DeleteProfileModal = ({ isOpen, toggle }) => {
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    username: '',
    deleteBlogs: false
  });

  const { username, deleteBlogs } = values;

  const token = getCookie('token');

  const handleChange = name => e => {
    setError('');
    if (name === 'deleteBlogs') {
      setValues({ ...values, deleteBlogs: !deleteBlogs });
    } else {
      setValues({ ...values, [name]: e.target.value });
    }
  }

  const handleDeleteProfile = async () => {
    const data = await deleteProfile(deleteBlogs, token);
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
          <Input placeholder={isAuth() && isAuth().username} onChange={handleChange('username')} value={username} />
        </FormGroup>

        <div className="pl-4">
          <Label check>
            <Input type="checkbox" checked={deleteBlogs} onChange={handleChange('deleteBlogs')} /> Also delete all of my blogs
          </Label>
        </div>

      </ModalBody>
      <ModalFooter>
        <Button color="danger" disabled={disabled} outline onClick={handleDeleteProfile}>Delete profile</Button>{' '}
        <Button color="secondary" outline onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteProfileModal;
