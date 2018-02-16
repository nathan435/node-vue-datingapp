<template>
  <div class="main" :class="{'modalOpen': false}">
      <NavHeader></NavHeader>
      <Subheader></Subheader>
      <router-view />
      <UserProfileModal :visible="(isUserRoute || isProfilePreviewRoute)"></UserProfileModal>
      <ChatModal :visible="isChatOpen"></ChatModal>
  </div>
</template>

<script>
import Header from '../../reusables/Header/Header.vue'
import Subheader from '../../reusables/Subheader/Subheader.vue'
import UserProfileModal from './UserProfileModal/UserProfileModal.vue'
import ChatModal from './Chat/ChatModal.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    NavHeader: Header,
    Subheader: Subheader,
    UserProfileModal,
    ChatModal
  },
  data () {
    return {
      modalOpen: true 
    }
  },
  computed: {
      ...mapGetters([
        'isLoggedIn',
        'hasAuthToken',
        'usersList',
        'isChatOpen'
      ]),
      isUserRoute() {
        if (this.$route.params.userId) return true;
        return false;
      },
      isProfilePreviewRoute() {
        if (this.$route.name === 'ProfilePreview') return true;
        return false;
      }
  },
  methods: {
    ...mapActions([
    ]),
    hideTest() {
      this.$router.push({ name: 'UsersBrowser'})
    }
  },
  created() {
    if (!this.isLoggedIn && !this.hasAuthToken) this.$router.replace({ path: 'login' });
    // load users data
    this.$store.dispatch('getUsersList');
    console.log(this.$route);
  },
  watch: {
    isLoggedIn() {
        if (!this.isLoggedIn) this.$router.replace({ path: 'login' });
    }
},
}
</script>


<style scoped lang="scss">

.main {
  width: 100%;
  height: 100%;

  &.modalOpen {
    overflow: hidden;
  }
}

</style>