import { useState } from 'react'
import { useUser } from '../../contexts/UserContext';
import { createStory } from '../../helpers/editor.helper';
import { StoryDetailsType } from '../../utils/types';
import EditorUI from './EditorUI'

const initialData: StoryDetailsType = {
  title: '',
  content: '',
  cover: '',
  tags: [],
}

const Editor = () => {

  const { user } = useUser();

  const [data, setData] = useState<StoryDetailsType>(initialData);

  const handleCreateStory = async (e: any) => {
    e.preventDefault();
    try {
      const authorId = user._id;
      await createStory(data, authorId);
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleChangeData = (field: string, value: string) => {
    if (field === 'tags') {
      let newTags = value.split(" ")
      setData({ ...data, [field]: newTags })
    } else {
      setData({ ...data, [field]: value })
    }
  }

  return (
    <EditorUI
      handleChangeData={handleChangeData}
      handleCreateStory={handleCreateStory}
      data={data} />
  )
}

export default Editor