import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { EditorImage } from '../../components/Image'

export const EditorContainer = (props: NodeViewProps) => {
  console.log('props', props)
  return (
    <NodeViewWrapper className="react-component">
      <div className="flex flex-row gap-[1rem]">
        <div className="flex-1">
          <EditorImage elProps={props} />
        </div>
        <div className="flex-1 p-4">
          <NodeViewContent className="flex-1 is-editable p-4 border-2 border-dashed h-full" />
        </div>
      </div>
    </NodeViewWrapper>
  )
}
