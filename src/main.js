import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

const form = document.querySelector('#form');
const helloWorld = document.querySelector('#hello');
form.addEventListener('submit', event => {  
  event.preventDefault();
  helloWorld.name = form.variableone.value;
});

class HelloWorld extends PolymerElement {
  static get properties () {
    return {
      name: {
        type: String
      }
    }
  }
  
  static get template () {
    return html`
      <style>
        span {
          color: blue;
        }
      </style>
      <span>
        Hello [[name]]
      </span>
      <slot></slot>
    `
  }
}

customElements.define('hello-world', HelloWorld);