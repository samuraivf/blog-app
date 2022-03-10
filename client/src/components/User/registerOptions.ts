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
    description: {
        maxLength: {
            value: 200,
            message: 'Too large description'
        }
    },
    location: {
        minLength: {
            value: 2,
            message: 'Location must have at least 2 characters'
        },
        maxLength: {
            value: 30,
            message: 'Location must have up to 30 characters'
        }
    }
}