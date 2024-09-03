import React, { useEffect, useState } from 'react'

import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';
import HotelMarker from './HotelMarker';
import PlaceMarker from './PlaceMarker';
import axios from 'axios';


const PlaceMap = ({ trip }) => {
    const [error, setError] = useState('');
    const [position, setPosition] = useState({lat:0, lng:0});

    const getGeolocation = async (trip) => {
        try {
            const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        address: trip?.userSelection?.location?.label,
                        key: apiKey,
                    },
                }
            );
            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;
                setPosition({lat:location.lat, lng:location.lng});
                console.log(position);
                setError('');
            } else {
                setError('Location not found. Please try another place name.');
            }
        } catch (error) {
            console.error('Error fetching geolocation:', error);
            setError('Failed to fetch geolocation. Please try again later.');
        }
    };

    useEffect(() => {
        trip&&getGeolocation(trip);
    }, [trip])
    

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}>
            <div className='bg-yellow-200 w-full h-full'>
                <Map defaultZoom={9} center={position} mapId={import.meta.env.VITE_GOOGLE_MAP_ID}>
                    {trip?.tripData?.hotelOptions.map((item, index) => (
                        <HotelMarker hotel={item} />
                    ))}
                    {trip?.tripData?.itinerary.map((item, index) => (
                        <div>
                            {item.dayPlan.map((place, index) => (
                                <PlaceMarker place={place} />
                            ))}
                        </div>
                    ))}
                </Map>
            </div>
        </APIProvider>
    )
}

export default PlaceMap
