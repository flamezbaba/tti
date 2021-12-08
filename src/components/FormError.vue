<template>
  <div class="col-md-12">
    <div :class="`alert ${classType}`">
      
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FormError",
  props: {
      msg: String,
      classType: String,
  }
};
</script>