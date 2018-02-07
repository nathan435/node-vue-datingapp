<template>
  <div class="usersfilter">
      <p>Ich suche:</p>
    <b-form-checkbox id="checkbox1"
                v-model="status"
                value="men">
      Männer
    </b-form-checkbox>
    <b-form-checkbox id="checkbox2"
            v-model="status"
            value="women">
    Frauen
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  data () {
    return {
        status: []
    }
  }
}
</script>


<style scoped lang="scss">

.usersfilter {
    margin-top: 10px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    min-height: 300px;
    height: 100%;
    border-left: 2px solid $brand-gray-light;

    p, span {
        color: $brand-gray-dark;
    }
}

</style>