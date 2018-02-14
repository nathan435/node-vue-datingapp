<template>
    <b-container class="edit-profile">
        <h2>Dein Profil</h2>
        <router-link :to="{ name: 'ProfilePreview'}" class="preview-link">Profilvorschau anzeigen</router-link>
        <b-row>
            <b-col cols="8" offset="2">
                <b-container>
                    <b-row class="first-formgroup align-items-center">
                        <b-col cols="4">
                            <b-img rounded="circle" width="130" height="130" blank-color="#bbb" alt="img" center class="my-3" :src="form.profileImage" />
                        </b-col>
                        <b-col cols="8">
                            <p><span>Mein Name ist </span><span><b-form-input class="user-forminput username-forminput" type="text" v-model="form.username"/></span>.</p>
                            <p><span>Ich bin</span><b-form-select class="user-forminput gender-forminput" v-model="form.gender" :options="genderOptions" /><span>,</span></p>
                            <p><b-form-input class="user-forminput age-forminput" v-model="form.age" type="number" min="18" max="99"/><span> Jahre alt</span></p>
                            <p><span>und wohne in </span><span><b-form-input v-model="form.location" class="user-forminput location-forminput" type="text"/></span>.</p>
                        </b-col>
                    </b-row>
                    <b-form-group
                        label="Ich bin interessiert an"
                        label-for="gendersInterestedIn"
                    >
                        <b-form-checkbox-group id="gendersInterestedIn" v-model="form.gendersInterestedIn" :options="gendersInterestedInOptions">
                        </b-form-checkbox-group>
                    </b-form-group>
                    <b-form-group
                        description="Was bewegt dich gerade? Wie verbringst du gerne deine Zeit? Schreibe ein paar Zeilen."
                        label-for="textarea1"
                    >
                        <b-form-textarea id="description"
                        v-model="form.description"
                        placeholder="Ich mag Eis und Pistazien, aber kein Pistazieneis."
                        :rows="4"
                        :max-rows="8">
                        </b-form-textarea>
                    </b-form-group>
                </b-container>
            </b-col>
            
        </b-row>
    </b-container>
</template>

<script>
import { debounce } from 'lodash'
import UserProfileModal from '../UserProfileModal/UserProfileModal.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        UserProfileModal
    },
    data () {
        return {
            form: {
                username: 'Luc',
                gender: 'male',
                age: 22,
                location: 'Duisburg',
                gendersInterestedIn: ['female'],
                description: 'Hallo Welt. Das ist heißer Dating Scheiß.',
                profileImage: 'http://www.castlehearing.co.uk/wp-content/uploads/2016/03/profile-placeholder.jpg'
            },
            genders: [
                {
                    id: 'male',
                    name_plural: 'Männer',
                    name_singular: 'Mann',
                    adjective: 'männlich'
                    
                },
                {
                    id: 'female',
                    name_plural: 'Frauen',
                    name_singular: 'Frau',
                    adjective: 'weiblich'
                },
                {
                    id: 'other',
                    name_plural: 'Andere',
                    name_singular: 'Etwas anderes',
                    adjective: 'etwas anderes'
                }
            ]
        }
  },
  computed: {
      ...mapGetters([
          'user'
      ]),
      genderOptions() {
          return this.genders.map((gender) => {
              return {
                  value: gender.id,
                  text: gender.adjective
              }
          })
      },
      gendersInterestedInOptions() {
          return this.genders.map((gender) => {
              return {
                  value: gender.id,
                  text: gender.name_plural
              }
          })
      }
  },
  watch: {
      form: {
          handler: debounce(function() {
              this.$store.dispatch('submitProfileUpdate', this.form);
          }, 1500),
          deep: true
      }
  },
  methods: {
      ...mapActions([
          'submitProfileUpdate'
      ]),
      populateForm(user) {
          if (!user) return;
          console.log('user to populate', user);
          if (user.username) this.form.username = user.username;
          if (user.profile.gender) this.form.gender = user.profile.gender;
          if (user.profile.age) this.form.age = user.age;
          if (user.profile.location) this.form.location = user.location;
          if (user.profile.gendersInterestedIn) this.form.gendersInterestedIn = user.profile.gendersInterestedIn;
          if (user.profile.description) this.form.description = user.profile.description;
          if (user.profile.profileImage) this.form.profileImage = user.profile.profileImage;
          console.log(this.form);
      }
  },
  created() {
      // load user data from vuex state
      if (!this.user) this.$router.replace({ name: 'UsersBrowser' });
      this.populateForm(this.user);
  }
}
</script>


<style scoped lang="scss">

.edit-profile {
    margin-top: 20px;

    h2 {
        text-align: center;
        margin-top: 50px;
        margin-bottom: 2px;
    }

    h3 {
        text-align: center;
        margin-bottom: 20px;
        color: $brand-gray-dark;
    }

    .preview-link {
        text-align: center;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        margin-bottom: 50px;
    }

    .profile-image {
        max-height: 300px;
    }

    .username-formgroup {
        margin-top: 50px;
    }

    .first-formgroup {
    }

    .user-forminput {
        display: inline;
    }

    .username-forminput {
        margin-left: 10px;
        margin-right: 5px;
        width: auto;
    }

    .gender-forminput {
        margin-left: 10px;
        margin-right: 5px;
        width: auto;
    }

    .age-forminput {
        width: auto;
        margin-right: 5px;
    }

    .location-forminput {
        width: auto;
        margin-left: 10px;
        margin-right: 5px;
    }
}

</style>
