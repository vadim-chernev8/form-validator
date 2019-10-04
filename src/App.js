import React from 'react';
import './App.css';

import { Form, Field } from './Form';

const schema = {
  name: {
    rules: {
      required: e => !!e,
    },
    messages: {
      required: 'Field is required',
    },
  },
  email: {
    rules: {
      required: e => !!e,
    },
    messages: {
      required: 'Field is required',
    },
  },
};

const initialValues = {
  name: 'Vadim',
  email: 'vadimchernev16@gmail.com',
}

const Input = ({ onChange, value, ...input }) => {
  return <input className="form--input" onChange={(e) => onChange(e.target.value)} value={value} {...input} />
}

function App() {
  const handleSubmit = (...args) => {
    console.log(args);
  }

  return (
    <div className="App">
      <section className="form-contaier">
        <Form schema={schema} initialValues={initialValues} onSubmit={handleSubmit}>
          <Field name="name" component={Input} />
          <Field name="email" component={Input} />
          <button className="form-buttom--submit">Submit</button>
        </Form>
      </section>
    </div>
  );
}

export default App;
