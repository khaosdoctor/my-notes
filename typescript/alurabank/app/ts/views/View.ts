abstract class View<T> {

  private _elemento: JQuery

  constructor (selector: string) {
    this._elemento = $(selector)
  }

  update (model: T): void {
    this._elemento.html(this.template(model))
  }

  abstract template (model: T): string
}