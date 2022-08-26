import React, { useState } from 'react'
import { useUser } from '../../contexts/UserContext';
import { StoryDetailsType } from '../../utils/types';
import EditorUI from './EditorUI'

const initialData: StoryDetailsType = {
  title: '',
  content: '',
  cover: '',
  tags: [],
}

const Editor = () => {

  const {user} = useUser();

  const [data, setData] = useState<StoryDetailsType>(initialData);

  const handleCreateStory = async (e: any) => {
    e.preventDefault();
    try {
      //   await registerUser(data);
      window.location.href = "/"
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleChangeData = (field: string, value: string) => {
    if (field === 'tags') {

    }
    setData({ ...data, [field]: value })
  }

  return (
    <EditorUI
      handleChangeData={handleChangeData}
      handleCreateStory={handleCreateStory} />
  )
}

export default Editor