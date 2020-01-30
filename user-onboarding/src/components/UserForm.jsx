import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status has changed!", status);
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div>
      <Form>
        <label htmlFor="name">
          Name
          <Field id="name" type="text" name="name" placeholder="Apple Seed" />
          {touched.name && errors.name && (
            <p className="errors">{errors.species}</p>
          )}
        </label>

        <label htmlFor="email">
          Email
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="appleseed@me.com"
          />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>

        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit</button>
      </Form>

      {users.map(user => {
        return (
          <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.name || "",
      termsOfService: props.termsOfService || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required("Email is required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);

        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);
export default FormikUserForm;
