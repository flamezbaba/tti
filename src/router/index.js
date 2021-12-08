import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Landing from "@/views/Landing.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import Deposit from "@/views/Deposit.vue";
import Investments from "@/views/Investments.vue";
import Bonus from "@/views/Bonus.vue";

import firebase from "firebase/app";
import "firebase/auth";

function authGuard(to, from, next){
  if(firebase.auth().currentUser){
    // console.log(firebase.auth().currentUser.uid);
    next();
  }
  else{
    console.log("Not Logged In");
    next('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/landing', name: 'Landing', component: Landing },
  { path: '/register/:username?', name: 'Register', component: Register },
    
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, beforeEnter: authGuard },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/profile', name: 'Profile', component: Profile, beforeEnter: authGuard },
  { path: '/deposit', name: 'Deposit', component: Deposit, beforeEnter: authGuard },
  { path: '/investments', name: 'Investments', component: Investments, beforeEnter: authGuard },
  { path: '/bonus', name: 'Bonus', component: Bonus, beforeEnter: authGuard },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes
})

export default router
