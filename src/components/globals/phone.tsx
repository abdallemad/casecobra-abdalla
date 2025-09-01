import { cn } from '@/lib/utils'
import Image from 'next/image';
import React, { HTMLAttributes } from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}
function Phone({ imgSrc, dark= false, className, ...props }: PhoneProps) {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        src={
          dark ?
            "/assets/phone-template-dark-edges.png" :
            "/assets/phone-template-white-edges.png"
        }
        alt="hero image"
        width={200}
        height={600}
        className="pointer-events-none select-none z-50 w-full"
      />
      <div className="absolute -z-10 inset-0 ">
        <Image
          src={imgSrc}
          alt="overlaying phone image"
          width={400}
          height={400}
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  )
}

export default Phone
