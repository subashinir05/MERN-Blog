import React from 'react'
import CallToAction from '../components/CallToAction'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-9 p-5'>
      <h1 className='text-3xl font-medium italic'>Projects</h1>
      <p className='text-md text-gray-500'>Embark on exciting projects that make learning HTML, CSS, and JavaScript a blast! Dive into interactive activities designed to build your skills in web development. Get hands-on experience while having fun with coding! 🚀💻</p>
      <CallToAction />
    </div>
  )
}
