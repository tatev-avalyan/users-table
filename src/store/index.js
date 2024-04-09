import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import service from "@/services/ApiService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    selectedUser: null,
  },
  getters: {
    data(state) {
      return state.data;
    },
    selectedUser: (state) => {
      return state.selectedUser;
    },
  },
  mutations: {
    SET_DATA(state, payload) {
      state.data = payload;
    },
    SELECT_USER(state, payload) {
      state.selectedUser = state.data.results.find(
        (user) => user.login.uuid === payload
      );
    },
  },
  actions: {
    async getData({ commit }, params) {
      try {
        const res = await service.users.getAll(params);
        commit("SET_DATA", res.data);
      } catch (error) {
        throw new Error("Error fetching users:", error);
      }
    },
    async selectUser({ commit }, data) {
      commit("SELECT_USER", data);
    },
  },
  plugins: [createPersistedState()],
});
