import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    students: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    getStudents(state, students) {
      state.students = students;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    async getStudents({ commit }) {
      try {
        const { data } = await axios.get("http://localhost:3000/students");

        data.map((student) => {
          student.check = false;
        });

        commit("getStudents", data);
      } catch (e) {}
    },
  },
  getters: {
    getUser: (state) => state.user,
    getStudents: (state) => state.students,
  },
});
