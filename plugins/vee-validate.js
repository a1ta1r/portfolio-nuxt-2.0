import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru'

Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields'
})
Validator.localize('ru', ru)
