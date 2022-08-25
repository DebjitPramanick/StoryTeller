import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { FormatBoldRounded, FormatItalicRounded, FormatQuoteRounded, FormatUnderlinedRounded } from '@mui/icons-material';
import InputField from '../../components/FormFields/InputField';

const EditorUI = () => {

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    return (
        <div className='w-full'>
            <h1 className='mb-5 text-2xl font-bold text-gray-900'>Create Story</h1>

            <div className='flex gap-2'>
                <div style={{
                    width: 'calc(100% - 260px)'
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
                <div className='bg-gray-50' style={{width: '250px'}}>
                    <h1 className='mb-5 text-lg font-bold text-gray-900'>Choose Tags</h1>
                    <div className='mt-2 border shadow-md w-full px-2 py-2 rounded'>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditorUI