<template>
  <div class="user-card" @click="visitUser(user.id)">
      <img src="https://www.dandad.org/static/images/placeholder-860x587.png" alt="">
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        user: Object
    },
    methods: {
        ...mapActions([
            'visitUser'
        ])
    }
}
</script>


<style scoped lang="scss">

.user-card {

    margin-bottom: 10px;
    margin-top: 10px;

    img {
        max-width: 100%;
    }
}
</style>