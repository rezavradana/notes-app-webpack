class FormNotes extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => {
        this._addListNote(event);
      });

    this._shadowRoot.querySelector("#title").addEventListener("blur", () => {
      this._validationNote("validation");
    });

    this._shadowRoot.querySelector("#notes").addEventListener("blur", () => {
      this._validationNote("validation");
    });
  }

  _validationNote(nameEvent) {
    const form = this._shadowRoot.querySelector("form");
    this.dispatchEvent(
      new CustomEvent(nameEvent, {
        detail: { form },
        bubbles: true,
      }),
    );
  }

  _addListNote(event) {
    event.preventDefault();
    const titleNote = this._shadowRoot.querySelector("#title").value;
    const bodyNote = this._shadowRoot.querySelector("#notes").value;

    this.dispatchEvent(
      new CustomEvent("submit", {
        detail: { titleNote, bodyNote },
        bubbles: true,
      }),
    );
  }

  _updateStyle() {
    this._style.textContent = `
        :host{
            display: flex;
            flex-flow: column nowrap;
            gap: 1rem;
            width: fit-content;            
            height: fit-content;
            position: sticky;
            top: 0;    
            color: #F8E559                  
        }

        form{
            margin-block: 1rem;
        }
        
        button{
            border-radius: 10px;
            border: none;
            padding: 10px;
            cursor: pointer;
            background-color: #F8E559;
            color: #1B1A55;
            width: 100%;
            font-weight: bolder;
            border: 1px solid #F8E559;            
        }
        
        button:hover{
            background-color: #ffff;
            color: #F8E559;
        }
        
        .add-notes{
            display: flex;
            flex-flow: column nowrap;
            gap: 5px;               
        }
        
        .add-notes input{
            padding: 8px;   
            border-radius: 10px;   
            border: 1px solid black;   
            background-color: #535C91;
            border:none;
            outline: none;
            color: #ffff;
        }
        
        .add-notes textarea{
            border-radius: 10px;            
            padding: 8px;
            height: 300px;
            width: 250px;
            resize: none;
            font-family: 'Rubik', sans-serif;
            background-color: #535C91;
            border: none;
            outline: none;
            color: #ffff;
        }
        
        .add-notes .validation-message{
            color: red;
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
        <form>
            <div class="add-notes">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" required autocomplete="title" aria-describedby="titleNoteValidation">                              
                <p id="titleNoteValidation" class="validation-message" aria-live="polite"></p>
            </div>

            <div class="add-notes">
                <label for="notes">Notes</label>
                <textarea name="notes" id="notes" required maxlength="500" aria-describedby="bodyNoteValidation"></textarea></textarea>
                                            
                <p id="bodyNoteValidation" class="validation-message" aria-live="polite"></p>
            </div>
            <button>Add Note</button>
        </form>
        `;
  }
}

customElements.define("form-notes", FormNotes);
