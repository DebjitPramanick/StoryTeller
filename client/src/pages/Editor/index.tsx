import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { popupMessage } from '../../helpers/common.helper';
import { createStory } from '../../helpers/editor.helper';
import EditorUI from './EditorUI'

export interface StoryDetailsType {
  title: string,
  content: string,
  tags: string[],
  cover: string,
}

const initialData: StoryDetailsType = {
  title: '',
  content: '',
  cover: '',
  tags: [],
}

const Editor = () => {

  const { user } = useUser();
  const navigate = useNavigate();

  const [isPublishing, setIsPublishing] = useState(false)
  const [data, setData] = useState<StoryDetailsType>(initialData);

  const handleCreateStory = async (e: any) => {
    e.preventDefault();
    setIsPublishing(true)
    try {
      const authorId = user._id;
      await createStory(data, authorId);
      popupMessage('success', "Story created successfully.");
      setIsPublishing(false)
      navigate("/profile")
    } catch (err: any) {
      popupMessage('error', err.message);
      setIsPublishing(false)
    }
  }

  const handleChangeData = (field: string, value: string) => {
    setData({ ...data, [field]: value })
  }

  return (
    <EditorUI
      handleChangeData={handleChangeData}
      handleCreateStory={handleCreateStory}
      data={data}
      isPublishing={isPublishing} />
  )
}

export default Editor