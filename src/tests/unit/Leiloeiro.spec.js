import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'

jest.mock('@/http')

const leilao = {
      produto: "Livro da casa do código",
      lanceInicial: 50,
      descricao: "Livro sobre vue"
}

describe("Leiloeiro inicia um leilão que não possui lances", () => {
      test("Avisa quando não exista lances", () => {
            
            getLeilao.mockResolvedValueOnce(leilao)
            getLances.mockResolvedValueOnce([])

            const wrapper = mount(Leiloeiro, {
                  propsData: {
                        id: 1
                  }
            })

            const alert = wrapper.find(".alert-dark")

            expect(alert.exists()).toBe(true)
      })
})