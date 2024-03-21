import { Button} from 'flowbite-react'
import React from 'react'

export default function  () {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-400
    justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'> 
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>ReactJS(JavaScriptLibrary)</h2>
            <p className='text-gray-500 my-2'>
            React.js is often used to create front-end projects that are interactive for end users. It creates a new technique of rendering websites, advancing the responsiveness of web pages.
            </p>
            <Button className='bg-gradient-to-r from-purple-300 to-teal-200 text-gray-700 rounded-tl-xl rounded-bl-none '>
                <a href='https://legacy.reactjs.org/tutorial/tutorial.html' target='_blank' rel='noopener noreferrer'>Learn More</a>
                </Button>
        </div>
        <div className='p-7  flex-1'>
            <img src='https://w0.peakpx.com/wallpaper/564/515/HD-wallpaper-business-plan-ultra-computers-others-internet-business-laptop-desk-table-coffee-hands-work-project-plan-office-macbook-planning-information-topview-workplace-analysis-startup-woodentable.jpg'></img>
        </div>
    </div>
  )
}
