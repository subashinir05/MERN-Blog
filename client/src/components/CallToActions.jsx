import { Button} from 'flowbite-react'
import React from 'react'

export default function  () {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-300
    justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'> 
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>Food Blogging</h2>
            <p className='text-gray-500 dark:text-gray-400 my-2'>
            Individuals can express their passion for food, connect with like-minded enthusiasts, and inspire others to explore new flavors and cuisines.
            A creative outlet for writers, photographers, chefs, and home cooks to share their expertise and build a community around their shared interests.
            </p>
            <Button className='bg-gradient-to-r from-purple-300 to-teal-200 text-gray-700 rounded-tl-xl rounded-bl-none '>
                <a href='https://www.forbes.com/advisor/in/business/software/how-start-food-blog/' target='_blank' rel='noopener noreferrer'>Learn More</a>
                </Button>
        </div>
        <div className='p-7  flex-1'>
            <img src='https://img.freepik.com/free-photo/hands-taking-food-photos-top-view_23-2149333805.jpg?w=1480&t=st=1711173332~exp=1711173932~hmac=9da4c438a0d82d03600cd51f8d8d4eb0f60a382115ac6f9c62beb421e9efdc49'></img>
        </div>
    </div>
  )
}
