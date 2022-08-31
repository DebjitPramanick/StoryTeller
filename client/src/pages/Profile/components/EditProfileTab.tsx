import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../components/FormFields/Button';
import InputField from '../../../components/FormFields/InputField';
import TextAreaField from '../../../components/FormFields/TextAreaField';
import { useUser } from '../../../contexts/UserContext';
import { updateUser } from '../../../helpers/user.helper';
import FormLayout from '../../../layouts/FormLayout';
import { UserDetailsType } from '../../../utils/types';

const EditProfileTab: React.FC<any> = ({
  user
}) => {

  const {refetchUser} = useUser();

  const [data, setData] = useState<UserDetailsType>({
    name: user.name,
    bio: user.bio,
    email: user.email,
    avatar: user.avatar
  })

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await updateUser(user._id, data);
      await refetchUser();
    } catch (err: any) {
      toast.error(err.message, {
        autoClose: 3500,
        pauseOnHover: true,
      })
    }
  }

  const handleChangeData = (field: string, value: string) => {
    setData({ ...data, [field]: value })
  }

  return (
    <FormLayout>
      <h1 className='text-xl font-bold mb-6'>Update Details</h1>
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

        <TextAreaField
          value={data.bio || ""}
          setValue={(val: string) => handleChangeData('email', val)}
          label="Your Bio"
          placeholder="Enter bio"
        />

        <Button label="Updte User" type="submit" rightAligned={true} onClick={(e: any) => handleUpdate(e)} />
      </form>
    </FormLayout>
  )
}

export default EditProfileTab