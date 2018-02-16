<template>
  <div class="user-card" @click="visitUser(user.id)">
      <img :src="profileImage" alt="">
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
    },
    computed: {
        profileImage() {
            if (this.user.profileImage) return this.user.profileImage;
            return 'https://www.dandad.org/static/images/placeholder-860x587.png';
        }
    }
}
</script>


<style scoped lang="scss">

.user-card {
    height: 200px;
    margin-bottom: 10px;
    margin-top: 10px;

    img {
        max-width: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 3px;
    }
}
</style>