import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const Hero = () => {
    return (
        <div>
            <div className='flex flex-col items-center mx-56 gap-9'>
                <h1 className='font-extrabold text-[50px] text-center mt-16'>
                    <span style={{color:'hsl(161.74deg 80% 45.1%)'}}>Effortlessly Plan Your Adventure with our AI generator:</span> Discover the world without the Hassle!
                </h1>

                <p className='text-xl text-gray-500 text-center'>
                    Plan your perfect trip in seconds with our AI-powered generator. Get personalized itineraries instantly, tailored just for you.
                </p>

                <Link to={'/create-trip'}>
                    <Button>Get Started, It's Free</Button>
                </Link>
                <Carousel className="mt-10 rounded-xl">
                    <CarouselContent>
                        <CarouselItem className="flex items-center justify-center"><img src="/landing.png" alt="" className='w-[60%]'/></CarouselItem>
                        <CarouselItem><img src="/cover.png" alt=""/></CarouselItem>
                        <CarouselItem><img src="/mytrip.png" alt=""/></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="" />
                    <CarouselNext className=""/>
                </Carousel>


            </div>
        </div>

    )
}

export default Hero
