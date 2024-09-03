import React, { useEffect, useState } from 'react'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const HotelMarker = ({ hotel }) => {

    // Define Latitude and Longitude
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    // Open Marker
    const [open, setOpen] = useState(false);

    const [photoUrl, setPhotoUrl] = useState();

    const GetPlacePhoto= async()=>{
        const data={
            textQuery:hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp=>{
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

    // Get Geocoordinates on Load
    useEffect(() => {
        hotel?.geoCoordinates && extractCoordinates(hotel?.geoCoordinates);
    }, [hotel])

    // Get Hotel Photo
    useEffect(() => {
        hotel&&GetPlacePhoto();
    }, [hotel])

    return (
        <div>
            <AdvancedMarker position={{ lat: latitude, lng: longitude }} onClick={() => setOpen(true)}></AdvancedMarker>
            {open && <InfoWindow onCloseClick={() => { setOpen(false) }} position={{ lat: latitude, lng: longitude }}>
                <div className='flex flex-col gap-5 h-[100x] w-[220px] text-black'>
                    <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="" className='rounded-xl h-[100px] w-full object-cover xl:block hidden' />
                    <div className='flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel.hotelName}</h2>
                        <h2 className='text-xs text-gray-500 flex gap-1'>{hotel?.hotelAddress}</h2>
                    </div>
                </div>
            </InfoWindow>}
        </div>
    )
}

export default HotelMarker
