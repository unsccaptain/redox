import Vue from 'vue'
import VueRouter from 'vue-router'
import blankPanel from '../blank.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  components: {
    "blank-panel": blankPanel
  }
}, {
  path: '/bar',
  name: 'About',
  component: {
    template: '<div>bar</div>'
  }
}]

const router = new VueRouter({
  routes
})

export default router