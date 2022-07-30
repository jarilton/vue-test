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
})

test('Emite o valor esperado de um lance válido', () => {
      const wrapper = mount(Lance)
      const input = wrapper.find("input")
      input.setValue(100)
      wrapper.trigger("submit")
      const lancesEmitidos = wrapper.emitted("novo-lance")

      const lances = parseInt(lancesEmitidos, [0][0])
      expect(lances).toBe(100)
})

describe("Um lance com valor minimo", () => {
      test("Todos os lances devem possuir um valor maior que o valor minimo informado", () => {
            const wrapper = mount(Lance, {
                  propsData: {
                        lanceMinimo: 300,
                  }
            })
            const input = wrapper.find("input")
            input.setValue(400)
            wrapper.trigger("submit")
            const lancesEmitidos = wrapper.emitted("novo-lance")
            expect(lancesEmitidos).toHaveLength(1)
      })

      test("Emite o valor esperado de um lance válido", () => {
            const wrapper = mount(Lance, {
                  propsData: {
                        lanceMinimo: 300,
                  }
            })
            const input = wrapper.find("input")
            input.setValue(400)
            wrapper.trigger("submit")
            const lancesEmitidos = wrapper.emitted("novo-lance")
            
            const valorDoLance  = parseInt(lancesEmitidos[0][0])
            expect(valorDoLance).toBe(400)
      })
})