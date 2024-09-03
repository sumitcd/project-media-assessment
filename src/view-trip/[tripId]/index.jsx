import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import { LuSparkles } from "react-icons/lu";
import PlaceMap from '../components/PlaceMap';


const ViewTrip = () => {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([])

    /**
     * Get the Trip Information on Landing
     */
    useEffect(() => {
        tripId && getTripData();
    }, [tripId])

    /**
     * Used to get Trip Information from Firebase
     */
    const getTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists) {
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data());

        }
        else {
            console.log("No Such Document");
            toast("No Trip Found!")
        }
    }

    return (
        <div className='flex md:flex-row flex-col-reverse'>
            <div className='p-4 w-full 2xl:w-[50%] md:max-h-[100vh] md:overflow-scroll'>
                {/* Powered By AI */}
                <div className='flex items-center gap-2 mb-6 mx-auto container w-full justify-center'>
                    <LuSparkles className='h-[26px] w-[26px] p-1 bg-purple-300 rounded-full' />
                    <p className='text-md'>Powered By AI</p>
                </div>
                {/* Information Section */}
                <InfoSection trip={trip} />
                {/* Recommended Hotels */}
                <Hotels trip={trip} />
                {/* Daily Plan */}
                <PlacesToVisit trip={trip} />
                {/* Footer */}
                <Footer />
            </div>
            <div className='bg-yellow-300 2xl:w-[50%] md:w-[40%] w-full h-[300px] md:h-auto'>
                <PlaceMap trip={trip}/>
            </div>
        </div>
    )
}

export default ViewTrip
