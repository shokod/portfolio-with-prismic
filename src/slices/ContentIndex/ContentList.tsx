import { Content } from '@prismicio/client';
import React from 'react'

type ContentListProps = {
    items: Content.BlogPostDocument[] | Content.ProjectDocument[];
    contentType: Content.ContentIndexSlice['primary']['content_type'];
    fallbackItemImage: Content.ContentIndexSlice['primary']['fallback_item_image'];
    viewMoreText: Content.ContentIndexSlice['primary']['view_more_text'];
}

export default function ContentList({ items, contentType, fallbackItemImage, viewMoreText = "View More" }: ContentListProps) {
    return (
        <div>
            <ul >
                {items.map((item, index) => (
                    <li key={index}
                    className=''
                       >
                        <a href=""
                        className='flex gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-600 transition-colors duration-200 ease-in-out'
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
                            <span>{viewMoreText}</span>
                        </a>
                    </li>
                ))}
            </ul>

        </div>
    )
}
