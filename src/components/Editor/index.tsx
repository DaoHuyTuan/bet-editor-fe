import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UniqueID from '@tiptap-pro/extension-unique-id'
import Placeholder from '@tiptap/extension-placeholder'
import { ToolBar } from './ToolBar'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import TwoColumnContainer from './Extensions/TwoColumnContainer'
import { useState } from 'react'

const extensions = [
  StarterKit,
  TwoColumnContainer,
  Placeholder.configure({
    placeholder: 'Start typing...'
  }),
  Text,
  Paragraph,
  UniqueID.configure({
    types: ['heading', 'paragraph']
  })
]

export const Editor = () => {
  const [content, setContent] = useState(
    `<TwoColumnContainer count="0"></TwoColumnContainer><br/>hello`
  )
  const editor = useEditor({
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'focus:outline-none'
      }
    },
    extensions,
    content: content,
    injectCSS: false
  })

  console.log('content', editor?.state.doc.toJSON())
  console.log('content', editor?.state.doc.toJSON())
  return (
    <div className="flex h-full flex-col gap-[20px]">
      <ToolBar editor={editor} />
      <EditorContent
        onChange={({ editor }) => {
          setContent(editor.getHTML())
        }}
        editor={editor}
        // className="w-full h-full"
      />
    </div>
  )
}
