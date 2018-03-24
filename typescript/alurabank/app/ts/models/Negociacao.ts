class Negociacao {
  // Estamos "forçando" uma negociação a receber esses tres parâmetros
  constructor (private _data: Date, private _quantidade: number, private _valor: number) {}

  get data (): Date {
    return this._data
  }

  get quantidade (): number {
    return this._quantidade
  }

  get valor (): number {
    return this._valor
  }

  get volume (): number {
    return this._quantidade * this._valor
  }
}
