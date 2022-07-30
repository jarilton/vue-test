import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
      produto: "Livro da casa do código",
      lanceInicial: 50,
      descricao: "Livro sobre vue"
}

const lances = [
      {
            "id": 1,
            "valor": 1001,
            "data": "2020-06-13T18:04:26.826Z",
            "leilao_id": 1
      },
      {
            "valor": 1005,
            "data": "2020-06-13T18:04:26.826Z",
            "leilao_id": 1,
            "id": 2
      },
      {
            "valor": 1099,
            "data": "2020-06-13T18:19:44.871Z",
            "leilao_id": 1,
            "id": 3
      },
]

describe("Leiloeiro inicia um leilão que não possui lances", () => {
      test("Avisa quando não exista lances", async () => {

            getLeilao.mockResolvedValueOnce(leilao)
            getLances.mockResolvedValueOnce([])

            const wrapper = mount(Leiloeiro, {
                  propsData: {
                        id: 1
                  }
            })

            await flushPromises()
            const alert = wrapper.find(".alert-dark")
            expect(alert.exists()).toBe(true)
      })
})

describe("Um leiloeiro exibe os lances existentes", () => {
      test("Não mostra o aviso de 'sem lances'", async () => {
            getLeilao.mockResolvedValueOnce(leilao)
            getLances.mockResolvedValueOnce(lances)

            const wrapper = mount(Leiloeiro, {
                  propsData: {
                        id: 1
                  }
            })

            await flushPromises()
            const alert = wrapper.find(".alert-dark")
            expect(alert.exists()).toBe(false)
      })

      test("Possui uma lista de lances", async () => {
            getLeilao.mockResolvedValueOnce(leilao)
            getLances.mockResolvedValueOnce(lances)

            const wrapper = mount(Leiloeiro, {
                  propsData: {
                        id: 1
                  }
            })

            await flushPromises()
            const alert = wrapper.find(".list-inline")
            expect(alert.exists()).toBe(true)
      })
})

describe("Um leiloeiro comunica os valores de menor e maior lance", () => {
      test("Mostra o maior lance daquele leião", async () => {
            getLeilao.mockResolvedValueOnce(leilao)
            getLances.mockResolvedValueOnce(lances)

            const wrapper = mount(Leiloeiro, {
                  propsData: {
                        id: 1
                  }
            })

            await flushPromises()
            const maiorLance = wrapper.find(".maior-lance")
            expect(maiorLance.element.textContent).toContain("Maior lance: R$ 1099")
      })

      test("Mostra o menor lance daquele leião", async () => {
            getLeilao.mockResolvedValueOnce(leilao)
            getLances.mockResolvedValueOnce(lances)

            const wrapper = mount(Leiloeiro, {
                  propsData: {
                        id: 1
                  }
            })

            await flushPromises()
            const menorLance = wrapper.find(".menor-lance")
            expect(menorLance.element.textContent).toContain("Menor lance: R$ 1001")
      })
}) 