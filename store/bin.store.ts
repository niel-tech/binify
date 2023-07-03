import { create } from "zustand"
import { Bin } from "../models/bin.model"

type BinStore = {
  bin: Bin | undefined

  actions: {
    addBin: (bin: Bin | undefined) => void,
    removeBin: (bin: Bin | undefined) => void
  }
}

const useBinStore = create<BinStore>((set) => ({
  bin: undefined,

  actions: {
    addBin: (bin) => set(() => ({ bin })),
    removeBin: () => set(() => ({ bin: undefined }))
  },
}))

export const useBin = () => useBinStore((state) => state.bin)

export const useBinActions = () => useBinStore((state) => state.actions)
