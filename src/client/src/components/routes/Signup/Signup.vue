<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
                    label="Email address:"
                    label-for="email"
                    description="We'll never share your email with anyone else.">
        <b-form-input id="email"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group
                    label="Your Name:"
                    label-for="name">
        <b-form-input id="name"
                      type="text"
                      v-model="form.name"
                      required
                      placeholder="Enter name">
        </b-form-input>
      </b-form-group>
        <b-form-group
                    label="Your password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter a secure password">
        </b-form-input>
      </b-form-group>
      <b-form-group
                    label="Your are:"
                    label-for="exampleInput3">
        <b-form-select id="gender"
                      :options="genders"
                      required
                      v-model="form.gender">
        </b-form-select>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Sign Up!</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
        form: {
            email: '',
            name: '',
            password: ''
        },
        genders: [
            'male',
            'female',
            'other'
        ],
        show: true
    }
  },
  methods: {
      onSubmit() {

      }
  }
}
</script>


<style scoped lang="scss">

</style>