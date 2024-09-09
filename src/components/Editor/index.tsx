import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UniqueID from '@tiptap-pro/extension-unique-id'
import Placeholder from '@tiptap/extension-placeholder'
import { ToolBar } from './ToolBar'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import EditorContainer from './Extensions/Container'

const extensions = [
  StarterKit,
  EditorContainer,
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
  const editor = useEditor({
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'focus:outline-none'
      }
    },
    extensions,
    content: '<react-component count="0"></react-component><br/>hello',
    injectCSS: false
  })

  console.log('editor', editor)
  return (
    <div className="flex h-full flex-col gap-[20px]">
      <ToolBar editor={editor} />
      <EditorContent
        editor={editor}
        // className="w-full h-full"
      />
    </div>
  )
}
