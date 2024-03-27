"use client"
import { Content, asImageSrc, isFilled } from '@prismicio/client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { MdArrowOutward } from 'react-icons/md';
import { gsap } from 'gsap'

type ContentListProps = {
    items: Content.BlogPostDocument[] | Content.ProjectDocument[];
    contentType: Content.ContentIndexSlice['primary']['content_type'];
    fallbackItemImage: Content.ContentIndexSlice['primary']['fallback_item_image'];
    viewMoreText: Content.ContentIndexSlice['primary']['view_more_text'];
}

export default function ContentList({
    items,
    contentType,
    fallbackItemImage,
    viewMoreText = "View More" }: ContentListProps) {

    

    const component = useRef(null)
    const revealRef = useRef(null)
    const [currentItem, setCurrentItem] = useState<null | number>(null)

    const urlprefix = contentType === "Blog" ? "/blog" : "/projects"

    const lastMousePosition = useRef({ x: 0, y: 0 })
    const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            itemsRef.current.forEach((item) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, y:20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.3,
                        ease: "elastic.out(1,0,3)",
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom-=100px",
                            end: "bottom center",
                            toggleActions: "play none none none"
                        },
                    }
                );
            });
            return() => ctx.revert();
        }, component)
    }, []);

    useEffect(() => {
        const handleMouseMovement = (e: MouseEvent) => {
            const mousePosition = { x: e.clientX, y: e.clientY + window.scrollY }

            // speed n direction
            const speed = Math.sqrt(Math.pow(mousePosition.x - lastMousePosition.current.x, 2))

            let ctx = gsap.context(() => {
                if (currentItem !== null) {
                    const maxY = window.scrollY + window.innerHeight - 350;
                    const maxX = window.innerWidth - 250;

                    gsap.to(revealRef.current, {
                        x: gsap.utils.clamp(0, maxX, mousePosition.x - 110),
                        y: gsap.utils.clamp(0, maxY, mousePosition.y - 160),
                        rotation: speed * (mousePosition.x > lastMousePosition.current.x ? 1 : -1),
                        ease: 'back.out(2)',
                        duration: 1.3,
                    })


                }
                lastMousePosition.current = mousePosition;
                return () => ctx.revert();
            }, component)
        }

        window.addEventListener('mousemove', handleMouseMovement)

        return () => {
            window.removeEventListener('mousemove', handleMouseMovement)
        }
    }
        , [currentItem])



    const contentImages = items.map((item) => {
        const image = isFilled.image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage;

        return asImageSrc(image, {
            width: 220,
            height: 320,
            fit: 'crop',
            exp: -10,
        });
    });

    useEffect(()=> {
        contentImages.forEach((url)=>{
            if (!url) return;
            const img = new Image();
            img.src = url;
        })
    }, [contentImages])

    const onMouseEnter = (index: number) => {
        setCurrentItem(index);
    }

    const onMouseLeave = () => {
        setCurrentItem(null);
    }

    return (
        <div ref={component}>
            <ul className='grid border-b border-b-slate-100'
                onMouseLeave={onMouseLeave} >
                {items.map((item, index) => (
                    <>
                        {isFilled.keyText(item.data.title) && (
                            <li key={index}
                                className='list-item opacity-0f'
                                onMouseEnter={() => onMouseEnter(index)}
                            >
                                <Link href={urlprefix + '/' + item.uid}
                                    className='flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row'
                                    aria-label={item.data.title}
                                >
                                    <div className='flex flex-col' >
                                        <span className='text-2xl font-bold'>{item.data.title}
                                        </span>
                                        <div className='flex gap-3 text-green-400 text-lg font-mono'>
                                            {item.tags.map((tag, index) => (
                                                <span key={index}>{tag}</span>

                                            ))}
                                        </div>
                                    </div>
                                    <span className='ml-auto flex items-center gap-2 text-lg font-medium md:ml-0'>{viewMoreText}<MdArrowOutward /></span>
                                </Link>
                            </li>
                        )}
                    </>
                ))}
            </ul>
            {/* hover element */}
            <div
                
                className=" hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0f transition-{background] duration-300"
                style={{
                    backgroundImage: currentItem !== null ? `url(${contentImages[currentItem]})` : '',
                }}
                ref={revealRef}
            >

            </div>

        </div >
    )
}
