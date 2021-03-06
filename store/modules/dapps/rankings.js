import axios from '~/helpers/axios'
import { dappCategoryTagsMap, dappListDefaultLimit, dappListDefaultSort, dappListDefaultOrder } from '~/helpers/constants'

const actions = {
  fetchDapps ({ commit, state }, type) {
    commit('SET_LOADING_STATUS', true)
    axios
      .get('dapps', {
        params: {
          limit: state.limit,
          offset: state.offset,
          order: state.order,
          sort: state.sort,
          tags: dappCategoryTagsMap[state.category]
        }
      })
      .then(response => {
        const data = response.data
        if (type === 'append') {
          commit('APPEND_DAPPS', data)
        } else {
          commit('SET_DAPPS', data)
        }
        commit('SET_LOADING_STATUS', false)
      })
  },
  incrementOffset ({ commit }) {
    commit('INCREMENT_OFFSET')
  },
  setCategory ({ commit }, category) {
    commit('SET_CATEGORY', category)
  },
  setSort ({ commit }, sortOptions) {
    commit('SET_SORT', sortOptions)
  }
}

const getters = {
  category: state => {
    return state.category
  },
  dapps: state => {
    return state.dapps
  },
  isLoading: state => {
    return state.isLoading
  },
  limit: state => {
    return state.limit
  },
  offset: state => {
    return state.offset
  },
  order: state => {
    return state.order
  },
  sort: state => {
    return state.sort
  },
  total: state => {
    return state.total
  }
}

const mutations = {
  APPEND_DAPPS (state, data) {
    state.dapps = state.dapps.concat(data.items)
    state.offset = data.pager.offset
    state.total = data.pager.totalCount
  },
  INCREMENT_OFFSET (state) {
    state.offset += 50
  },
  SET_DAPPS (state, data) {
    state.dapps = data.items
    state.offset = data.pager.offset
    state.total = data.pager.totalCount
  },
  SET_LOADING_STATUS (state, status) {
    state.isLoading = status
  },
  SET_CATEGORY (state, category) {
    let categories = []
    if (category) {
      categories.push(category)
    }
    state.offset = 0
    state.category = categories
  },
  SET_SORT (state, sortOptions) {
    state.offset = 0
    state.order = sortOptions.order
    state.sort = sortOptions.sort
  }
}

const state = () => ({
  category: [],
  dapps: [],
  isLoading: true,
  limit: dappListDefaultLimit,
  offset: 0,
  order: dappListDefaultOrder,
  sort: dappListDefaultSort,
  total: 0
})

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
