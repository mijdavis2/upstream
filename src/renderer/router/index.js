import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage')
    },
    {
      path: '/sfcalc',
      name: 'streamflow-calculator',
      component: require('@/components/StreamflowCalculator')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
