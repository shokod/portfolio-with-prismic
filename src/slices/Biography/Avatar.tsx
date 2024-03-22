"use client"
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import usePrefersReducedMotion from "@/hooks/motion";

type AvatarProps = {
    image: ImageField;
    className?: string;
    alt: string;

}

export default function Avatar({
    image,
    className, alt
}: AvatarProps) {

    const component = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

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
            );

            window.onmousemove = (e) => {
                if (!component.current) return; // no component, no animation!
                const componentRect = (
                  component.current as HTMLElement
                ).getBoundingClientRect();
                const componentCenterX = componentRect.left + componentRect.width / 2;
        
                let componentPercent = {
                  x: (e.clientX - componentCenterX) / componentRect.width / 2,
                };
        
                let distFromCenterX = 1 - Math.abs(componentPercent.x);
        
                gsap
                  .timeline({
                    defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
                  })
                  .to(
                    ".avatar",
                    {
                      rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
                      duration: 0.5,
                    },
                    0,
                  )
                  .to(
                    ".highlight",
                    {
                      opacity: distFromCenterX - 0.7,
                      x: -10 + 20 * componentPercent.x,
                      duration: 0.5,
                    },
                    0,
                  );
              };
            }, component);
            return () => ctx.revert(); // cleanup!
          }, [prefersReducedMotion]);

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