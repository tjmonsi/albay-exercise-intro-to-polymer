import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

class ImageCarousel extends PolymerElement {
  static get properties () {
    return {
      selected: {
        type: Object,
        observer: '_selectedChanged'
      }
    };
  }
  
  static get template () {
    return html`
        <!-- Styles MUST be inside template -->
        <style>

          :host {
            display: block;
            position: relative;
            overflow: hidden;
          }

          div > ::slotted(:not([selected])) {
            display: none;
          }

          button {
            position: absolute;
            top: calc(50% - 20px);
            padding: 0;
            line-height: 40px;
            border: none;
            background: none;
            color: #DDD;
            font-size: 40px;
            font-weight: bold;
            opacity: 0.7;
          }

          button:hover,
          button:focus {
            opacity: 1;
          }

          #prevBtn {
            left: 12px;
          }

          #nextBtn {
            right: 12px;
          }

        </style>

        <div>
          <slot></slot>
        </div>


        <button id="prevBtn" on-click="previous">&#x276E;</button>
        <button id="nextBtn" on-click="next">&#x276F;</button>

    `
  }
  
  constructor () {
    super();
    this._interval = null;
    this._boundNext = this.next.bind(this);
  }
  
  connectedCallback () {
    super.connectedCallback();
    
    this._resetSelected();
    this.shadowRoot.addEventListener('slotchange', this._resetSelected.bind(this));
    this._interval = setInterval(this._boundNext, 1000);
  }
  
  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  
  _selectedChanged (selected, oldSelected) {
    if (oldSelected) oldSelected.removeAttribute('selected');
    if (selected) selected.setAttribute('selected', '');
  }
  
  _resetSelected() {
    if (!this.selected || this.selected.parentElement !== this) {
      this.selected = this.firstElementChild;
    }
  }
  
  previous () {
    const elem = this.selected && this.selected.previousElementSibling;
    if (elem) {
      this.selected = elem;
    } else {
      this.selected = this.lastElementChild;
    }
  }

  next () {
    const elem = this.selected && this.selected.nextElementSibling;
    if (elem) {
      this.selected = elem;
    } else {
      this.selected = this.firstElementChild;
    }
  }
  
  
}

customElements.define('image-carousel', ImageCarousel);