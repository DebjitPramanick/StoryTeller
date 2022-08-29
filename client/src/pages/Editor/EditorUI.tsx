import React, { useState } from 'react'
import { Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InputField from '../../components/FormFields/InputField';
import TextAreaField from '../../components/FormFields/TextAreaField';
import Button from '../../components/FormFields/Button';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import PageLayout from '../../layouts/PageLayout';

const EditorUI: React.FC<any> = ({
    handleCreateStory,
    handleChangeData,
    data
}) => {

    const [editorState, setEditorState] = useState<EditorState>();

    const toolbar = {
        options: ['inline', 'history', 'blockType', 'fontFamily'],
        inline: {
            options: ['bold', 'italic', 'underline'],
        },
        blockType: {
            iinDropdown: false,
            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
        },
        fontFamily: {
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
        },
    }

    const onChange = (state: EditorState) => {
        setEditorState(state);
        const htmlData = draftToHtml(convertToRaw(state.getCurrentContent()))
        handleChangeData('content', htmlData)
    }

    return (
        <PageLayout>
            <h1 className='mb-5 text-2xl font-bold text-gray-900'>Create Story</h1>

            <div className='flex gap-2'>
                <div style={{
                    width: 'calc(100% - 360px)'
                }}>
                    <InputField
                        label={'Enter Title'}
                        value={data.title} 
                        setValue={(val: string) => handleChangeData('title', val)} 
                        required/>

                    <div className='mt-2 border shadow-md w-full px-2 py-2 h-96 rounded'>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onChange}
                            placeholder="Type your content"
                            toolbar={toolbar}
                        />
                    </div>
                </div>
                <div className='bg-gray-50 px-4' style={{ width: '350px' }}>
                    <TextAreaField
                        value={data.tags.join(' ')}
                        setValue={(val: string) => handleChangeData('tags', val)}
                        rows={2}
                        label="Enter tags" />
                    <Button onClick={handleCreateStory} label={"Create"} rightAligned />
                </div>
            </div>

        </PageLayout>
    )
}

export default EditorUI