import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import UserTripCardItem from './UserTripCardItem';
import { IoAddCircleOutline } from "react-icons/io5";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  /**
   * Used to Get All User Trips
   * @returns
   */
  useEffect(() => {
    GetUserTrips();
  }, [])

  // Get User Trips
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }
    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setUserTrips(prevVal => [...prevVal, doc.data()]);
    });
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>

        {/* User's Trips */}
        {userTrips.map((trip, index) => (
          <UserTripCardItem trip={trip} />
        ))
        }

        {/* Add New Trip Box */}
        <div 
          onClick={()=>navigate('/create-trip')}
          className='text-gray-400 h-[260px] w-full bg-slate-200 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all'>
              <IoAddCircleOutline className='h-[100px] w-full' />
              <h2 className='font-medium text-lg'>Add New</h2>
            </div>
      </div>
    </div>
  )
}

export default MyTrips
