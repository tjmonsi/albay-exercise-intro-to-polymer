class HelloWorld extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this._name = '';
    this._render();    
  }
  
  set name (name) {
    this._name = name;
    this._render();
  }
  
  get name () {
    return this._name;
  }
  
  _render () {
    this.shadowRoot.innerHTML = `
      <style>
        span {
          color: blue;
        }
      </style>
      <span>
        Hello ${this.name}
      </span>
      <slot></slot>
    `;
  }
}

customElements.define('hello-world', HelloWorld);