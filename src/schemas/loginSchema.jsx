import * as Yup from 'Yup';

export const loginSchema = Yup.object({
    emailName: Yup.string().email("Please Enter Valid Email").matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please Enter Valid Email"
    ).required("Please Enter Email"),
    // emailPassword: Yup.string()
    //     .min(6, "Password must be at least 6 characters")
    //     .matches(/[a-z]/, 'Password must contain at least 1 lower case letter') // for lowercase letters
    //     .matches(/[A-Z]/, 'Password must contain at least 1 upper case letter') // for uppercase letters
    //     .matches(/\d/, 'Password must contain at least 1 number') // for numbers
    //     .matches(/[\W_]/, 'Password must contain at least 1 special character') // for special characters
    //     .required("Please Enter Password"),
    emailPassword: Yup.string().required("Please Enter Password"),
    emailRemember: Yup.bool(),
});