import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { TwoColumnContainer } from './TwoColumnContainer'
import { Extensions } from '../config'

export default Node.create({
  name: Extensions.TwoColumnContainer,
  group: 'block',
  content: 'inline*',
  addAttributes() {
    return {
      url: {
        default: ''
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'TwoColumnContainer'
      }
    ]
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => {
        return this.editor
          .chain()
          .insertContentAt(this.editor.state.selection.head, {
            type: this.type.name
          })
          .focus()
          .run()
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    return [Extensions.TwoColumnContainer, mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(TwoColumnContainer)
  }
})
