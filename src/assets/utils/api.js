
export default{  
  install (Vue, options) {  
    Vue.prototype.getPdf = function () {}
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
  }
}  