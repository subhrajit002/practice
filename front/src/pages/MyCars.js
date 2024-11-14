import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CarList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cars, setCars] = useState([]);
    const jwt = localStorage.getItem('token');

    const filteredCars = cars.filter(car =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.carType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.dealer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const allCars = async () => {
            try {
                const response = await axios.get('http://localhost:5070/api/usercar', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                if (response.data.cars && Array.isArray(response.data.cars)) {
                    setCars(response.data.cars);
                } else {
                    console.log("Cars array is missing or invalid:", response.data);
                    setCars([]);
                }
            } catch (error) {
                console.log("Error while fetching data:", error);
                setCars([]);
            }
        };

        if (jwt) {
            allCars();
        } else {
            console.log("No JWT found. Please login.");
            setCars([]);  // Clear cars if no JWT
        }
    }, [jwt]);

    return (
        <div className='m-8'>
            <h1 className="text-3xl font-bold mb-6">All Cars</h1>
            {jwt ? (
                <>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search cars..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCars.length > 0 ? (
                            filteredCars.map(car => (
                                <div key={car._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2">{car.title}</h2>
                                        <p className="text-gray-600 mb-2">{car.description}</p>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-semibold">Type:</span> {car.carType}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-semibold">Company:</span> {car.company}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-semibold">Dealer:</span> {car.dealer}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 px-4 pb-2 sm:px-6 flex justify-between">
                                        <Link to={`/cars/view/${car._id}`} className="text-green-600 hover:text-green-900">
                                            View
                                        </Link>
                                        <Link to={`/cars/edit/${car._id}`} className="text-indigo-600 hover:text-indigo-900">
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center col-span-full text-gray-500 text-xl ">
                                No cars available,
                                <Link  to="/addCar" className='ml-1 text-blue-400 '>
                                    Add Cars !!
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500 text-xl mt-8">
                    Login to see your cars
                </div>
            )}
        </div>
    );
};

export default CarList;
