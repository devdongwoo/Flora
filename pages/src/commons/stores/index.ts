import { atom, selector } from "recoil"
import { getRestoreToken } from "../libraries/getAccessToken"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export const accessToken = atom({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [persistAtom]
})

export const userData = atom({
  key: "userData",
  default: "",
  effects_UNSTABLE: [persistAtom]
})

export const usedItemDetailComment = atom({
  key: "usedItemDetailComment",
  default: false,
  effects_UNSTABLE: [persistAtom]
})

export const pageAfterlogin = atom({
  key: "pageAfterLogin",
  default: ""
})

export const usedItemEdit: any = atom({
  key: "usedItemEdit",
  default: "",
  effects_UNSTABLE: [persistAtom]
})

export const profileChange = atom({
  key: "profileChange",
  default: false
})

export const modalName = atom({
  key: "modalName",
  default: ""
})

export const modalState = atom({
  key: "modalState",
  default: false
})

export const getNewAccessTokenLoadable = selector({
  key: "getRestoreToken",
  get: async () => {
    const newAccessToken = await getRestoreToken()
    return newAccessToken
  }
})

export const ModalSelector = selector<boolean>({
  key: "modalSelector",
  get: ({ get }) => {
    const result = get(modalState)
    return result
  },
  set: ({ set }, newValue) => {
    set(modalState, newValue)
  }
})
