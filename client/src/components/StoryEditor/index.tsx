import React, { useState, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InputField from '../../components/FormFields/InputField';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { StoryDetailsType } from '../../pages/Editor';

interface EditorProps {
    data: StoryDetailsType,
    handleChangeData: (key: string, val: any) => void
}

const StoryEditor: React.FC<EditorProps> = ({
    handleChangeData,
    data,
}) => {
    const [editorState, setEditorState] = useState<EditorState>();
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (data.content) {
            const contentData = convertFromHTML(data.content);
            setEditorState(EditorState.createWithContent(
                ContentState.createFromBlockArray(contentData.contentBlocks, contentData.entityMap)))
        }
    }, [])

    const toolbar = {
        options: ['inline', 'history', 'blockType'],
        inline: {
            options: ['bold', 'italic', 'underline'],
        },
    }

    const onChange = (state: EditorState) => {
        setEditorState(state);
        const htmlData = draftToHtml(convertToRaw(state.getCurrentContent()))
        handleChangeData('content', htmlData)
    }

    const addNewTag = (val: string) => {
        let newTags = [...data.tags, val.toLowerCase()]
        if (val.slice(-1) === ' ') {
            handleChangeData('tags', newTags)
            setNewTag('');
        } else {
            setNewTag(val)
        }
    }

    const removeTag = (index: number) => {
        let newTags = data.tags.filter((tag: string, idx: number) => idx !== index);
        handleChangeData('tags', newTags)
    }

    return (
        <div className=''>
            <div>
                <InputField
                    value={data.title}
                    setValue={(val: string) => handleChangeData('title', val)}
                    required
                    placeholder='Enter Title'
                    boxStyle='fancy' />

                <div className='w-full-lg mb-6'>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onChange}
                        placeholder="Type your content"
                        toolbar={toolbar}
                        editorStyle={{
                            height: '50vh',
                            padding: '0 10px',
                            background: '#f1f1f1',
                            borderRadius: '6px'
                        }}
                        toolbarStyle={{
                            background: '#f1f1f1',
                            borderRadius: '6px'
                        }}
                    />
                </div>
            </div>
            <div className='mb-6'>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Enter tags</label>
                <div className='flex align-center p-2 rounded-lg flex-wrap gap-2'
                    style={{ background: '#f1f1f1' }}>
                    {data.tags.map((tag: any, index: number) => (
                        <span key={index} className="inline-flex items-center py-1 px-2 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                            {tag}
                            <button type="button" className="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900"
                                onClick={() => removeTag(index)}>
                                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </span>
                    ))}

                    <input
                        type="text"
                        className='border-0 text-black text-xsl rounded focus:ring-0 focus:border-0 p-0 block w-full flex-1'
                        value={newTag}
                        onChange={(e) => addNewTag(e.target.value)}
                        style={{ background: '#f1f1f1' }}
                    ></input>
                </div>
            </div>
        </div>
    )
}

export default StoryEditor