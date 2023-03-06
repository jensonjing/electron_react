import { CHANGE_IMG } from '../consts'

const changeImgAction = (url: any) => {
  return {
    type: CHANGE_IMG,
    url
  }
}

export {
  changeImgAction
}