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
            <ul className="grid border-b border-b-slate-100">
                {items.map((item, index) => (
                <li key={index}
                className="list-item opacity-0">
                    <a href=""
                    className="flex flex-col justify-between border-t border-t-slate-100 py-10  text-slate-200 md:flex-row ">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">{item.data.title}</span>
                            <div className="flex gap-3 text-yellow-400">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="text-lg font-bold">{tag}</span>

                                ))}
                            </div>
                        </div>
                        <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">{viewMoreText}</span>
                    </a>
                </li>
                ))}
            </ul>
            
        </div>
    )
}
