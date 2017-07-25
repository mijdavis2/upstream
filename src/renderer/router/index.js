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
      path: '/new',
      name: 'new',
      component: require('@/components/NewReportSetup')
    },
    {
      path: '/report',
      name: 'report',
      component: require('@/components/Report')
    },
    {
      path: '/load',
      name: 'load',
      component: require('@/components/Load')
    },
    {
      path: '/config',
      name: 'config',
      component: require('@/components/Config'),
      children: [
        { path: '', redirect: 'sites' },
        { path: 'sites', component: require('@/components/Config/Sites') },
        { path: 'email', component: require('@/components/Config/Email') }
      ]
    }
  ]
})
