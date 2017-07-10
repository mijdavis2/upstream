import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage')
    },
    {
      path: '/start',
      name: 'start',
      component: require('@/components/NewReportSetup')
    },
    {
      path: '/report',
      name: 'report',
      component: require('@/components/Report')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
