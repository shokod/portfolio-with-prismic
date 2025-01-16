import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    
    <div className="flex justify-center items-center p-4 sm:p-8">
    <div className="max-w-2xl w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <PrismicNextImage
        field={slice.primary.image}
        imgixParams={{ w: 600 }}
        className="w-full h-auto object-cover"
      />
    </div>
  </div>
  );
};

export default ImageBlock;
