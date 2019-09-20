import { filters } from "./index"

export default{  
  install (Vue, options) {
    Vue.directive('has', {
      inserted(el, binding, vnode) {
        // 获取按钮权限
        let { add, edit, remove } = vnode.context.$route.query
        if(binding.value == 'add'&& add == 0){
          el.parentNode.removeChild(el)
        }else if(binding.value == 'edit'&& edit == 0){
          el.parentNode.removeChild(el)
        }else if(binding.value == 'remove'&& remove == 0){
          el.parentNode.removeChild(el)
        }
      }
    })
    Vue.directive('status', {
      bind(el, binding, vonode) {
        if (binding.value.status == 1) {
          el.innerHTML = "停用";
        } else {
          el.innerHTML = "启用";
        }
      },
      inserted(el, binding, vonode) {
        el.onclick = function() {
          if (el.innerHTML == "启用") {
            vonode.context.handleEffect(binding.value.id, 1).then(res => {
              el.innerHTML = "停用";
            });
          } else {
            vonode.context.handleEffect(binding.value.id, 0).then(res => {
              el.innerHTML = "启用";
            });
          }
        };
      }
    })
    Object.keys( filters ).forEach(key => {
      Vue.filter(key, filters[key])
    })
  }
}  