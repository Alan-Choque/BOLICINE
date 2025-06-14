import Link from "next/link";
import Image from "next/image";
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
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
    </Link>
  );
};

export default MovieCard;
