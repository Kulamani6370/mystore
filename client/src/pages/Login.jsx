import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, useNavigate } from "react-router-dom";
// import { customFetch, customFetchDemo } from "../utils";
import { toast } from "react-toastify";
import { loginUserThunk } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.userState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      await dispatch(loginUserThunk(data)).unwrap();
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error(error || "Invalid credentials");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        onSubmit={handleSubmit}
      >
        <h4 className="text-center text-3xl fort-bold">Login</h4>
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        {/* <div className="mt-4">
          <SubmitBtn text="login" />
        </div> */}
        <button
          type="submit"
          className="btn btn-secondary btn-block"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>{" "}
        </p>
      </Form>
    </section>
  );
};

export default Login;
