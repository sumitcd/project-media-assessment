import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({ trip }) => {
    return (
        <div>
            <h2 className='font-bold text-2xl mt-4'>Places to Visit</h2>
            <div>
                {trip.tripData?.itinerary.map((item, index) => (
                    <div className='mt-5'>
                        <h2 className='font-medium text-xl'>Day {item.day}</h2>
                        <div className='lg:grid lg:grid-cols-2 flex flex-col gap-5'>
                            {item.dayPlan.map((place, index) => (
                                <div>
                                    <h2 className='font-medium text-md text-green-700'>{place.time}</h2>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit
