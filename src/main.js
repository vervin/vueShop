// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Row, Col, Swipe, SwipeItem,Lazyload,Field,stepper,NavBar,List,Tab,Tabs, PullRefresh,Tabbar, TabbarItem} from 'vant'
Vue.use(Button).use(Row).use(Col).use(PullRefresh).use(Tabbar).use(TabbarItem).use(List).use(stepper).use(Swipe).use(SwipeItem).use(Field).use(NavBar).use(Lazyload).use(Tab).use(Tabs);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
