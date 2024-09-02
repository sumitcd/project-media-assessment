import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from 'react-router-dom';
import { X } from "lucide-react"

function CreateTrip() {

  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle Form Data
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  // Handle Generate Trip Button
  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Check the data
    if (formData?.noOfDays < 1 || !formData?.location || !formData?.budget || !formData?.noOfPeople) {
      toast("Please fill all details")
      return;
    }

    setLoading(true);

    // Send formData to AI Prompt
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{noOfPeople}', formData?.noOfPeople)
      .replace('{budget}', formData?.budget)

    // Fetching data from gemini
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());

    setLoading(false);

    // Save AI result
    saveAiTrip(result?.response?.text());
  }


  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
  }

  // Save the AI Result in Firebase DB
  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId

    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'># Tell us your travel preferences 🛩️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinery based on your preferences.</p>
      
      {/* Form Data Entry Start */}
      <div className='mt-20 flex flex-col gap-10'>
        {/* Location */}
        <div>
          <h2 className='text-xl my-3 font-medium'>Where do you want to go?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (e) => { setPlace(e); handleInputChange('location', e) }
            }}
          />
        </div>

        {/* Duration */}
        <div>
          <h2 className='text-xl my-3 font-medium'>Trip Duration</h2>
          <Input placeholder="Enter Number of Days" type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
        
        {/* Budget */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${formData?.budget == item.title && 'shadow-lg border-black'}
                  `}>
                <h2 className='text-4xl mb-2'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Number of People */}
        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('noOfPeople', item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${formData?.noOfPeople == item.people && 'shadow-lg border-black'}
                `}>
                <h2 className='text-4xl mb-2'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Form Data Entry Ends */}

      {/* Generate Button */}
      <div className='my-10 flex justify-end'>
        <Button onClick={onGenerateTrip} disabled={loading}>
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"}
        </Button>
      </div>
      
      {/* Google Login Dialog Box */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className='flex items-center gap-3'>
                <img src="/logo.svg" alt="" />
                <p className='text-black font-bold text-3xl'>TravelEase</p>
              </div>
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
              <X onClick={() => setOpenDialog(false)}
                className="mt-5 absolute right-5 top-0 hover:bg-slate-200 rounded-md p-1 cursor-pointer"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      {/* Loading / Generating Dialog Box */}
      <Dialog open={loading}>
        <DialogContent className="md:h-[200px] sm:h-[150px] md:w-[600px] sm:w-[400px] bg-purple-950">
          <DialogHeader className='flex flex-col items-center justify-center gap-3 animate-pulse'>
            <DialogTitle>
              <h2 className='font-bold text-2xl text-white'>Generating recommendations</h2>
            </DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-center font-medium text-white">
              <p>That is a great choice. We're</p>
              <p>gathering food and more...</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip
