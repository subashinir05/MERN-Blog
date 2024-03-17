import { Button, FileInput, Select, TextInput, Alert } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getStorage, uploadBytesResumable, getDownloadURL, ref} from 'firebase/storage';
import {app} from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
    const [file, setFiles] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({});
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
    }
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
            { imageUploadError && <Alert color='failure'>{imageUploadError}
            </Alert>}
            { formData.image && (
            <img src={formData.image} alt='upload'className='w-full h-72 object-cover'/>
            )
            }
            <ReactQuill theme='snow' placeholder='Add description' className='h-72 mb-12'
            required />
            <Button type='submit'className='bg-gradient-to-r from-teal-300 to-orange-200 text-gray-700'>Add Post</Button>
        </form>

    </div>
  )
}
