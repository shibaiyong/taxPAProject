import { filters, directives } from "./index"

export default{  
  install (Vue, options) {
    Object.keys( directives ).forEach(key => {
      Vue.directive(key, directives[key])
    });
    Object.keys( filters ).forEach(key => {
      Vue.filter(key, filters[key])
    })
  }
}  