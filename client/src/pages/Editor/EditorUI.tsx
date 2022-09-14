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
        <PageLayout pageTitle="Publish Story">
            <div className=''>
                <StoryEditor
                    data={data}
                    handleChangeData={handleChangeData} />

                <div className='mt-2'>
                    <Button onClick={handleCreateStory} label={"Publish"} rightAligned />
                </div>
            </div>

        </PageLayout>
    )
}

export default EditorUI