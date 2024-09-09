import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// import { getStorageOptions } from '~/utils/storage';

export enum AssetType {
  Image = 'image',
  Video = 'video'
  // Audio = 'audio',
  // File = 'file',
}

export interface Asset {
  id: string
  name: string
  type: string
  timestamp: number
  data: AssetType
}

export interface EditorStore {
  content: string
  setContent: (content: string) => void
  assets: Asset[]
  setAssets: (assets: Asset[]) => void
}

export const useEditorStore = create<EditorStore>()(
  persist(
    set => ({
      content: '',
      setContent: content => set({ content }),
      assets: [],
      setAssets: assets => set({ assets })
    }),
    {
      name: 'editor-store'
    }),
    () => {}
  )
)
