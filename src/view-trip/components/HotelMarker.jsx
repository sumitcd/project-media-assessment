import React, { useEffect, useState } from 'react'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';

const HotelMarker = ({ hotel }) => {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [open, setOpen] = useState(false);
    const extractCoordinates = (coordinates) => {
        // Split the string into latitude and longitude parts
        const [latStr, lonStr] = coordinates.split(',');

        // Extract the numeric values
        setLatitude(parseFloat(latStr) * (latStr.includes('S') ? -1 : 1));
        setLongitude(parseFloat(lonStr) * (lonStr.includes('W') ? -1 : 1));
    };

    useEffect(() => {
        hotel && extractCoordinates(hotel?.geoCoordinates);
    }, [hotel])


    return (
        <div>
            <AdvancedMarker position={{ lat: latitude, lng: longitude }}>
                <Pin />
            </AdvancedMarker>
            {open&& <InfoWindow onCloseClick={()=>{setOpen(false)}} position={{ lat: latitude, lng: longitude }}>{hotel?.hotelName}</InfoWindow>}
        </div>
    )
}

export default HotelMarker
