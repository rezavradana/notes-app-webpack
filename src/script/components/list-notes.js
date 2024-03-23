class ListNotes extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: false,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this.render();
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector(".delete")
      .addEventListener("click", (event) => {
        const id = event.target.id;
        this.dispatchEvent(
          new CustomEvent("delete", {
            detail: { id },
            bubbles: true,
          }),
        );
      });

    const btnArchive = this._shadowRoot.querySelector(".archive");
    const btnUnarchive = this._shadowRoot.querySelector(".unarchive");
    if (btnArchive) {
      btnArchive.addEventListener("click", (event) => {
        const id = event.target.id;
        this.dispatchEvent(
          new CustomEvent("archive", {
            detail: { id },
            bubbles: true,
          }),
        );
      });
    } else if (btnUnarchive) {
      btnUnarchive.addEventListener("click", (event) => {
        const id = event.target.id;
        this.dispatchEvent(
          new CustomEvent("unarchive", {
            detail: { id },
            bubbles: true,
          }),
        );
      });
    }
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `        
            :host{                               
                background-color: #9290C3;
                border-radius: 10px;
                box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);                
            }

            div{
                display: flex;
                flex-flow: column nowrap;
                padding: 7px;
            }

            div h3{
                margin-block: 5px;
            }

            div p{
                margin-block: 5px;
            }

            div hr{
                height: 2px;
                background-color: #F8E559;   
                width: 100%;
                border: none;
                border-radius: 5px;
            }
            
            div span{                
                text-align: end;    
                width: fit-content;            
            }       
            
            div .detail{
                padding: 0;
                margin-block: 5px;
                display: flex;  
                flex-flow: row nowrap;
                justify-content: space-between;     
                align-items: center;         
            }

            div .detail button{
                width: fit-content;                          
                border: none;              
                cursor: pointer;
                border-radius: 8px;
                background-color: #F8E559; 
                padding: 5px;           
                font-weight: 600;     
            }

            div .detail .delete:hover{               
                background-color: red;      
                color: #ffff;           
            }

            div .detail .archive:hover{               
                background-color: green;    
                color: #ffff;             
            }

            div .detail .unarchive:hover{               
                background-color: cyan;    
                color: #ffff;             
            }

            div .detail .btn{                
                display: flex;
                flex-flow: row nowrap;
                gap: 5px;
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
    const body = document.createElement("p");
    body.innerText = `${this._note.body}`;
    this._shadowRoot.innerHTML += `
        <div>       
            <div class="content">            
                <h3>${this._note.title}</h3>
                <hr>
                <p>${body.innerHTML}</p>
            </div>     
            <div class="detail">  
                <div class="btn">                                             
                    ${
                      this._note.archived
                        ? `<button class="unarchive" id="${this._note.id}">Unarchive</button>`
                        : `<button class="archive" id="${this._note.id}">Archive</button>`
                    }

                    <button class="delete" id="${this._note.id}">Delete</button>                    
                </div>                         
                <span>${this._note.createdAt}</span>
            </div>
        </div>
        `;
  }
}

customElements.define("list-notes", ListNotes);
