import UniqueID from '@tiptap-pro/extension-unique-id'
import { Editor } from '@tiptap/core'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'

export const editorConfig = new Editor({
  content: 'escd',
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Start typing...'
    }),
    UniqueID.configure({
      types: ['heading', 'paragraph']
    })
  ]
})
