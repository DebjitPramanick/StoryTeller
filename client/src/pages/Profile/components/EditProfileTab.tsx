import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/FormFields/Button';
import DatePicker from '../../../components/FormFields/DatePicker';
import InputField from '../../../components/FormFields/InputField';
import TextAreaField from '../../../components/FormFields/TextAreaField';
import { useUser } from '../../../contexts/UserContext';
import { popupMessage } from '../../../helpers/common.helper';
import { deleteAcccount, updateUser } from '../../../helpers/user.helper';

interface EditUserDetailsType {
  name: string,
  bio: string,
  email: string,
  avatar: string,
  dob: string,
  gender: 'M' | 'F',
  location: string
}

const EditProfileTab: React.FC<any> = ({
  user,
  fetchUserStories
}) => {

  const { refetchUser } = useUser();
  const navigate = useNavigate();

  const [data, setData] = useState<EditUserDetailsType>({
    name: user.name,
    bio: user.bio,
    email: user.email,
    avatar: user.avatar,
    location: user.location,
    dob: user.dob,
    gender: user.gender
  })

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await updateUser(user._id, data);
      await refetchUser();
      await fetchUserStories()
      popupMessage("success", "Updated user successfully.")
    } catch (err: any) {
      popupMessage('error', err.message);
    }
  }

  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      await deleteAcccount(user._id);
      popupMessage("success", "Deleted user successfully.")
      navigate("/logout")
    } catch (err: any) {
      popupMessage('error', err.message);
    }
  }

  const handleChangeData = (field: string, value: string) => {
    setData({ ...data, [field]: value })
  }

  return (
    <div>
      <div className='grid w-full gap-4 grid-cols-1 md:grid-cols-2'>
        <div className='mb-6'>
          <h1 className='text-xl font-bold mb-2'>
            Edit Details
          </h1>
          <p className='text-gray-400 italic text-sm'>Update your profile details. You cannot edit username.</p>
        </div>
        <form>
          <InputField
            label='Your name'
            placeholder='Enter name'
            value={data.name}
            setValue={(val: string) => handleChangeData('name', val)}
            type='text'
            required={true}
          />

          <InputField
            label='Your email'
            placeholder='Enter email'
            value={data.email}
            setValue={(val: string) => handleChangeData('email', val)}
            type='email'
            required={true}
          />

          <DatePicker
            label="Your DOB"
            date={data.dob}
            setDate={(val: string) => handleChangeData('dob', val)} />

          <InputField
            label='Your location'
            placeholder='Enter location'
            value={data.location}
            setValue={(val: string) => handleChangeData('location', val)}
            type='text'
          />

          <TextAreaField
            value={data.bio}
            setValue={(val: string) => handleChangeData('bio', val)}
            label="Your Bio"
            placeholder="Enter bio"
          />

          <Button label="Updte User" type="submit" rightAligned={true} onClick={(e: any) => handleUpdate(e)} />
        </form>
      </div>
      <div className='border-b border-gray-200 my-4 w-full'></div>
      <div className='grid w-full gap-4 grid-cols-1 md:grid-cols-2'>
        <div className='mb-6'>
          <h1 className='text-xl font-bold mb-2'>
            Delete Account
          </h1>
          <p className='text-gray-400 italic text-sm'>Alll of your data will be deleted including stories, likes, saved items and followers.</p>
        </div>
        <div>
          <Button label="Delete Account" type="submit" rightAligned={true} onClick={(e: any) => handleDelete(e)} variant="danger" />
        </div>
      </div>
    </div>
  )
}

export default EditProfileTab