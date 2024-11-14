import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const EditCar = () => {
    const [carData, setCarData] = useState({
        title: '',
        carType: '',
        description: '',
        company: '',
        dealer: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarData(prev => ({ ...prev, [name]: value }));
    };

    const jwt = localStorage.getItem("token");
    const { id } = useParams();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (jwt) {
            try {
                const response = await axios.put(
                    `https://intern-backend-rndw.onrender.com/api/updatecar/${id}`,
                    carData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
                if (response.status == 200) {
                    Swal.fire("Car updated successfully", "", "success");
                    navigate('/myCars');
                }
            } catch (error) {
                if (error.response) {
                    Swal.fire(
                        "Error adding destination",
                        error.response.data.message || "An error occurred",
                        "error"
                    );
                }
            }
        } else {
            Swal.fire("Need to Login", "", "error")
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (jwt) {
            try {
                const response = await axios.delete(`https://intern-backend-rndw.onrender.com/api/deletecar/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                })
                if (response.status == 200) {
                    Swal.fire("Car Deleted", "", "success");
                    navigate('/myCars');
                }
            } catch (error) {
                if (error.response) {
                    Swal.fire(
                        "Error adding destination",
                        error.response.data.message || "An error occurred",
                        "error"
                    );
                }
            }
        }
        else {
            Swal.fire("Need to Login", "", "error");
        }
    }


    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Edit Car Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Enter the details for the car
                </p>
            </div>
            <div className="border-t border-gray-200">
                <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={carData.title}
                                onChange={handleInputChange}
                                className="px-2 py-1 mt-1 focus:ring-[#DF6951] focus:border-gray-300 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border"
                                 
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Car Type
                            </label>
                            <input
                                type="text"
                                name="carType"
                                id="carType"
                                value={carData.carType}
                                onChange={handleInputChange}
                                className="px-2 py-1 mt-1 focus:ring-[#DF6951] focus:border-gray-300 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border"
                                 
                            />
                        </div>

                        <div className="col-span-6">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows={3}
                                value={carData.description}
                                onChange={handleInputChange}
                                className="px-2 py-1 mt-1 focus:ring-[#DF6951] focus:border-gray-300 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border"
                                 
                            ></textarea>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Company
                            </label>
                            <input
                                type="text"
                                name="company"
                                id="company"
                                value={carData.company}
                                onChange={handleInputChange}
                                className="px-2 py-1 mt-1 focus:ring-[#DF6951] focus:border-gray-300 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border"
                                 
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Dealer
                            </label>
                            <input
                                type="text"
                                name="dealer"
                                id="dealer"
                                value={carData.dealer}
                                onChange={handleInputChange}
                                className="px-2 py-1 mt-1 focus:ring-[#DF6951] focus:border-gray-300 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border"
                                 
                            />
                        </div>


                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Edit Car
                        </button>
                        <button
                            onClick={handleDelete}
                            className="inline-flex ml-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete Car
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditCar;
