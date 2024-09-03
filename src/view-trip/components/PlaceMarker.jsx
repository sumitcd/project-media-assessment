import React, { useEffect, useState } from 'react'
import PlaceMarkerPin from './PlaceMarker';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
const PlaceMarker = ({ place }) => {

    // Define Latitude and Longitude
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    // Open Marker 
    const [open, setOpen] = useState(false)

    const [photoUrl, setPhotoUrl] = useState();
   
    // Get Place Photos
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place?.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    // Extract Coordinates
    const extractCoordinates = (coordinates) => {
        // Split the string into latitude and longitude parts
        const [latStr, lonStr] = coordinates.split(',');
        if (!latStr || !lonStr) {
            console.error('Invalid coordinate parts:', latStr, lonStr);
            return;
        }
        // Extract the numeric values
        setLatitude(parseFloat(latStr) * (latStr.includes('S') ? -1 : 1));
        setLongitude(parseFloat(lonStr) * (lonStr.includes('W') ? -1 : 1));
    };

    // Get Geocordinates on Load
    useEffect(() => {
        place?.geoCoordinates && extractCoordinates(place?.geoCoordinates);
    }, [place])

    // Get Place Photo on Load
    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])
    
    return (
        <div>
            <AdvancedMarker position={{ lat: latitude, lng: longitude }} onClick={() => setOpen(true)}></AdvancedMarker>
            {open && <InfoWindow onCloseClick={() => {setOpen(false)}} position={{ lat: latitude, lng: longitude}}>
                <div className='flex flex-col gap-2 h-[100x] w-[220px] text-black'>
                    <div>
                        <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="" className='w-full h-[100px] rounded-xl object-cover xl:block hidden'/>
                    </div>
                    <div >
                        <h2 className='font-medium text-sm'>{place.placeName}</h2>
                        <p className='mt-1'>🕙 {place.timeToTravel}</p>
                    </div>
                </div>
            </InfoWindow>}
        </div>
    )
}

export default PlaceMarker
