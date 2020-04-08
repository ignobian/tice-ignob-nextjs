import { useState } from 'react';
import { SecondaryButton, ButtonOutline } from './Button';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { isAuth, getCookie } from '../actions/auth';
import Router from 'next/router';
import Loading from './Loading';
import { createReport } from '../actions/report';

const ReportBtn = ({ blog }) => {
  const reportTypes = ['Sexual content', 'Violent content', 'Hateful content', 'Spam', 'Copyright content'];
  const [values, setValues] = useState({
    name: 'Sexual content',
    modal: false,
    form: true,
    message: '',
    loading: false
  });

  const { name, form, message, modal, loading, successModal } = values;

  const handleClick = () => {
    setValues({ ...values, modal: true });
  }

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();

    const token = isAuth() && getCookie('token');
    
    // redirect if user is not logged in
    if (!token) return Router.push('/signin');

    setValues({ ...values, loading: true });

    createReport({ blogId: blog._id, name, token }).then(data => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, loading: false });
      } else {
        setValues({ ...values, message: data.message, form: false, loading: false });
        setTimeout(() => {
          setValues({ ...values, modal: false, form: false, message: data.message });
        }, 1000);
      }
    });
  }

  const showLoading = () => loading && <Loading />;
  const showMessage = () => message && <p className="alert alert-success">{message}</p>;

  const showForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="type">Specify type of report:</Label>
        <Input id="type" type="select" onChange={handleChange('name')} value={name}>
          {reportTypes.map(type => (
            <option>{type}</option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <ButtonOutline type="submit">Send</ButtonOutline>
      </FormGroup>
    </Form>
  )

  const showModal = () => (
    <Modal isOpen={modal}>
      <ModalHeader>Report blog post {blog.title}</ModalHeader>
      <ModalBody>
        {showMessage()}
        {form && showForm()}
      </ModalBody>
    </Modal>
  )

  return (
    <>
      {showLoading()}
      <SecondaryButton onClick={handleClick} style={{fontSize: 12}}>Report</SecondaryButton>
      {showModal()}
      {successModal && showSuccessModal()}
    </>
  )
}

export default ReportBtn;
