import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [errors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    // Form submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await axios.post(
                "https://practice-back-hzbp.onrender.com/auth/register",
                values,
                {
                    "Content-Type": "application/json",
                }
            );
            if (response.status === 201) {
                Swal.fire("Registered Successfully", "", "success").then((result) => {
                    if (
                        result.isConfirmed ||
                        result.dismiss === Swal.DismissReason.close
                    ) {
                        window.location.href = "/";
                        const token = response.data.jwt;
                        localStorage.setItem("token", token);
                        console.log(token);
                    }
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Swal.fire("All Fields Are Required", "", "info");
            } else if (error.response && error.response.status === 400) {
                Swal.fire("", "Email already in use", "info");
            } else {
                Swal.fire("Internal Server Error", "", "danger");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="sm:p-10 p-5 rounded-2xl shadow-lg hover:shadow-xl lg:w-[28rem] md:w-[20rem]  mt-8 xl:ml-5 py-3"
                >
                    
                    <div className="mb-6">
                        <label
                            htmlFor="firstName"
                            className="block mb-2 sm:text-sm text-xs font-medium text-gray-700"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                            id="firstName"
                            placeholder="Enter Your First Name"
                            name="firstName"
                            onChange={handleInput}
                        />
                        {errors.firstName && (
                            <span className="text-danger">{errors.firstName}</span>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="lastName"
                            className="block mb-2 md:text-sm text-xs font-medium text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                            id="lastName"
                            placeholder="Enter Your Last Name"
                            name="lastName"
                            onChange={handleInput}
                        />
                        {errors.lastName && (
                            <span className="text-danger">{errors.lastName}</span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 md:text-sm text-xs font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                            id="email"
                            placeholder="Enter Your Email"
                            name="email"
                            onChange={handleInput}
                        />
                        {errors.email && (
                            <span className="text-danger">{errors.email}</span>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 md:text-sm  text-xs font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                            id="password"
                            placeholder="Enter Your Password"
                            name="password"
                            onChange={handleInput}
                        />
                        {errors.password && (
                            <span className="text-danger">{errors.password}</span>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="text-sm text-center mt-5">
                        <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Already have an account? Sign in
                        </Link>
                    </div> 
                </form>

            </div>
        </div>
    );
}

export default Register
