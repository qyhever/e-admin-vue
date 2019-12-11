import { getCollapse, setCollapse } from '@/utils/local'
const state = {
  collapse: getCollapse() || false,
  loading: false
}

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.collapse = !state.collapse
    setCollapse(state.collapse)
  },
  TOGGLE_LOADING(state, value) {
    state.loading = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
