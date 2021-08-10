//import router from '../../router'

export default {
    state: {
        //user: JSON.parse(localStorage.getItem("user")) || [],
        user: [
            {
                "id": 0,
                "name": "Nick",
                "email": "dsfdsf@gmail.com",
                "phone": "2426465"
            },
            {
                "id": 1,
                "name": "tom",
                "email": "dsfdsf@gmail.com",
                "phone": "8978979"
            },
            {
                "id": 2,
                "name": "Tad",
                "email": "dsfdsf@gmail.com",
                'phone': "654165"
            },
            {
                "id": 3,
                "name": "Tad",
                "email": "dsfdsf@gmail.com",
                "phone": "654165"
            }
        ]
    },
    getters: {
        user(state){
            return state.user
        }
    },
    mutations: {
        // useradd(state){
        //     console.log(state.user)
        //     localStorage.setItem("user", JSON.stringify(state.user))
        // },
        update(state,data){
            state.user.forEach(user  => {
              if(user.id == data.id){
                  user.name = data.name
                  user.email = data.email
                  user.phone = data.phone
              }
          })
            localStorage.setItem("user",state.user)
        },
        addUserTo(state,data){
            state.user.push(data)
            // state.user = data
            localStorage.setItem("user",JSON.stringify(state.user))
        },
        deleteUser(state,data) {
            state.user.forEach((user,index) => {
                if(user.id == data){
                    state.user.splice(index, 1)
                }
                localStorage.setItem("user",JSON.stringify(state.user))
               // console.log(data)
            })
        },
        deleteCorrectUsers(state, data) {
            state.user.forEach( (user,index) => {
                if(data[index]){
                    if(user.id  == data[index].id){
                       state.user.splice(index,1)
                    }
                }
            })
            localStorage.setItem("user",JSON.stringify(state.user))
            //console.log(state);
           // console.log(data);
        }
    },
    actions: {
        addUser(ctx, form){
            ctx.commit("addUserTo",form)
        },
        deleteUser(ctx,id){
            ctx.commit("deleteUser",id)
        },
        update(ctx, data) {
            ctx.commit("update",data)
        },
        deleteCorrectUsers(ctx,data){
           ctx.commit("deleteCorrectUsers", data)
        }
    }
}