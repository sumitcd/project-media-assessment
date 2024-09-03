import React, { useEffect, useState } from 'react'
import { BsShareFill } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { toast } from 'sonner';
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';

const InfoSection = ({ trip }) => {
    const [photoUrl, setPhotoUrl] = useState();

    const [copied, setCopied] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate();

    const handleShare = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(
            () => {
                setCopied(true);
                setTimeout(() => setCopied(false, 2000));
            },
            (err) => {
                console.error("Failed to copy", err);
            }
        )
    }

    const handleDelete = async () => {
        await deleteDoc(doc(db, "AITrips", trip?.id));
        navigate('/my-trips')

    }

    // Load Cover Pic
    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    // Get the cover pic using place api
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <div>
            <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="" className='h-[300px] w-full object-cover rounded-xl' />

            {/* Place Information */}
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-4xl mb-2'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-1'>
                        <h2 className='rounded-full text-gray-500 text-xs md:text-lg'>{trip?.userSelection?.noOfDays} Day -</h2>
                        <h2 className='rounded-full text-gray-500 text-xs md:text-lg'>{trip?.userSelection?.budget} Budget -</h2>
                        <h2 className='rounded-full text-gray-500 text-xs md:text-lg'>{trip?.userSelection?.noOfPeople} Traveller</h2>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <Button onClick={() => setOpenDialog(true)} className="hover:bg-red-600">
                        <RiDeleteBin6Line className='w-5 h-5' />
                    </Button>
                    <Button onClick={handleShare}>
                        <BsShareFill />
                    </Button>
                </div>
            </div>

            {/* Toast to indicate share link/ copy link*/}
            {copied && toast('Link Copied')}

            {/* Delete confirmation dialog box */}
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription >
                            <div className='flex items-center gap-3'>
                                <p className='text-black font-bold text-2xl'>Delete Trip</p>
                            </div>
                            <h2 className='font-bold text-lg mt-4 mb-2'>Are you sure you want to delete this trip?</h2>
                            <div className='flex gap-2 justify-end'>
                                <Button
                                    onClick={()=>{setOpenDialog(false)}}
                                    className="mt-5 flex gap-4 items-center bg-white text-slate-700 hover:bg-slate-200">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    className="mt-5 flex gap-4 items-center bg-red-600">
                                    Delete
                                </Button>
                            </div>
                            <X onClick={() => setOpenDialog(false)}
                                className="mt-5 absolute right-5 top-0 hover:bg-slate-200 rounded-md p-1 cursor-pointer"
                            />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default InfoSection
