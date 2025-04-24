export default class PrimateButton extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-block;
          position: relative;
        }

        :host( [grow] ) {
          flex-basis: 0;
          flex-grow: 1;
        }

        :host( [hidden] ) {
          display: none;
        }

        button {
          align-items: center;
          appearance: none;
          background: none;
          border: none;
          border: solid 1px #d4d4d8;
          border-radius: 4px;
          box-sizing: border-box;
          color: #3f3f46;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;          
          height: 40px;
          justify-content: center;
          margin: 0;
          outline: none;
          padding: 0 16px 0 16px;
          width: 100%;
        }

        button:active,
        button:hover {
          background: #f0f9ff;
          border-color: #7dd3fc;
          color: #0369a1;
        }

        :host( [kind=primary] ) button {
          background: #0284c7;
          border-color: #0284c7;
          color: #ffffff;
        }
        :host( [kind=primary] ) button:hover {
          background: #0ea5e9;
          border-color: #0ea5e9;
        }        
        :host( [kind=success] ) button {
          background: #16a34a;
          border-color: #16a34a;          
          color: #ffffff;
        }
        :host( [kind=success] ) button:hover {
          background: #22c55e;
          border-color: #22c55e;
        }
        :host( [kind=neutral] ) button {
          background: #52525b;
          border-color: #52525b;          
          color: #ffffff;
        }
        :host( [kind=neutral] ) button:hover {
          background: #71717a;
          border-color: #71717a;
        }
        :host( [kind=warning] ) button {
          background: #d97706;
          border-color: #d97706;          
          color: #ffffff;
        }
        :host( [kind=warning] ) button:hover {
          background: #f59e0b;
          border-color: #f59e0b;
        }
        :host( [kind=danger] ) button {
          background: #dc2626;
          border-color: #dc2626;          
          color: #ffffff;
        }
        :host( [kind=danger] ) button:hover {
          background: #ef4444;
          border-color: #ef4444;
        }                                        

        :host( [kind=text] ) button {
          background: none;
          border: none;
          color: #0284c7;
        }
        :host( [kind=text] ) button:hover {
          color: #0ea5e9;
        }        

        :host( [size=s] ) button {
          font-size: 12px;
          height: 30px;
          padding: 0 12px 0 12px;
        }
        :host( [size=l] ) button {
          font-size: 16px;
          height: 48px;
          padding: 0 20px 0 20px;
        }

        :host( [outline] ) button {
          background: none;
        }
        :host( [outline]:not( [kind] ) ) button:hover {
          background: #0284c7;
          border-color: #0284c7;
          color: #ffffff;
        }
        :host( [outline][kind=primary] ) button {
          border-color: #0284c7;
          color: #0284c7;                    
        }
        :host( [outline][kind=primary] ) button:hover {
          background: #0284c7;
          color: #ffffff;
        }
        :host( [outline][kind=success] ) button {
          border-color: #16a34a;
          color: #16a34a;                    
        }
        :host( [outline][kind=success] ) button:hover {
          background: #16a34a;
          color: #ffffff;
        }              
        :host( [outline][kind=neutral] ) button {
          border-color: #52525b;
          color: #52525b;                    
        }
        :host( [outline][kind=neutral] ) button:hover {
          background: #52525b;
          color: #ffffff;
        }            
        :host( [outline][kind=warning] ) button {
          border-color: #d97706;
          color: #d97706;                    
        }
        :host( [outline][kind=warning] ) button:hover {
          background: #d97706;
          color: #ffffff;
        }           
        :host( [outline][kind=danger] ) button {
          border-color: #dc2626;
          color: #dc2626;                    
        }
        :host( [outline][kind=danger] ) button:hover {
          background: #dc2626;
          color: #ffffff;
        }                              

        :host( [pill][size=s] ) button {
          border-radius: 15px;
        }
        :host( [pill]:not( [size] ) ) button {
          border-radius: 20px;
        }        
        :host( [pill][size=l] ) button {
          border-radius: 24px;
        }        
        
        :host( [circle][size=s] ) button {
          border-radius: 15px;
          padding: 0;
          width: 30px;
        }
        :host( [circle]:not( [size] ) ) button {
          border-radius: 20px;
          padding: 0;
          width: 40px;
        }
        :host( [circle][size=l] ) button {
          border-radius: 24px;
          padding: 0;
          width: 48px;
        }

        :host( :not( [caret] ) ) ape-icon {
          display: none;
        }
        :host( [caret] ) button:hover ape-icon {
          --icon-color: #0284c7;
        }
        :host( [caret]:not( [size] ) ) ape-icon {
          padding: 0 0 0 9px;          
        }
        :host( [caret]:not( [size] ) ) button {
          padding: 0 9px 0 16px;
        }
        :host( [caret][size=s] ) ape-icon {
          padding: 0 0 0 3px;          
        }        
        :host( [caret][size=s] ) button {
          padding: 0 4px 0 12px;          
        }
        :host( [caret][size=l] ) ape-icon {
          padding: 0 0 0 9px;          
        }        
        :host( [caret][size=l] ) button {
          padding: 0 10px 0 20px;          
        }                

        :host( [disabled] ) button {
          border-color: #d4d4d8;
          cursor: not-allowed;          
          opacity: 0.50;
        }
        :host( [disabled] ) button:hover {        
          background: none;
          color: #3f3f46;
        }
        :host( [disabled][kind] ) button,
        :host( [disabled][kind] ) button:hover {
          color: #ffffff;
        }
        :host( [disabled][kind=primary] ) button {        
          border-color: #0284c7;          
        }
        :host( [disabled][kind=primary] ) button:hover {        
          background: #0284c7;
          border-color: #0284c7;
        }
        :host( [disabled][kind=success] ) button {        
          border-color: #16a34a;          
        }                
        :host( [disabled][kind=success] ) button:hover {        
          background: #16a34a;
          border-color: #16a34a;
        }                
        :host( [disabled][kind=neutral] ) button {        
          border-color: #52525b;          
        }                        
        :host( [disabled][kind=neutral] ) button:hover {        
          background: #52525b;
          border-color: #52525b;
        }
        :host( [disabled][kind=warning] ) button {        
          border-color: #d97706;          
        }                                
        :host( [disabled][kind=warning] ) button:hover {        
          background: #d97706;
          border-color: #d97706;
        }
        :host( [disabled][kind=danger] ) button {        
          border-color: #dc2626;          
        }                                        
        :host( [disabled][kind=danger] ) button:hover {        
          background: #dc2626;
          border-color: #dc2626;
        }            
        
        :host( :not( [label] ) ) span {
          display: none;
        }
      </style>
      <button part="button" type="button">
        <slot name="prefix"></slot>
        <span></span>
        <slot></slot>
        <slot name="suffix"></slot>
        <ape-icon exportparts="icon" name="arrow_drop_down" part="caret"></ape-icon>   
      </button>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$label = this.shadowRoot.querySelector( 'span' );
  }

  // When attributes change
  _render() {
    this.$button.disabled = this.disabled;
    this.$label.textContent = this.text === null ? '' : this.text;  
  }

  // Promote properties
  // Values may be set before module load
  _upgrade( property ) {
    if( this.hasOwnProperty( property ) ) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }
  }

  // Setup
  connectedCallback() {
    this._upgrade( 'caret' );            
    this._upgrade( 'circle' );            
    this._upgrade( 'disabled' );            
    this._upgrade( 'grow' );        
    this._upgrade( 'hidden' );    
    this._upgrade( 'kind' );                
    this._upgrade( 'label' );    
    this._upgrade( 'outline' );    
    this._upgrade( 'pill' );    
    this._upgrade( 'size' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'caret',
      'circle',
      'disabled',
      'grow',
      'hidden',
      'kind',
      'label',
      'outline',
      'pill',
      'size'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get caret() {
    return this.hasAttribute( 'caret' );
  }

  set caret( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'caret' );
      } else {
        this.setAttribute( 'caret', '' );
      }
    } else {
      this.removeAttribute( 'caret' );
    }
  }

  get circle() {
    return this.hasAttribute( 'circle' );
  }

  set circle( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'circle' );
      } else {
        this.setAttribute( 'circle', '' );
      }
    } else {
      this.removeAttribute( 'circle' );
    }
  }

  get disabled() {
    return this.hasAttribute( 'disabled' );
  }

  set disabled( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disabled' );
      } else {
        this.setAttribute( 'disabled', '' );
      }
    } else {
      this.removeAttribute( 'disabled' );
    }
  }

  get grow() {
    return this.hasAttribute( 'grow' );
  }

  set grow( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'grow' );
      } else {
        this.setAttribute( 'grow', '' );
      }
    } else {
      this.removeAttribute( 'grow' );
    }
  }  

  get hidden() {
    return this.hasAttribute( 'hidden' );
  }

  set hidden( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hidden' );
      } else {
        this.setAttribute( 'hidden', '' );
      }
    } else {
      this.removeAttribute( 'hidden' );
    }
  }   

  get kind() {
    if( this.hasAttribute( 'kind' ) ) {
      return this.getAttribute( 'kind' );
    }

    return null;
  }

  set kind( value ) {
    if( value !== null ) {
      this.setAttribute( 'kind', value );
    } else {
      this.removeAttribute( 'kind' );
    }
  }  

  get label() {
    if( this.hasAttribute( 'label' ) ) {
      return this.getAttribute( 'label' );
    }

    return null;
  }

  set label( value ) {
    if( value !== null ) {
      this.setAttribute( 'label', value );
    } else {
      this.removeAttribute( 'label' );
    }
  }    

  get outline() {
    return this.hasAttribute( 'outline' );
  }

  set outline( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'outline' );
      } else {
        this.setAttribute( 'outline', '' );
      }
    } else {
      this.removeAttribute( 'outline' );
    }
  }
  
  get pill() {
    return this.hasAttribute( 'pill' );
  }

  set pill( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'pill' );
      } else {
        this.setAttribute( 'pill', '' );
      }
    } else {
      this.removeAttribute( 'pill' );
    }
  }  

  get size() {
    if( this.hasAttribute( 'size' ) ) {
      return this.getAttribute( 'size' );
    }

    return null;
  }

  set size( value ) {
    if( value !== null ) {
      this.setAttribute( 'size', value );
    } else {
      this.removeAttribute( 'size' );
    }
  }  
}

window.customElements.define( 'ape-button', PrimateButton );
