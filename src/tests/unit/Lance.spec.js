import Lance from "@/components/Lance" 
import { mount } from "@vue/test-utils"

test('Não aceita lance com valor menor do que zero', () => {
      const wrapper = mount(Lance)
      const input = wrapper.find("input")
      input.setValue(-100)
      const lancesEmitidos = wrapper.emitted("novo-lance")
      wrapper.trigger("submit")
      expect(lancesEmitidos).toBeUndefined()
})

test('Emite um lance quando o valor for maior do que zero', () => {
      const wrapper = mount(Lance)
      const input = wrapper.find("input")
      input.setValue(100)
      wrapper.trigger("submit")
      const lancesEmitidos = wrapper.emitted("novo-lance")
      expect(lancesEmitidos).toHaveLength(1)

      console.log("lancesEmitidos",lancesEmitidos)
})