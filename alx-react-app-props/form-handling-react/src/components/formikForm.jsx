import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Formik form submitted:', values);
    alert('Registration with Formik Successful!');
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Formik Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
              <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;