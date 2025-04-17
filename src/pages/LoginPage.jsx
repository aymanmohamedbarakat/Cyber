import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { AuthRepo } from "../data/repos/Authentication";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function LoginPage() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleLogin = (values) => {
    // console.log(values);
    AuthRepo.login(values).then((res) => {
      if (res) {
        sessionStorage.setItem("jwt", res.jwt);
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
        });
        let redirect = sessionStorage.getItem("redirect");
        if (redirect) {
          navigate("/checkout");
        } else {
          navigate("/profile");
        }
      } else {
        toast.error("Invalid email or password", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  return (
    <div className="w-full h-[100vh] bg-gray-600  flex justify-center items-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
      >
        <Form className="bg-white p-3 rounded-md shadow-md w-[400px] flex flex-col gap-3">
          <label htmlFor="">Email</label>
          <Field
            placeholder="Enter Your Email...."
            type="email"
            name="email"
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
          <label htmlFor="">Password</label>
          <Field
            placeholder="Enter Your Password...."
            type="password"
            name="password"
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white rounded-md p-2 mt-3 hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}
