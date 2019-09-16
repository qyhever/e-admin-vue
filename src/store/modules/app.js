import { getCollapsed, setCollapsed } from '@/utils/local'
const state = {
  collapsed: getCollapsed() || false,
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.collapsed = !state.collapsed
    setCollapsed(!state.collapsed)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
