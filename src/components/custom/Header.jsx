import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate, useNavigation } from 'react-router-dom'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'


const Header = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

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
      window.location.reload();
    })
  }

  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    console.log(user);
  }, [])

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href='/' className='flex items-center md:gap-2 gap-1'>
        <img src="/logo.svg" alt="" className='md:h-10 md:w-10 h-5 w-5' />
        <p className='text-black font-bold md:text-2xl text-md'>TravelEase</p>
      </a>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
              <Button variant="outline" className="rounded-full text-black md:text-md md:h-10 md:w-22 text-sm">+ Add</Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full text-black md:text-md md:h-10 md:w-22 text-sm">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger className='rounded-full p-0'>
                <img src={user?.picture} alt="" className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>

          </div> :
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        }
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription >
              <div className='flex items-center gap-3'>
                <img src="/logo.svg" alt="" />
                <p className='text-black font-bold text-2xl'>TravelEase</p>
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
    </div>
  )
}

export default Header
