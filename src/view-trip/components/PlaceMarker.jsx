import React, { useEffect, useState } from 'react'
import PlaceMarkerPin from './PlaceMarker';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';
const PlaceMarker = ({ place }) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [open, setOpen] = useState(false)
    const extractCoordinates = (coordinates) => {
        // Split the string into latitude and longitude parts
        const [latStr, lonStr] = coordinates.split(',');

        // Extract the numeric values
        setLatitude(parseFloat(latStr) * (latStr.includes('S') ? -1 : 1));
        setLongitude(parseFloat(lonStr) * (lonStr.includes('W') ? -1 : 1));
    };
    useEffect(() => {
        place && extractCoordinates(place?.geoCoordinates);
    }, [place])
    return (
        <div>
            <AdvancedMarker position={{ lat: latitude, lng: longitude }} onClick={()=>setOpen(true)}>
                <Pin />
            </AdvancedMarker>
            {open&& <InfoWindow onCloseClick={()=>{setOpen(false)}} position={{ lat: latitude, lng: longitude }}>{place?.placeName}</InfoWindow>}
        </div>

    )
}

export default PlaceMarker
