import { Button, FileInput, Select, TextInput, Alert } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getStorage, uploadBytesResumable, getDownloadURL, ref} from 'firebase/storage';
import {app} from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
    const [file, setFiles] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const {postId} = useParams()
    const {currentUser} = useSelector((state) => state.user)
    const navigate = useNavigate();

    useEffect (() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json()
                if (!res.ok) {
                  console.log(data.message);
                  setPublishError(data.message)
                  return;
                }
                if (res.ok) {
                  setPublishError(null);
                  setFormData(data.posts[0]);
                }
              };
            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    }, [postId])

    const handleUploadImage = async () => {
        try {
            if(!file){
                setImageUploadError('Select an image');
                return;
            }
            setImageUploadError(null)
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                  },
                  () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      setImageUploadProgress(null);
                      setImageUploadError(null);
                      setFormData({ ...formData, image: downloadURL });
                    });
                  }
                );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error); 
        }
    };
    const handleSubmit = async (e) => {
    e.preventDefault();
        try {
          const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
            const data = await res.json();
            if (!res.ok) {
            setPublishError(data.message);
            return;
          }
            if (res.ok) {
            setPublishError(null);
            navigate(`/post/${data.slug}`);
          }
        } catch (error) {
            setPublishError('Something went wrong');
            }
     };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen '>
        <h1 className='text-center text-2xl my-7 font-semibold'>Update Post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title'
                className='flex-1' onChange={(e) => 
                setFormData({...formData, title: e.target.value})
                }
                value={formData.title}
                />
                <Select onChange={(e) =>
                    setFormData({...formData, category: e.target.value})
                    }
                    value={formData.category}>
                    <option value="Uncategorized">Select Category</option>
                    <option value="it">IT</option>
                    <option value="education">Education</option>
                    <option value="sports">Sports</option>
                    <option value="politics">Politics</option>
                    <option value="others">Others</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-2 border-blue-300 border-double p-3 '>
                <FileInput type='file' accept='image/*' onChange={(e) => setFiles(e.target.files[0])}/>
                <Button type='button'className='bg-gradient-to-r from-blue-400 to-teal-300' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                {
                imageUploadProgress ? (
                <div className='w-16 h-16'>
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}
                />
              </div>
                ) : (
              'Upload Image'
                )}
                </Button>
            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}
            </Alert>}
            {formData.image && (
            <img src={formData.image} alt='upload'className='w-full h-72 object-cover'/>
            )
            }
            <ReactQuill theme='snow' value={formData.content} placeholder='Add description...' className='h-72 mb-12'
            required
            onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
            />
            <Button type='submit'className='bg-gradient-to-r from-teal-300 to-orange-200 text-gray-700'>
                Edit
            </Button>
            {
            publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
        }
        </form> 
    </div>
  )
}
