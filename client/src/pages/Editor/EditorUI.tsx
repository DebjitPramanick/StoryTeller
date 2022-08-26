import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { FormatBoldRounded, FormatItalicRounded, FormatQuoteRounded, FormatUnderlinedRounded } from '@mui/icons-material';
import InputField from '../../components/FormFields/InputField';
import TextAreaField from '../../components/FormFields/TextAreaField';
import Button from '../../components/FormFields/Button';

const EditorUI: React.FC<any> = ({
    handleCreateStory,
    handleChangeData,
    data
}) => {

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    return (
        <div className='w-full'>
            <h1 className='mb-5 text-2xl font-bold text-gray-900'>Create Story</h1>

            <div className='flex gap-2'>
                <div style={{
                    width: 'calc(100% - 360px)'
                }}>
                    <InputField label={'Enter Title'} value={''} setValue={function (val: any): void {
                        throw new Error('Function not implemented.');
                    }} />

                    <div className='flex items-center mt-4 border px-1 py-1 rounded'>
                        <FormatBoldRounded />
                        <FormatItalicRounded />
                        <FormatUnderlinedRounded />
                        <FormatQuoteRounded />
                    </div>
                    <div className='mt-2 border shadow-md w-full px-2 py-2 h-96 rounded'>
                        <Editor editorState={editorState} onChange={setEditorState}
                            placeholder="Type your content" />
                    </div>
                </div>
                <div className='bg-gray-50 px-4' style={{ width: '350px' }}>
                    <TextAreaField
                        value={''}
                        setValue={function (val: any): void {
                            throw new Error('Function not implemented.');
                        }}
                        rows={2}
                        label="Enter tags" />
                    <Button onClick={undefined} label={"Create"} rightAligned/>
                </div>
            </div>

        </div>
    )
}

export default EditorUI