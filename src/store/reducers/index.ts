import { CHANGE_IMG } from '../consts'

const INITSTATE = {
  url: ''
}

function reducer(state = INITSTATE, action: any) {
  switch(action.type) {
    case CHANGE_IMG:
      return {
        ...state,
        url: action.url
      }
    default:
      return {
        ...state
      }
  }
}
export default reducer