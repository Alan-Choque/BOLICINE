import Link from "next/link";
import React from "react";

interface MovieCardsProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}
const MovieCard = ({ title, description, imageUrl, href }: MovieCardsProps) => {
  return (
    <Link href={href} className="">
      <div className="w-48 h-74 bg-gray-500 text-white flex items-center justify-center shadow-lg">
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
      </div>
    </Link>
  );
};

export default MovieCard;
