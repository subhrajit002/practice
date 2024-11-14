import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';

const CarView = () => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`https://practice-back-hzbp.onrender.com/api/getCar/${id}`);
                setCar(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    }

    if (!car) {
        return <div className="text-center mt-8">No car found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{car.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Carousel showThumbs={false} showStatus={false}>
                        {car.images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`${car.title} - Image ${index + 1}`} className="w-full h-96 object-cover rounded-lg" />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div>
                    <p className="text-xl mb-4">{car.description}</p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Details</h2>
                        <ul className="space-y-2">
                            <li><span className="font-medium">Type:</span> {car.carType}</li>
                            <li><span className="font-medium">Company:</span> {car.company}</li>
                            <li><span className="font-medium">Dealer:</span> {car.dealer}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarView;
