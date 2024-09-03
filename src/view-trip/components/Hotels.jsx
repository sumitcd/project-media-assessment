import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HotelCard from './HotelCard';


const Hotels = ({trip}) => {
  return (
    <div> 
        <h2 className='font-bold text-2xl mt-5 mb-4'>Hotel Recommendations</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5'>
            {trip?.tripData?.hotelOptions?.map((hotel, index)=>(
                <HotelCard hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels
