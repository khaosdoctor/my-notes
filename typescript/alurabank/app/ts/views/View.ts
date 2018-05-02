abstract class View<T> {

  private _elemento: Element

  constructor (selector: string) {
    this._elemento = document.querySelector(selector)
  }

  update (model: T): void {
    this._elemento.innerHTML = this.template(model)
  }

  abstract template (model: T): string
}