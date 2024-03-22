"use client"
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type AvatarProps = {
    image: ImageField;
    className?: string;
    alt: string;

}

export default function Avatar({
    image,
    className, alt
}: AvatarProps) {

    const component = useRef(null)

    useEffect(()=> {
        let ctx = gsap.context(() => {
            gsap.timeline()
            .fromTo(
                ".avatar-image",
                {
                    scale: 1.1,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)",
                }
            )
            
        })
    
    })

    return (
        <div ref={component} className={clsx("relative h-full w-full", className, alt)}>
            <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0f shadow-xl">
                <PrismicNextImage
                    field={image}
                    className="avatar-image h-full w-full object-fill"
                    alt=""
                    imgixParams={{ q: 90 }}
                />
                <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
            </div>
        </div>

    )
}