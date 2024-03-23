class SectionShowNotes extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this.render();
  }

  connectedCallback() {
    const archive = this._shadowRoot.querySelector(".archive");
    const notes = this._shadowRoot.querySelector(".notes");

    archive.addEventListener("click", () => {
      archive.classList.add("active");
      notes.classList.remove("active");
      this.dispatchEvent(new CustomEvent("archived"));
    });

    notes.addEventListener("click", () => {
      notes.classList.add("active");
      archive.classList.remove("active");
      this.dispatchEvent(new CustomEvent("notes"));
    });

    this.addEventListener("remove-notes", () => {
      notes.dispatchEvent(new Event("click"));
    });

    this.addEventListener("submit-notes", (event) => {
      const { resultObjNotes } = event.detail;
      console.log(resultObjNotes);
      notes.classList.add("active");
      archive.classList.remove("active");
      this.dispatchEvent(
        new CustomEvent("render-submit-notes", {
          detail: { resultObjNotes },
          bubbles: true,
        }),
      );
    });
  }

  _updateStyle() {
    this._style.textContent = `
        :host{            
            width: 100%;
            display: flex;
            flex-flow: column nowrap;            
        }

        nav{        
            padding-inline: 10px;          
        }

        nav ul{
            display: flex;
            flex-flow: row nowrap;
            gap: 1rem;
            list-style-type: none;     
            padding: 0;      
        }

        nav ul li{            
            font-weight: 600;
            letter-spacing: 1px;
            text-decoration: none;
            margin-inline: 5px;
            border-bottom: 3px solid transparent;
            cursor: pointer;            
        }

        nav ul li.active{            
            border-bottom-color: #F8E559;
        }

        .list-notes{
            padding: 10px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            column-gap: 1rem; 
            row-gap: 1rem;     
        }

        @media screen and (max-width: 650px) {            
            div{
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }  
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
            <nav>
                <ul>
                    <li class="active notes">Notes</li>
                    <li class="archive">Archive</li>
                </ul>
            </nav>          
            <div class="list-notes">
                <slot></slot>
            </div>
        `;
  }
}

customElements.define("section-show-notes", SectionShowNotes);
