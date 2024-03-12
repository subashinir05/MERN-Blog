import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6'> 
        {/* /left */}
        <div className='flex-1'>
        <Link to="/" className=' font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-100 to-teal-300 rounded-xl'>Suba's</span>
            Blog
        </Link>
        <p className='text-sm mt-5'>
          The currency of blogging is authenticity and trust. You can sign up with Email or with Google.
        </p>
        </div>
        {/* /right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
                <Label value='Username'/>
                <TextInput
                  type='text'
                  placeholder='Username'
                  id='username' />
            </div>
            <div>
                <Label value='Email'/>
                <TextInput
                  type='text'
                  placeholder='name@gmail.com'
                  id='email' />
            </div>
            <div>
                <Label value='Password'/>
                <TextInput
                  type='text'
                  placeholder='Password'
                  id='password' />
            </div>
            <Button className='bg-gradient-to-r from-blue-300 to-teal-300' type='submit' outline>
              Sign Up
              </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
              <span>Already have an account?</span>
              <Link to='/sign-in' className='text-blue-400'>
                Sign In
              </Link>
          </div>
        </div>
    </div>
    </div>
  )
}
