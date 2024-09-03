import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PlaceCardItem = ({ place }) => {
    const [photoUrl, setPhotoUrl] = useState();

    // Load Place Photos
    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])

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
    
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName + "," + place?.placeAddress} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md h-[150x] text-black'>
                <div className='w-[200px]'>
                    <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="" className='w-full h-[140px] rounded-xl object-cover' />
                </div>
                <div>
                    <h2 className='font-bold text-lg'>{place.placeName}</h2>
                    <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                    <p className='font-medium mt-2'>🕙 Duration: {place.timeToTravel}</p>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem
