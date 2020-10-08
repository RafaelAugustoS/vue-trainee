<template>
  <li>{{ data }}</li>
</template>

<script>
export default {
  props: { data: Array },
  mounted() {
    console.log(this.$store.state);
  },
};
</script>
