import React from 'react'
import {Link} from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
      const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, [])
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>
              Welcome to my Blog <span className='text-blue-400 italic'>"The Tasty Tales!!" </span></h1>
          <p className='text-gray-500 text-xs sm:text-sm'>
            Feasting my way through life, one bite at a time.
          </p>
          <Link to='/search' className='text-xs sm:text-sm text-gray-400 font-semibold hover:underline hover:text-teal-300'>
            Browse every post
        </Link>
        </div >   
        <div className='p-3 bg-teal-50 dark:bg-slate-700' >
         <CallToAction /> 
        </div>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to='/search' className='text-xs sm:text-sm text-gray-400 font-semibold hover:underline hover:text-teal-300 text-center'>
            Browse every post
        </Link>
            </div>
        )}
        </div>
    </div>
  )
}
