import { getCollapse, setCollapse } from '@/utils/local'
const state = {
  collapse: getCollapse() || false
}

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.collapse = !state.collapse
    setCollapse(state.collapse)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
