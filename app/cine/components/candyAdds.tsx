import React from "react";
import Link from "next/link";
interface CandyCardsProps {
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  href: string;
}
const CandyCard = ({ title, description, imageUrl, price, href }: CandyCardsProps) => {
  return (
    <Link href={href} className="block">
      <div className="w-48 h-74 bg-gray-500 text-white flex items-center justify-center rounded-lg shadow-lg">
        {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-t-lg" />}
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        {description && <p className="text-sm text-gray-300">{description}</p>}
        {price && <p className="text-sm text-yellow-400 mt-2">Price: ${price.toFixed(2)}</p>}
      </div>
    </Link>
  );
};

export default CandyCard;