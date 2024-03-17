import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen '>
        <h1 className='text-center text-2xl my-7 font-semibold'>New Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title'
                className='flex-1'/>
                <Select>
                    <option value="Uncategorized">Select Category</option>
                    <option value="it">IT</option>
                    <option value="education">Education</option>
                    <option value="sports">Sports</option>
                    <option value="politics">Politics</option>
                    <option value="others">Others</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-2 border-blue-300 border-double p-3 '>
                <FileInput type='file' accept='image/*'/>
                <Button type='button'className='bg-gradient-to-r from-blue-400 to-teal-300' size='sm' outline >
                    Upload Image
                </Button>
            </div>
            <ReactQuill theme='snow' placeholder='Add description' className='h-72 mb-12'
            required />
            <Button type='submit'className='bg-gradient-to-r from-teal-300 to-orange-200 text-gray-700' outline>Add Post</Button>
        </form>

    </div>
  )
}
