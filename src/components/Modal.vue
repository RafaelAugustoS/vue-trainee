<template>
  <div class="modal">
    <div class="modal__card">
      <div class="modal__card__header">
        <h2>Cadastrar novo aluno</h2>

        <button @click="close">Fechar</button>
      </div>

      <figure>
        <img v-if="existsAvatar" :src="avatar" />
      </figure>

      <form @submit="createStudent">
        <input type="text" placeholder="Nome" class="ralf" v-model="name" />
        <input type="text" placeholder="Email" class="ralf" v-model="email" />
        <input
          type="text"
          placeholder="Digite as skills separadas por ','"
          v-model="skills"
        />
        <input
          type="text"
          placeholder="Digite a url da foto"
          v-model="avatar"
        />

        <button type="submit">Criar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    name: "",
    email: "",
    skills: "",
    avatar: "",
  }),
  props: {
    close: Function,
  },
  computed: {
    getSkills() {
      return this.skills.split(",");
    },
    existsAvatar() {
      return this.avatar.length > 0;
    },
  },
  methods: {
    async createStudent(e) {
      e.preventDefault();
      try {
        const { name, email, skills, avatar } = this;
        const { data } = await axios.post("http://localhost:3000/students", {
          name,
          email,
          skills: this.getSkills,
          avatar,
          createdAt: new Date().toLocaleString("pt-br"),
        });

        this.close();
        this.$emit("update");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  &__card {
    background: #fff;
    width: 500px;
    border-radius: 5px;
    padding: 10px;

    figure {
      width: 100px;
      height: 100px;
      background: #ccc;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__header {
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      button {
        background: transparent;
        border: 0;
        cursor: pointer;
        outline: none;
      }
    }

    form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .ralf {
        width: 48%;
      }
      input {
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        height: 35px;
        padding-left: 10px;
        width: 100%;
        margin-top: 10px;
      }

      button {
        border: 0;
        background: #109cf1;
        color: #fff;
        height: 35px;
        width: 130px;
        border-radius: 5px;
        cursor: pointer;
        outline: none;
        margin-top: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
