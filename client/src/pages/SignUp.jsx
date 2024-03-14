import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  // signup loading(progess)
  const [errorMessage, setErrorMessage]=useState(null);
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };
  // to avoid page reloading while form submit 
  const handleSubmit = async (e) => {
      e.preventDefault(); 
      if(!formData.username || !formData.email || !formData.password){
        return setErrorMessage('Please fill all the fields');
      }
      try{
        setLoading(true);
        setErrorMessage(null);
        const res = await fetch('/api/auth/signup',{
          method: 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data=await res.json();
        if(data.success === false){
          return setErrorMessage(data.message);
        }
        setLoading(false);
        // navigate to signin page
        if(res.ok){
          navigate('/sign-in');
        }
      }catch (error){
        setErrorMessage(error.message);
        setLoading(false);
      }
  };
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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
                <Label value='Username'/>
                <TextInput
                  type='text'
                  placeholder='Username'
                  id='username' onChange={handleChange} />
            </div>
            <div>
                <Label value='Email'/>
                <TextInput
                  type='email'
                  placeholder='name@gmail.com'
                  id='email' onChange={handleChange} />
            </div>
            <div>
                <Label value='Password'/>
                <TextInput
                  type='password'
                  placeholder='Password'
                  id='password' onChange={handleChange}/>
            </div>
            <Button className='bg-gradient-to-r from-blue-300 to-teal-300' type='submit' outline disabled={loading}>
              {loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : ('Sign Up'
              )}
              </Button>
              <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
              <span>Already have an account?</span>
              <Link to='/sign-in' className='text-blue-400'>
                Sign In
              </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                  {errorMessage}
              </Alert>
            )
          }
        </div>
    </div>
    </div>
  )
}
