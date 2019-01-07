import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import locale from 'element-ui/lib/locale/lang/ru-RU'

export default () => {
  Vue.use(Element, { locale })
}
