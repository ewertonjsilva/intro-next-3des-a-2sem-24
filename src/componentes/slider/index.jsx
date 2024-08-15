'use client'

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import promo1 from '../../../public/home/promo1.png';
import promo2 from '../../../public/home/promo2.png';
import promo3 from '../../../public/home/promo3.png';
import promo4 from '../../../public/home/promo4.png';

export default function Slider() {
    return (
        <Carousel
            className="slider"
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
        >
            <div>
                <Image src={promo1} alt="promoção 1" />
            </div>
            <div>
                <Image src={promo2} alt="promoção 2" />
            </div>
            <div>
                <Image src={promo3} alt="promoção 3" />
            </div>
            <div>
                <Image src={promo4} alt="promoção 4" />
            </div>
        </Carousel>
    );
}
