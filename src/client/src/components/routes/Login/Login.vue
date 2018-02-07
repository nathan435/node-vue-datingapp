<template>
  <b-card class="loginform" v-if="show">
    <b-form @submit.prevent="onSubmit">
      <b-form-group>
        <b-form-input id="email"
                      type="email"
                      spellcheck="false"
                      v-model="form.email"
                      required
                      placeholder="Your email">
        </b-form-input>
      </b-form-group>
        <b-form-group>
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Your password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
        form: {
            email: '',
            password: ''
        },
        show: false
    }
  },
  created() {
      if (!this.hasAuthToken) {
        this.show = true;
      } 
  },
  watch: {
      isLoggedIn() {
          if (this.isLoggedIn) this.$router.replace({ name: 'UsersBrowser' });
      }
  },
  computed: {
      ...mapGetters([
          'isLoggedIn',
          'hasAuthToken'
      ])
  },
  methods: {
      ...mapActions([
          'tryLogin'
      ]),
      onSubmit() {
          this.tryLogin({
              email: this.form.email,
              password: this.form.password
          })
      }
  }
}
</script>


<style scoped lang="scss">

.loginform {
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
}

</style>