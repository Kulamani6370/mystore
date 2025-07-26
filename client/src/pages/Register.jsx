import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../features/user/userSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.userState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      await dispatch(registerUserThunk(data)).unwrap();
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Registration failed. Please check your inputs.");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>

        <FormInput type="text" label="Name" name="name" required />
        <FormInput type="email" label="Email" name="email" required />
        <FormInput type="password" label="Password" name="password" required />
        <FormInput type="text" label="Mobile" name="mobile" required />

        <div className="mt-4">
          <SubmitBtn
            text={isLoading ? "Registering..." : "Register"}
            disabled={isLoading}
          />
        </div>

        <p className="text-center">
          Already registered?{" "}
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
