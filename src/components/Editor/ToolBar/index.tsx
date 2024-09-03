import { Editor } from '@tiptap/core'
import { Bold } from 'lucide-react'

interface Props {
  editor: Editor | null
}
export const ToolBar = (props: Props) => {
  return (
    <div className="flex">
      <button
        onClick={() => props.editor?.chain().focus().toggleBold().run()}
        disabled={!props.editor?.can().chain().focus().toggleBold().run()}
        className={props.editor?.isActive('bold') ? 'is-active' : ''}>
        <Bold
          size={20}
          strokeWidth={1.75}
        />
      </button>
    </div>
  )
}
