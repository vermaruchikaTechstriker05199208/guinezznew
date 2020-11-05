const validator = {

  email: {
    rules: [
      {
        test: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
        message: 'Please Enter Valid Email',
      },
    ],
    errors: [],
    valid: false,
    state: '',
  },
  password: {
    rules: [
      {
        test: (value) => {
          return value.length >= 6;
        },
        message: 'Password can not be < 6 characters',
      },
      {
        test:/^(?=.*\d).{8,20}$/,
        message: 'Enter Valid Password',
      },
    ],
    errors: [],
    valid: false,
    state: ''
  },
  username: {
    rules: [
      {
        test: /^[a-zA-Z_]+$/i,
        message: 'number not allowed',
      },
    ],
    errors: [],
    valid: false,
    state: '',
  },
};

export default validator;