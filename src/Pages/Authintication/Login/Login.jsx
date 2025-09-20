import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../firebase/FirebaseAuthProvider";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  // Email/password login
  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          timer: 1500,
          draggable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Google login
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Signed in with Google 🎉",
          icon: "success",
          timer: 1500,
          draggable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="card w-full max-w-md glass shadow-2xl p-6 rounded-2xl border border-white/20 backdrop-blur-lg">
        <h1 className="text-3xl text-center font-extrabold text-white mb-6 drop-shadow-lg">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email field */}
          <div>
            <label className="label text-white font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-white/80 focus:bg-white"
              placeholder="Enter your email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-200 mt-1">⚠ Email is required</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label className="label text-white font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full bg-white/80 focus:bg-white"
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-200 mt-1">⚠ Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-200 mt-1">
                ⚠ Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a className="link link-hover text-white/80">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button className="btn w-full bg-gradient-to-r from-indigo-600 to-purple-500 border-none text-white text-lg font-bold shadow-lg hover:scale-105 transition-transform duration-300">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-white/80">OR</div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="btn w-full bg-white text-gray-700 font-semibold border border-gray-300 shadow-md hover:bg-gray-100 flex items-center gap-2"
        >
          <FcGoogle size={24} /> Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-center text-white/90 mt-5">
          Don't Have An Account?{" "}
          <Link
            to="/register"
            className="text-yellow-300 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
