<template>
  <div>
    <div>
      <v-app-bar dark>
        <v-app-bar-nav-icon class="hidden-lg-and-up p-0" @click="sidebar = !sidebar"></v-app-bar-nav-icon>
        <v-navigation-drawer v-model="sidebar" class="hidden-lg-and-up"  app hide-overlay >
          <v-list>
            <v-list-item  to="/">Home</v-list-item>
            <v-list-item  to="/users">Users</v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-app-bar>

      <v-navigation-drawer  class="hidden-lg-and-down p-0" app hide-overlay>
        <v-list>
          <v-list-item class="px-2 text-h4">
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item link>
            <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title ><router-link class="list-group" to="/users">Users</router-link></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-spacer></v-spacer>
    </div>

    <v-row justify="center" class="mb-5">
      <v-dialog v-model="dialog" persistent max-width="600px">
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
            <v-btn color="blue darken-1" text @click="dialog = false ;clear()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="update">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="dialogAdd"
          persistent
          max-width="600px">
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
            <v-btn color="blue darken-1" text @click="dialogAdd = false ;clear()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addUser">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row class="ms-5" v-if="selectedOptions">
      <v-col>
        <v-list-item>
          <v-icon left @click="deleteSelected">
            {{ icons.mdiDelete }}
          </v-icon>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row class="ms-5"  no-gutters v-if="users.length != 0">
          <v-data-table v-model="selected" :single-select="false" show-select
              :headers="this.tableHeaders"
              :items="users" item-key="id">
            <template v-slot:item.action="{item }">
              <v-btn color="success" @click="deleteUser(item)">Delete</v-btn>
              <v-btn color="error" @click="edit(item)">Edit</v-btn>
            </template>
          </v-data-table>
        </v-row>
    <v-btn  class="green ms-5" @click="modalUser">Add User</v-btn>
  </div>
</template>

<script>
import  { validationMixin } from 'vuelidate'
import { required, maxLength, email, numeric} from 'vuelidate/lib/validators'
import {
  mdiAccount,
  mdiPencil,
  mdiShareVariant,
  mdiDelete,
} from '@mdi/js'

  export default {
    mixins: [validationMixin],
    validations:{
      name: {required, maxLength: maxLength(10)},
      email: {required, email},
      phone: {required, numeric}
    },
    data(){
      return{
        selectedOptions: false,
        selected: [],
        sidebar: false,
        drawer: false,
        group: null,
        dialogAdd:false,
        dialog: false,
        formShow: false,
        icons: {
          mdiAccount,
          mdiPencil,
          mdiShareVariant,
          mdiDelete,
        },
          name: "",
          email: "",
          phone: "",
        nameEdit: "",
        emailEdit: "",
        phoneEdit: "",
        tableHeaders: [
          { text: 'Name', value: 'name'},
          { text: 'E-Mail', value: 'email' },
          { text: 'Phone Number', value: 'phone' },
          { text: 'Action', value: 'action', sortable: false, align: "center" },
        ],
      }
    },
    // created() {
    //   if(this.users.length == 0){
    //     this.formShow = true;
    //   }
    // },
    computed:{
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

    watch: {
      group () {
        this.drawer = false
      },
      selected(){
        if(this.selected.length !== 0){
          this.selectedOptions = true;
        }else {
          this.selectedOptions = false
        }
        }
      },
    methods:{
      deleteSelected(){
        this.$store.dispatch("deleteCorrectUsers", this.selected)
        this.selected = [];
        this.selectedOptions = false
      },
      update(){
        if(this.phoneErrors.length == 0 && this.nameErrors.length == 0 && this.emailErrors.length == 0) {
          if (this.name && this.email && this.phone) {
            this.form = {};
            this.form.id = this.id;
            this.form.name = this.name
            this.form.email = this.email
            this.form.phone = this.phone
            this.$store.dispatch("update", this.form)
            this.dialog = false;
          }
        }
      },

      submit () {
        if(this.phoneErrors.length == 0 && this.nameErrors.length == 0 && this.emailErrors.length == 0){
          if(this.name && this.email && this.phone) {
            this.form = {};
            if (this.users.length != 0) {
              this.form.id = this.users[this.users.length - 1].id + 1;
            } else {
              this.form.id = 0;
            }
            this.form.name = this.name
            this.form.email = this.email
            this.form.phone = this.phone
            this.$store.dispatch("addUser", this.form)
            this.formShow = false;
            this.clear();
            this.dialogAdd = false;
          } else {
            this.dialogAdd = false;
          }
        }else{
          return false
        }
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.phone = ''
      },
      addUser(){
        if(this.submit()){
          this.dialogAdd = false;
        }
        document.getElementById("form").classList.add("col-12")
      },
      deleteUser(user){
        this.$store.dispatch("deleteUser", user.id)
      },
      edit(item){
        this.id = item.id
        this.name = item.name
        this.email = item.email
        this.phone = item.phone
        this.dialog = true;
      },
      modalUser(){
        this.dialogAdd = true;
      }
    }
  }
</script>
