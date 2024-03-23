class Appbar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `        
        :host{
            width: 100%;
            text-align: center;
            background-color: #070F2B;
            color: #F8E559;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .appBar-title h2{                                  
            letter-spacing: 2px;
        }
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.append(this._style);
    this._shadowRoot.innerHTML += `
            <div class="appBar-title">
                <h2>Notes App</h2>
            </div>
        `;
  }
}

customElements.define("app-bar", Appbar);
