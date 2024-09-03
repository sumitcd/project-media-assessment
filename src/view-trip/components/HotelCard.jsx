import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCard = ({ hotel }) => {

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

    // Load Hotel Photos
    useEffect(()=>{
        hotel&&GetPlacePhoto();
    }, [hotel])

    return (
        <div>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer text-black h-[300px] w-[170px] rounded-xl p-2'>
                    <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="" className='rounded-xl h-[150px] w-full object-cover' />
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel.hotelName}</h2>
                        <h2 className='text-sm'>📍{hotel?.price}</h2>
                        <h2 className='text-sm'>⭐ {hotel?.rating} stars</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default HotelCard
