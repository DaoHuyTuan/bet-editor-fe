import { Editor } from '@tiptap/core'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Strikethrough
} from 'lucide-react'

interface Props {
  editor: Editor | null
}
export const ToolBar = (props: Props) => {
  return (
    <div className="flex bg-[#EDF2FA] px-[10px] py-[5px]  justify-between items-center">
      <div className="flex justify-start items-center h-full gap-[10px]">
        <div className="flex gap-[5px]">
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`${props.editor?.isActive('heading', { level: 1 }) ? 'bg-[#D3E2FE]' : ''} p-[5px] rounded-[4px]`}>
            <Heading1
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`${props.editor?.isActive('heading', { level: 2 }) ? 'bg-[#D3E2FE]' : ''} p-[5px] rounded-[4px]`}>
            <Heading2
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
          <button
            onClick={() =>
              props.editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`${props.editor?.isActive('heading', { level: 3 }) ? 'bg-[#D3E2FE]' : ''} p-[5px] rounded-[4px]`}>
            <Heading3
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
        </div>
        <div className="h-[calc(100%-40%)] w-[1px] bg-[#b1b1b1]"></div>
        <div className="flex gap-[5px]">
          <button
            onClick={() => props.editor?.chain().focus().toggleBold().run()}
            className={`${props.editor?.isActive('bold') ? 'bg-[#D3E2FE]' : ''} p-[5px] rounded-[4px]`}>
            <Bold
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
          <button
            onClick={() => props.editor?.chain().focus().toggleItalic().run()}
            className={`${props.editor?.isActive('italic') ? 'bg-[#D3E2FE]' : ''} p-[5px] rounded-[4px]`}>
            <Italic
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
          <button
            onClick={() => props.editor?.chain().focus().toggleStrike().run()}
            className={`${props.editor?.isActive('strike') ? 'bg-[#D3E2FE]' : ''} p-[5px] rounded-[4px]`}>
            <Strikethrough
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
        </div>
        <div className="h-[calc(100%-40%)] w-[1px] bg-[#b1b1b1]"></div>
        <div className="flex gap-[5px]">
          <button
            onClick={() =>
              props.editor?.chain().focus().setTextAlign('left').run()
            }
            className={`${props.editor?.isActive({ textAlign: 'left' }) ? 'bg-[#D3E2FE]' : ''} p-[5px] rounded-[4px]`}>
            <AlignLeft
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
          <button
            onClick={() =>
              props.editor?.chain().focus().setTextAlign('center').run()
            }
            className={`${
              props.editor?.isActive({ textAlign: 'center' })
                ? 'bg-[#D3E2FE]'
                : ''
            } p-[5px] rounded-[4px]`}>
            <AlignCenter
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
          <button
            onClick={() =>
              props.editor?.chain().focus().setTextAlign('right').run()
            }
            className={`${props.editor?.isActive({ textAlign: 'right' }) ? 'bg-[#D3E2FE]' : ''} p-[5px] rounded-[4px]`}>
            <AlignRight
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
          <button
            onClick={() =>
              props.editor?.chain().focus().setTextAlign('justify').run()
            }
            className={`${props.editor?.isActive({ textAlign: 'justify' }) ? 'bg-[#D3E2FE]' : ''} p-[5px] rounded-[4px]`}>
            <AlignJustify
              size={20}
              strokeWidth={1}
              absoluteStrokeWidth
            />
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <button className="bg-[#18181b] text-[white] text-[12px] px-[20px] py-[5px] rounded-[5px]">
          Publish
        </button>
      </div>
    </div>
  )
}
