



import Vue from 'vue'
import VueRouter from 'vue-router'

import main from '../views/main.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: "mv"
    }
  },
  {
    path: "/main",
    name: 'main',
    component: main,
    children: [
      {
        path: 'mv',
        name: 'mv',
        component: () => import('@/views/mv.vue')
      },
      {
        path: 'mh',
        name: 'mh',
        component: () => import('@/views/mh.vue')
      },
      {
        path: 'mn',
        name: 'mn',
        component: () => import('@/views/mn.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my.vue'),

      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/setinfo',
    name: 'setinfo',
    component: () => import('@/views/setinfo.vue'),
  },
  {
    path: '/idea',
    name: 'idea',
    component: () => import('@/views/idea.vue'),
  },
  {
    path: '/setpwd',
    name: 'setpwd',
    component: () => import('@/views/setpwd.vue'),
  },
  {
    path: '/mvorder',
    name: 'mvorder',
    component: () => import('@/views/mvorder.vue'),
  },
  {
    path: '/shoporder',
    name: 'shoporder',
    component: () => import('@/views/shoporder.vue'),
  },
  {
    path: '/myinfo',
    name: 'myinfo',
    component: () => import('@/views/myinfo.vue'),
  },
  {
    path: '/setname',
    name: '/setname',
    component: () => import('@/views/setname.vue')
  },
  {
    path: '/mvlist',
    name: 'mvlist',
    component: () => import('@/views/mvlist.vue')
  },
  {
    path: '/cinemas',
    name: 'cinemas',
    component: () => import('@/views/cinemas.vue')
  },
  {
    path: '**',
    redirect: {
      name: 'mv'
    }
  },
]

const router = new VueRouter({
  routes,
})

export default router
