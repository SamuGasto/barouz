"use client"
import React from 'react'
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '../ui/carousel'
import CuponCarrusel from '../pagina-principal/carrusel-principal/cupon-carrusel';
import { useCupones } from '@/hooks/useCupones';

function CarruselCupones() {
    const { data: cupones } = useCupones();
    return (
        <Carousel>
            <CarouselContent className="ml-1 flex w-full flex-row gap-4">
                {cupones?.map((cupon) => (
                    <CuponCarrusel key={cupon.id} cupon={cupon} />
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CarruselCupones