import React from 'react'
import Button from '../../components/FormFields/Button';
import PageLayout from '../../layouts/PageLayout';
import StoryEditor from '../../components/StoryEditor';

const EditorUI: React.FC<any> = ({
    handleCreateStory,
    handleChangeData,
    data
}) => {

    return (
        <PageLayout>
            <h1 className='mb-5 text-2xl font-bold text-gray-900'>Create Story</h1>

            <div className=''>
                <StoryEditor
                    data={data}
                    handleChangeData={handleChangeData} />

                <div className='mt-2'>
                    <Button onClick={handleCreateStory} label={"Create"} rightAligned />
                </div>
            </div>

        </PageLayout>
    )
}

export default EditorUI