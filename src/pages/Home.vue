<template>
  <div class="container home">
    <header>
      <input
        type="text"
        placeholder="Pesquise por nome ou skills"
        v-model="q"
      />
    </header>
    <div class="content">
      <div class="home__actions">
        <h2>Lista de alunos</h2>

        <div>
          <button @click="deleteAll">Excluir</button>
          <button @click="modal = true">Novo</button>
        </div>
      </div>

      <table class="home__table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" v-model="check" @change="checkAll" />
            </th>
            <th>Nome</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Adicionado em:</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="student in filterList" :key="student.id">
            <td>
              <input type="checkbox" v-model="student.check" />
            </td>
            <td class="home__table__name">
              <figure>
                <img :src="student.avatar" />
              </figure>
              {{ student.name }}
            </td>
            <td>{{ student.email }}</td>
            <td style="display: flex; flex-wrap: wrap;">
              <div class="skill" v-for="skill in student.skills" :key="skill">
                {{ skill }}
              </div>
            </td>
            <td>{{ formatDate(student.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="modal" :close="() => (modal = false)" @update="getStudents" />
  </div>
</template>

<script>
import axios from "axios";
import Modal from "@/components/Modal";
export default {
  data: () => ({
    students: [],
    modal: false,
    check: false,
    q: "",
  }),
  components: { Modal },
  mounted() {
    this.getStudents();
  },
  computed: {
    getCheck() {
      const arr = [];
      const students = this.students.filter((student) => student.check);

      students.map((item) => {
        arr.push(item.id);
      });

      return arr;
    },
    filterList() {
      return this.students.filter((student) =>
        student.name.toLowerCase().match(RegExp(this.q.toLowerCase()))
      );
    },
  },
  methods: {
    async getStudents() {
      try {
        const { data } = await axios.get("http://localhost:3000/students");

        data.map((student) => {
          student.check = false;
        });
        this.students = data;
      } catch (e) {
        console.log(e);
      }
    },
    deleteAll() {
      this.getCheck.map((id) => {
        this.deleteStudent(id);
      });
    },
    async deleteStudent(id) {
      try {
        const { data } = await axios.delete(
          `http://localhost:3000/students/${id}`
        );

        this.getStudents();
      } catch (e) {
        console.log(e);
      }
    },
    formatDate(date) {
      if (date !== undefined) {
        return date.split(" ")[0];
      }

      return "";
    },
    checkAll() {
      const arr = this.students;

      arr.map((student) => {
        student.check = this.check ? true : false;
      });

      this.students = arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 85%;
  margin: 0 7.5%;
}

.skill {
  /* height: 16px; */
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #109cf1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  margin-top: 5px;
  font-size: 12px;
}

.home {
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    height: 50px;
    background: #fff;
    padding: 15px;
    input {
      background: transparent;
      border: 0;
      height: 100%;
      width: 300px;
      outline: none;
    }
  }
  &__actions {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    button {
      border: 0;
      background: #109cf1;
      color: #fff;
      height: 35px;
      width: 130px;
      border-radius: 5px;
      cursor: pointer;
      outline: none;
    }
  }

  &__table {
    width: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.06);
    &__name {
      display: flex;
      align-items: center;
      figure {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    thead {
      tr {
        th {
          padding: 10px;
          border-bottom: 1px solid #f5f5f5;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 10px;
          text-align: center;
        }
      }
    }
  }
}
</style>
