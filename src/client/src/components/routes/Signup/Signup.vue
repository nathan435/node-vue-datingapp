<template>
  <b-card class="signupform" v-if="show">
      <div class="progress" :class="{'hidden': currentStep === 1}"><div :style="{'width': progressBarWidth}"></div></div>
      <div class="step-1" v-if="currentStep === 1">
        <p class="step-header">Hey. Schön, dass du da bist. Wie heißt du?</p>
        <b-form-group
          label-for="username"
          :description="validationErrors && validationErrors.username && showValidationErrorsFor['username'] ? '' : 'Dein Name'"
        >
        <b-form-input id="username"
                type="text"
                spellcheck="false"
                autocomplete="off"
                v-model="form.username"
                required
                :class="{'is-invalid': validationErrors && validationErrors.username && showValidationErrorsFor['username']}"
                placeholder="">
          </b-form-input>
          <div class="invalid-feedback">
            {{validationErrors && validationErrors.username ? validationErrors.username[0] : null}}
          </div>
            <div class="input-icon">
              <img class="check-icon" v-if="isUsernameCompleted" :src="require('../../../assets/checked.svg')">
            </div>
        </b-form-group>
         <b-button variant="primary" v-if="this.form.username" :disabled="!this.form.username" @click="completeStepOne">Weiter</b-button>
      </div>
      <div class="step-2" v-if="currentStep === 2">
        <p class="step-header">Verrätst du uns ein bisschen was von dir, {{form.username}}?</p>
        <b-form-group
          label-for="gender"
          description="Dein Geschlecht"
        >
        <b-form-select v-model="form.gender" :options="genderOptions" />
            <div class="input-icon">
              <img class="check-icon" v-if="isGenderCompleted" :src="require('../../../assets/checked.svg')">
            </div>
        </b-form-group>
        <b-form-group
          label-for="dateOfBirth"
          :description="validationErrors && validationErrors.dateOfBirth && showValidationErrorsFor['dateOfBirth'] ? '' : 'Dein Geburtsdatum'"
        >
        <b-form-input id="dateOfBirth"
                type="date"
                spellcheck="false"
                v-model="form.dateOfBirth"
                required
                :class="{'is-invalid': validationErrors && validationErrors.dateOfBirth && showValidationErrorsFor['dateOfBirth']}"
                placeholder="">
          </b-form-input>
            <div class="invalid-feedback">
              {{validationErrors && validationErrors.dateOfBirth ? validationErrors.dateOfBirth[0] : null}}
            </div>
            <div class="input-icon">
              <img class="check-icon" v-if="isDateOfBirthCompleted" :src="require('../../../assets/checked.svg')">
            </div>
        </b-form-group>
        <b-form-group
          id="geolocation-formgroup"
          label-for="geolocation"
          description="Deine Stadt"
        >
        <b-form-input id="geolocation"
                type="text"
                list=geolocation-options
                spellcheck="false"
                autocomplete="off"
                v-model="form.geolocation.input"
                required
                placeholder="">
          </b-form-input>
            <div class="input-icon">
              <img class="check-icon" v-if="!isGeolocationCompleted" :class="{'shaking-needle' : isGeolocationPending}" :src="require('../../../assets/navigation.svg')" @click="tryGetGPS">
              <img v-if="isGeolocationCompleted" :src="require('../../../assets/checked.svg')" @click="resetGeolocation">
            </div>
            <datalist id=geolocation-options>
            <option
             v-for="option in geolocationOptions"
             :key="option.formattedAddress"
             :value="option.formattedAddress">
            </option>
            </datalist>

            
        </b-form-group>

         <b-button variant="primary" :disabled="!this.form.gender || !this.form.dateOfBirth || !this.form.geolocation.input || !this.form.geolocation.city" @click="completeStepTwo">Weiter</b-button>
      </div>

      <div class="step-3" v-if="currentStep === 3">
        <p class="step-header">Fast geschafft!</p>
        <b-form-group
          :description="emailValidationError ? '' : 'Deine Email Adresse'"
        >
          <b-form-input id="email"
                        type="email"
                        spellcheck="false"
                        v-model="form.email"
                        required
                        :class="{'is-invalid': emailValidationError}"
                        @change="serversideValidationErrors.email = ''"
          >
          </b-form-input>
          <div class="invalid-feedback">
            {{emailValidationError}}
          </div>
        </b-form-group>
          <b-form-group
            :description="validationErrors && validationErrors.password && showValidationErrorsFor['password'] ? '' : 'Dein sicheres Passwort'"
          >
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required
                        :class="{'is-invalid': validationErrors && validationErrors.password && showValidationErrorsFor['password']}"
          >
          </b-form-input>
          <div class="invalid-feedback">
            {{validationErrors && validationErrors.password ? validationErrors.password[0] : null}}
          </div>
        </b-form-group>
        <b-button type="submit" variant="primary" :disabled="!form.email || !form.password" @click="completeStepThree">Beitreten</b-button>
      </div>
      <div class="step-4" v-if="currentStep === 4">
        <p class="step-header">Super! Jetzt fehlt nur noch ein Profilbild.</p>
        <picture-input
          class="profileImageInput"
          ref="pictureInput"
          @change="profileImageInputChanged"
          v-model="profileImageFile"
          width="400" 
          height="400" 
          margin="16" 
          accept="image/jpeg,image/png" 
          size="10" 
          buttonClass="btn"
          :hideChangeButton="true"
          :customStrings="{
            upload: '<h1>Nice!</h1>',
            drag: 'Zieh dein Bild hier hin, oder klick hier.',
            tap: 'Tipp hier zum auswählen.',
            change: 'Bild ändern'
          }">
        </picture-input>
        <b-button variant="primary" :disabled="!profileImageFile" @click="completeStepFour">Weiter zu deinem Dashboard</b-button>
      </div>

  </b-card>
</template>

<script>
import moment from 'moment'
moment.locale('de')
import { debounce, deburr } from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import PublicApi from '../../../api/public'
import AuthApi from '../../../api/auth'
import validate from 'validate.js'
import PictureInput from 'vue-picture-input'
import Cookies from 'cookies-js'

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

const validationRules = {
  username: {
    presence: true,
    length: {
      minimum: 2,
      maximum: 10,
      tooShort: '^Dein Name ist zu kurz.',
      tooLong: '^Dein Name ist zu lang.'
    }
  },
  gender: {
    presence: true
  },
  dateOfBirth: {
    datetime: {
      dateOnly: true,
      earliest: moment.utc().subtract(150, 'years'),
      latest: moment.utc().subtract(18, 'years'),
      tooEarly: '^So alt ist niemand.',
      tooLate: '^Du musst mindestens 18 Jahre alt sein.',
      message: '^Bitte gib ein gültiges Datum an.'
    }
  },
  email: {
    presence: true,
    email: {
      message: '^Bitte gib eine gültige Email Adresse ein.'
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 5,
      tooShort: '^Dein Passwort ist zu kurz.'
    }
  }
}

export default {
  components: {
    PictureInput
  },
  data () {
    return {
        form: {
            email: '',
            password: '',
            username: '',
            dateOfBirth: null,
            geolocation: {
              formattedAddress: '',
              coordinates: {},
              input: ''
            }
        },
        profileImageFile: null,
        showValidationErrorsFor: {
          email: false,
          password: false,
          dateOfBirth: false,
          geolocation: false,
          username: false
        },
        serversideValidationErrors: {
          email: '',
        },
        currentStep: 1,
        show: false,
        geolocationOptions: [],
        isGeolocationPending: false,
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
  created() {
      if (!this.hasAuthToken) {
        this.show = true;
      }
      if (this.isLoggedIn && !this.user.profileImage) {
        this.show = true;
        this.currentStep = 4;
      }
  },
  watch: {
      isLoggedIn() {
          if (this.isLoggedIn && this.user.profileImage) this.$router.replace({ name: 'UsersBrowser' });
          if (this.isLoggedIn && !this.user.profileImage) {
            this.show = true;
            this.currentStep = 4;
          }
      },
      'form.geolocation.input': debounce(async function() {
        if (!this.form.geolocation.input || !this.form.geolocation.input.length > 2) return;
        if (this.form.geolocation.input === this.form.geolocation.formattedAddress) return;

        try {
          const result = await PublicApi.getGeolocationByInput(deburr(this.form.geolocation.input));
          const { geolocation } = result.data;
          if (!geolocation) {
            this.form.geolocation = {
              ...this.form.geolocation,
              formattedAddress: '',
              city: '',
              coordinates: {}
            }
          }
          console.log(geolocation);
          //this.form.geolocation.formatted_address
          this.form.geolocation = {
            formattedAddress: geolocation.formattedAddress,
            coordinates: geolocation.coordinates,
            input: geolocation.city,
            city: geolocation.city
          };

          this.geolocationOptions.push(geoloation.formattedAddress)
        } catch (e) {
        }
        
      }, 1000)
  },
  computed: {
      ...mapGetters([
          'isLoggedIn',
          'hasAuthToken',
          'user'
      ]),
      genderOptions() {
          return this.genders.map((gender) => {
              return {
                  value: gender.id,
                  text: 'Ich bin ' + gender.adjective
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
      },
      maxBirthDate() {
        return new moment().subtract(18, 'y');
      },
      minBirthDate() {
        return new moment().subtract(99, 'y');
      },
      isUsernameCompleted() {
        console.log(this.validationErrors)
        if (!this.validationErrors || !this.validationErrors.username) return true;
        return false;
      },
      isGenderCompleted() {
        if (this.form.gender) return true;
        return false;
      },
      isDateOfBirthCompleted() {
        const date = new moment(this.form.dateOfBirth, 'YYYY-MM-DD');
        if (!date.isValid('DD-MM-YYYY')) return false;
        if (!date.isAfter(this.minBirthDate)) return false;
        if (!date.isBefore(this.maxBirthDate)) return false;
        return true;
      },
      isGeolocationCompleted() {
        // if geolocation is not empty and formattedAddress and coordinates are set
        if (
          this.form.geolocation.input.length > 2
          && this.form.geolocation.formattedAddress
          && this.form.geolocation.coordinates) return true;
          return false;
      },
      validationErrors() {
        return validate({
          username: this.form.username,
          gender: this.form.gender,
          dateOfBirth: this.form.dateOfBirth,
          geolocation: this.form.geolocation,
          email: this.form.email,
          password: this.form.password
        }, validationRules)
      },
      emailValidationError() {
        if (!this.showValidationErrorsFor.email) return null;
        if (this.serversideValidationErrors.email) return this.serversideValidationErrors.email;
        if (this.validationErrors && this.validationErrors.email) return this.validationErrors.email[0];
        return null;
      },
      isEmailCompleted() {
        const validationResult = validate({email: this.form.email}, validationRules);
        console.log(validationResult);
      },
      isPasswordCompleted() {
        const validationResult = validate({email: this.form.email}, validationRules);
        return false;
      },
      isStepOneValid() {
        if (this.isUsernameCompleted) return true;
        return false;
      },
      isStepTwoValid() {
        if (this.isGenderCompleted && this.isDateOfBirthCompleted && this.isGeolocationCompleted) return true;
        return false;
      },
      isStepThreeValid() {
        if (!this.validationErrors) return true;
        if (!this.validationErrors.email && !this.validationErrors.password) return true
        return false;
      },
      progressBarWidth() {
        if (this.currentStep === 1) return '0%';
        if (this.currentStep === 2) return '33.33%';
        if (this.currentStep === 3) return '66.66%';
        if (this.currentStep === 4) return '100%';
      }
  },
  methods: {
    ...mapActions([
      'uploadProfilePicture'
    ]),
    completeStepOne() {
      // validate
      if (!this.isStepOneValid) {
        this.showValidationErrorsFor.username = true;
        return;
      }
      // move to step 2
      this.currentStep = 2;
    },
    completeStepTwo() {
      // validate
      // move to step 3
      if (!this.isStepTwoValid) {
        this.showValidationErrorsFor.gender = true;
        this.showValidationErrorsFor.dateOfBirth = true;
        this.showValidationErrorsFor.geolocation = true;
        return;
      }
      this.currentStep = 3;
    },
    async completeStepThree() {
      // validate
      this.showValidationErrorsFor.email = true;
      this.showValidationErrorsFor.password = true;
      if (this.validationErrors) return;

      try {
        // if user is signed up user now
        const signupResult = await AuthApi.signup(this.form);
        console.log('signupResult', signupResult);

        if (!signupResult || !signupResult.data) throw new Error('network error');
        if (signupResult.data.errors && signupResult.data.errors.email) throw new Error(signupResult.data.errors.email.msg);

        // set user as logged in user
        const { user, token } = signupResult.data;
        this.$store.commit('RECEIVE_LOGIN_SUCCESS', { user, token });

        this.currentStep = 4;

      } catch (e) {
        if (e.message === 'email exists') this.serversideValidationErrors.email = 'Ein Account mit dieser Email Adresse existiert bereits.';
        console.log(e);
      }
    },
    async completeStepFour() {
      // upload profile picture
      store.dispatch('uploadProfilePicture', this.profileImageFile);
    },
    resetGeolocation() {
      this.form.geolocation = {
        input: '',
        city: '',
        formattedAddress: '',
        coordinates: {}
      }
    },
    tryGetGPS() {
        if ("geolocation" in navigator) {
        /* geolocation is available */
        this.isGeolocationPending = true;
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const result = await PublicApi.getGeolocationByCoordinates([latitude, longitude]);
          this.isGeolocationPending = false;
          const { geolocation } = result.data;

          console.log(geolocation);
          
          if (geolocation.coordinates) {
            this.form.geolocation = {
              input: geolocation.city,
              formattedAddress: geolocation.formattedAddress,
              city: geolocation.city,
              coordinates: geolocation.coordinates
            }
          }
        })
      }
    },
    profileImageInputChanged(image, event) {
      this.profileImageFile = image;
    }
  }
}
</script>


<style scoped lang="scss">

.hidden {
  opacity: 0;
}

.signupform {
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    border: none;

  .btn {
    width: 100%;
  }

  .step-header {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .progress {
    width: 100%;
    height: 5px;
    border-radius: 2px;
    margin-bottom: 50px;
    transition: all 0.5s;

    div {
      width: 20%;
      height: 100%;
      border-radius: 2px;
      background: $brand-primary;
      transition: all 0.3s;
    }
  }

  .form-group {
    position: relative;
    margin-bottom: 20px;
  }

  .input-icon {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 7px;
    right: 13px;

    .check-icon {
      background: #fff;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .step-4 {
  
    .profileImageInput {
      margin-top: 50px;
      margin-bottom: 50px;
    }


  }
}



.shaking-needle {
  animation: needle 2s infinite ease-in;
}

@keyframes needle {
  0% {
    transform: rotateZ(0deg);
  }

  25% {
    transform: rotateZ(-30deg);
  }

  50% {
    transform: rotateZ(30deg)
  }
  
  75% {
    transform: rotateZ(-30deg)
  }

  100% {
    transform: rotateZ(0deg);
  }
}

</style>