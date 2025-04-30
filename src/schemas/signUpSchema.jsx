import * as Yup from 'Yup';

export const signUpSchema = Yup.object({
    firstName: Yup.string()
        .min(2, "First name is too short")
        .max(30, "First name is too long")
        .required("Please enter your first name"),

    lastName: Yup.string()
        .min(2, "Last name is too short")
        .max(30, "Last name is too long")
        .required("Please enter your last name"),
    emailName: Yup.string().email("Please Enter Valid Email").matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please Enter Valid Email"
    ).required("Please Enter Email"),
    emailPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[a-z]/, 'Password must contain at least 1 lower case letter') // for lowercase letters
        .matches(/[A-Z]/, 'Password must contain at least 1 upper case letter') // for uppercase letters
        .matches(/\d/, 'Password must contain at least 1 number') // for numbers
        .matches(/[\W_]/, 'Password must contain at least 1 special character') // for special characters
        .required("Please Enter Password"),
    emailConfirmPassword: Yup.string().oneOf([Yup.ref("emailPassword"), null], "Password must match").required("Enter Confirm Password"),
    gender: Yup.string()
        .oneOf(["male", "female", "other"], "Invalid gender selection")
        .required("Please Enter Your Gender"),
    emailDob: Yup.date().required("Please select your date of birth")
        .max(new Date(), "Date of birth cannot be in the future"),

    address: Yup.string().optional(),

    phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .optional(),

    title: Yup.string().optional(),
});

