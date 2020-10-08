<template>
  <ul>
    {{
      data
    }}
    <Item :data="data" />
  </ul>
</template>

<script>
import Item from "./Item";
export default {
  components: { Item },
  props: {
    data: Array,
  },
};
</script>
