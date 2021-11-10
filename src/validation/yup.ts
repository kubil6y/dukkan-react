import * as yup from "yup";

export const updateProfileSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .required("Must be provided"),
  last_name: yup
    .string()
    .required("Must be provided")
    .min(2, "Must be at least 2 characters"),
  email: yup.string().email("Must be valid email").required("Must be provided"),
  address: yup
    .string()
    .required("Must be provided")
    .min(12, "Must be at least 12 characters"),
  password: yup
    .string()
    .required("Must be provided")
    .min(6, "Must be at least 6 characters"),
  password_confirm: yup
    .string()
    .required("Must be provided")
    .min(6, "Must be at least 6 characters")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const registerUserSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .required("Must be provided"),
  last_name: yup
    .string()
    .required("Must be provided")
    .min(2, "Must be at least 2 characters"),
  email: yup.string().email("Must be valid email").required("Must be provided"),
  address: yup
    .string()
    .required("Must be provided")
    .min(12, "Must be at least 12 characters"),
  password: yup
    .string()
    .required("Must be provided")
    .min(6, "Must be at least 6 characters"),
  password_confirm: yup
    .string()
    .required("Must be provided")
    .min(6, "Must be at least 6 characters")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const loginUserSchema = yup.object().shape({
  email: yup.string().email("Must be valid email").required("Must be provided"),
  password: yup
    .string()
    .required("Must be provided")
    .min(6, "Must be at least 6 characters"),
});
