import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UniqueID from '@tiptap-pro/extension-unique-id'
import Placeholder from '@tiptap/extension-placeholder'
import { ToolBar } from './ToolBar'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import TwoColumnContainer from './Extensions/TwoColumnContainer'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect, useState } from 'react'

const extensions = [
  StarterKit.configure({
    // Disable an included extension
    history: false,

    // Configure an included extension
    heading: {
      levels: [1, 2, 3]
    }
  }),
  TwoColumnContainer,
  Placeholder.configure({
    placeholder: 'Start typing...'
  }),
  Text,
  Paragraph,
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  UniqueID.configure({
    types: ['heading', 'paragraph']
  })
]

export const Editor = () => {
  // const test = JSON.parse(
  //   '{"type":"doc","content":[{"type":"twoColumnContainer","attrs":{"url":"1726173261088-1fa3a4ec816a821f660a9bb445ce68371a82c6098bff9f07fdfd374643aea690faae61addfa8cc776150e64cdd1dffc8-436411257_1013244110402006_1031433928232452100_n.jpg"}},{"type":"paragraph","attrs":{"id":"d5a08ebb-34f9-46bc-80b4-1e3be083e5e8"},"content":[{"type":"hardBreak"},{"type":"text","text":"hello"}]}]}'
  // )

  const [content, setContent] = useState(
    `<twoColumnContainer></twoColumnContainer><br>hello`
  )
  const [title, setTitle] = useState('')
  const editor = useEditor({
    autofocus: true,
    editable: true,
    editorProps: {
      attributes: {
        class: 'focus:outline-none'
      }
    },
    extensions,
    content: content,
    injectCSS: false
  })

  // useEffect(() => {
  //   if (editor) {
  //     editor.commands.setContent(test)
  //   }
  // }, [editor])

  console.log('content', JSON.stringify(editor?.state.doc.toJSON()))
  console.log('content', editor?.state.doc.toJSON())
  return (
    <div className="flex h-full flex-col gap-[20px]">
      <ToolBar editor={editor} />
      <div>
        <div className="flex flex-col">
          <span>Title</span>
          <input
            value={title}
            placeholder="Title"
            className="w-[500px] px-[10px] py-[10px] border-[1px] border-[#b1b1b1] rounded-[4px] focus:outline-none"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
      </div>
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
