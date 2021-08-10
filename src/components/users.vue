<template>
  <v-app>
    <!--SideBar -->
    <v-navigation-drawer  v-model="sidebar" app hide-overlay>
      <v-list>
        <v-list-item  to="/">Home</v-list-item>
        <v-list-item  to="/users">Users</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--Header-->
    <v-app-bar app  hide>
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      <h2 class="hidden-lg-and-down">Home</h2>
    </v-app-bar>

    <!--Main -->
    <v-main>
<!--      <v-btn  class="green ms-5" @click="adduser">Add User To Store</v-btn>-->
      <modal-add  :show="showEdit" @cancel="cancel" :user="correctUserId" @save="save($event)"></modal-add>
      <modal-add  :show="show" @cancel="cancel" @save="save($event)"></modal-add>
      <v-btn  class="green ms-5" @click="modalUser">Add User</v-btn>
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
    </v-main>


    <!--Footer -->
    <v-footer>

    </v-footer>
  </v-app>
</template>


<script>
import  { validationMixin } from 'vuelidate'
import { required, maxLength, email, numeric} from 'vuelidate/lib/validators'
import modal from "./modal";

  export default {
    mixins: [validationMixin],
    validations:{
      name: {required, maxLength: maxLength(10)},
      email: {required, email},
      phone: {required, numeric}
    },

    data(){
      return{
        correctUserId: null,
        selected: [],
        showEdit: false,
        show: false,
        name: "",
        email: "",
        phone: "",
        tableHeaders: [
          { text: 'Name', value: 'name'},
          { text: 'E-Mail', value: 'email' },
          { text: 'Phone Number', value: 'phone' },
          { text: 'Action', value: 'action', sortable: false, align: "center" },
        ],

        sidebar :true
      }
    },

    components:{
      "modalAdd" : modal,
    },

    computed: {
      users() {
        return this.$store.getters.user
      }
    },

    methods:{
      edit(item){
        console.log(item)
        this.correctUserId = item.id
        this.showEdit = true;
        // this.id = item.id
        // this.name = item.name
        // this.email = item.email
        // this.phone = item.phone
        // this.dialog = true;
      },
      deleteSelected(){
        this.$store.dispatch("deleteCorrectUsers", this.selected)
        this.selected = [];
        this.selectedOptions = false
      },
      deleteUser(user){
        this.$store.dispatch("deleteUser", user.id)
      },
      clear(){
        this.name = '';
        this.email = '';
        this.phone = '';

      },
      cancel(){
        this.clear();
        this.showEdit = false;
      },
      save(user){
        console.log(user)
      },

      modalUser(){
        this.show = true;
        //this.correctUserId = this.users[0].id
      },
      adduser(){
        console.log(this.users)
        this.$store.commit("useradd")
      }
    }

  }
</script>