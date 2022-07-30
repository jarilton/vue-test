import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock("@/http")

const leiloes = [
      {
            "produto": "Livro da Casa do Código",
            "descricao": "Um livro super completo, sobre um assunto incrível.",
            "lanceInicial": 500
      },
      {
            "produto": "Ebook da Casa do Código",
            "descricao": "Um livro com um conteúdo muito interessante sobre VueJS",
            "lanceInicial": "500",
      },
]

describe("Um avaliador que se conecta com a API", () => {
      test("Garantir que mostra todos os leilões retornados pela API", async () => {
            getLeiloes.mockResolvedValueOnce(leiloes)

            const wrapper = mount(Avaliador, {
                  stubs: {
                        RouterLink: RouterLinkStub
                  }
            })
            await flushPromises()
            const totalLeiloesExibidos = wrapper.findAll(".leilao").length

            expect(totalLeiloesExibidos).toBe(leiloes.length)
      })

      test("Não possui leilões retornados pela API", async () => {
            getLeiloes.mockResolvedValueOnce([])

            const wrapper = mount(Avaliador, {
                  stubs: {
                        RouterLink: RouterLinkStub
                  }
            })
            await flushPromises()
            const totalLeiloesExibidos = wrapper.findAll(".leilao").length

            expect(totalLeiloesExibidos).toBe(0)
      })
})