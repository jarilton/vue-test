import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

const leilao = {
      produto: "Livro de casa do código",
      lanceInicial: 49,
      descricao: "Um maravilhoso livro sobre vue"
}

describe("Um leilão que exibe os dados do produto", () => {
      test("Exibe os dados do leilão no card", () => {

            const wrapper = mount(Leilao, {
                  propsData: {
                        leilao
                  }
            })

            const header = wrapper.find(".card-header").element
            const title = wrapper.find(".card-title").element
            const text = wrapper.find(".card-text").element

            expect(header.textContent).toContain(`Estamos leiloando um(a): ${ leilao.produto }`);
            expect(title.textContent).toContain(`Lance inicial: R$ ${ leilao.lanceInicial }`);
            expect(text.textContent).toContain(leilao.descricao);
      })
})