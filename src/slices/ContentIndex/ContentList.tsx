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
            <ul>
                {items.map((item, index) => (
                <li key={index}>
                    <a href="">
                        <div>
                            <span>{item.data.title}</span>
                            <div>
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
