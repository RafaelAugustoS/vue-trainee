<template>
  <form @submit="submit">
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Senha" v-model="password" />

    <button>Entrar</button>

    <p>{{ getUser }}</p>
  </form>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    email: "rafael.augusto@signainfo.com.br",
    password: "123",
  }),
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    async submit(e) {
      e.preventDefault();

      const { email, password } = this;
      const { data } = await axios.get(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );

      this.$store.dispatch("setUser", data[0]);
      this.$router.push("/home");
    },
  },
};
</script>
