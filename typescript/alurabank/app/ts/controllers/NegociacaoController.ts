import NegociacoesView from "../views/NegociacoesView"

class NegociacaoController {
  private _inputData: JQuery
  private _inputQuantidade: JQuery
  private _inputValor: JQuery
  private _negociacoes = new Negociacoes()
  private _negociacoesView = new NegociacoesView('#negociacoesView')
  private _mensagemView = new MensagemView('#mensagemView')

  constructor () {
    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')
    this._negociacoesView.update(this._negociacoes)
  }

  adiciona (evento: Event): void {
    evento.preventDefault()
    const negociacao = new Negociacao(
      new Date(this._inputData.val().replace(/-/g, ',')),
      parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val())
    )

    this._negociacoes.adiciona(negociacao)

    this._negociacoesView.update(this._negociacoes)
    this._mensagemView.update('Negociação adicionada com sucesso!')
  }
}