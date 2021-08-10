<template>
<v-dialog v-model="show" persistent max-width="600px">
  <v-card>
    <v-card-title>
      <span class="text-h5">User Profile</span>
    </v-card-title>
    <v-card-text>
       <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
                :counter="10"
                :error-messages="nameErrors"
                v-model="name"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()">
              ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                :error-messages="emailErrors"
                v-model="email"
                label="Email"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()">
              ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
                :error-messages="phoneErrors"
                v-model="phone"
                label="phone"
                required
                @input="$v.phone.$touch()"
                @blur="$v.phone.$touch()">
              ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="cancel">Close</v-btn>
      <v-btn color="blue darken-1" text @click="save" >Save</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script>

import  { validationMixin } from 'vuelidate'
import {email, maxLength, numeric, required} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations:{
    name: {required, maxLength: maxLength(10)},
    email: {required, email},
    phone: {required, numeric}
  },
  props: ["show","user"],
  data(){
    return {
    //  dialogAdd: true,
      name:  "",
      email:  "",
      phone:  ""
    }
  },
  computed: {
    users(){
      return this.$store.getters.user
    },
    nameErrors () {
      const errors = []
      if(!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push("Name must be at most 10 character long")
      !this.$v.name.required && errors.push("Name is required")
      return errors
    },
    emailErrors () {
      const errors = []
      if(!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push("Must be valid e-mail")
      !this.$v.email.required && errors.push("E-Mail is required")
      return errors
    },
    phoneErrors () {
      const errors = []
      if(!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push("Phone is required")
      !this.$v.phone.numeric && errors.push("please use only number")
      return errors
    }
  },


  methods:{
    cancel() {
      this.$emit("cancel")
    },
    save(){
      this.form = {};
      this.form.name  = this.name;
      this.form.email  = this.email;
      this.form.phone  = this.phone;
      console.log(this.form)
      this.$emit("save",this.form)
    }
  },
  watch: {
    show() {
      if (this.show == true) {
        if (this.user.length != 0) {
              this.users.forEach(user => {
                if(user.id == this.user){
                  this.name = user.name
                  this.email = user.email
                  this.phone = user.phone
                }
              })
            }else{
              this.name = ""
              this.email = ""
              this.phone = ""
            }
          }
          console.log("asd")
        }
      }
}
</script>