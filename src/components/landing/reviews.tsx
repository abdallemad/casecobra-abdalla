import React from 'react'
import MaxWidthWrapper from '../globals/max-width-wrapper'
import Image from 'next/image'
import ReviewsGrid from './reviews-grid'

function Reviews() {
  return (
    <MaxWidthWrapper className='relative max-w-5xl'>
      <Image
          src={'/assets/what-people-are-buying.png'}
          width={100}
          height={200}
          alt="what people buy"
          aria-hidden={true}
          className="absolute select-none  hidden xl:block -left-32 top-1/3"
        />
        <ReviewsGrid />
    </MaxWidthWrapper>
  )
}

export default Reviews
