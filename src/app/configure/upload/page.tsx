import React from 'react'
import UploadPageContent from './upload-page-content'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'Upload Your Image',
  description: 'Upload your images here',
}

function page() {
  return (
    <>
      <UploadPageContent />
    </>
  )
}

export default page
