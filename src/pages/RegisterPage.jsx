import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { AuthRepo } from "../data/repos/Authentication";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function RegisterPage() {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const PhoneRegex = /^\+201[0125]\d{8}$/;
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long")
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    username: Yup.string()
      .required("Username is required")
      .min(2, "Username must be at least 2 characters long"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(PhoneRegex, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits long"),
  });

  const handleSubmit = (values) => {
    AuthRepo.register(values)
      .then((res) => {
        res && sessionStorage.setItem("jwt", res.jwt);
        navigate("/");
        res &&
          toast.success(`ya welcome , ya ${res.user.username}`, {
            autoClose: 2000,
          });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(values);
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-neutral-300">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{
          email: "",
          password: "",
          username: "",
          phone: "",
        }}
      >
        <Form className="w-[650px] p-3 rounded-2xl shadow border-1 border-neutral-400 bg-white text-black">
          <h1 className="text-2xl">Register</h1>

          <label htmlFor="">Enter your email</label>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="w-full input bg-white border-neutral-400 rounded-lg mb-3"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />

          <label htmlFor="">Enter your username</label>
          <Field
            name="username"
            type="text"
            placeholder="username"
            className="w-full input bg-white border-neutral-400 rounded-lg mb-3"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-500"
          />

          <label htmlFor="">Enter your Phone</label>
          <Field
            name="phone"
            type="text"
            placeholder="Phone"
            className="w-full input bg-white border-neutral-400 rounded-lg mb-3"
          />
          <ErrorMessage name="phone" component="div" className="text-red-500" />

          <label htmlFor="">Enter your password</label>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="w-full input bg-white border-neutral-400 rounded-lg mb-3"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />

          <button
            type="submit"
            onSubmit={handleSubmit}
            className="btn btn-soft btn-info"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

// token <= User
