import React from 'react'
import Link from 'next/link'
interface AddsProps {
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  href: string;
}
const AddsCard = ({title, imageUrl, description, price, href}: AddsProps) => {
  return (
    <Link href={href} className="block">
      <div className="w-lg h-48 bg-gray-500 text-white flex items-center justify-center shadow-lg">
        {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-t-lg" />}
      </div>
    </Link>
  )
}

export default AddsCard