import FroalaEditor from './froala-editor.vue'

const feditor = {
  install: function (Vue) {
    Vue.component('feditor', FroalaEditor)
  }
}

export default feditor
