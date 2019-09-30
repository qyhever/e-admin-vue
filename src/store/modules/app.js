import { getCollapsed, setCollapsed } from '@/utils/local'
const state = {
  collapsed: getCollapsed() || false,
  loading: false
}

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.collapsed = !state.collapsed
    setCollapsed(!state.collapsed)
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
