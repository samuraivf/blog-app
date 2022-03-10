export const registerOptions = {
    username: { 
        required: 'Username is required',
        pattern: {
            value: /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            message: 'Username should be valid'
        },
        minLength: {
            value: 4,
            message: 'Username must have at least 4 characters'
        },
        maxLength: {
            value: 20,
            message: 'Username must have up to 20 characters'
        }
    },
    email: { 
        required: 'Email is required',
        pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Please enter a valid email'
        }
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters'
      },
      maxLength: {
          value: 20,
          message: 'Password must have up to 20 characters'
      }
    }
}
