import { createRouter, createWebHistory } from "vue-router"; 

import homePage from "@/views/homePage.vue";
import accountMsg from "@/views/accountMsg.vue";
import editPage from "@/views/editPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            component: homePage
        },{
            path:'/accountMsg',
            component: accountMsg
        },{
            path:'/editPage',
            component: editPage
        }
    ]
})

export default router