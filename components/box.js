import PrimateLabel from "./label.js";

export default class PrimateBox extends HTMLElement {
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
        
        :host( [center] ) div[part=box] {
          align-items: center;
        }

        :host( [direction=column] ) div[part=box] {
          flex-direction: column;
        }
        :host( [direction=column-reverse] ) div[part=box] {
          flex-direction: column-reverse;
        }        
        :host( [direction=row-reverse] ) div[part=box] {
          flex-direction: row-reverse;
        }             

        :host( [gap=xs] ) div[part=box] {
          gap: 2px;
        }
        :host( [gap=s] ) div[part=box] {
          gap: 4px;
        }       
        :host( [gap=m] ) div[part=box] {
          gap: 8px;
        }       
        :host( [gap=l] ) div[part=box] {
          gap: 16px;
        }        
        :host( [gap=xl] ) div[part=box] {
          gap: 32px;
        }             
        
        :host( [grow] ) {
          flex-basis: 0;
          flex-grow: 1;
        }        

        :host( [hidden] ) {
          display: none;
        }

        :host( [justify] ) div[part=box] {
          justify-content: center;
        }
        
        :host( :not( [label] ) ) ape-label {
          display: none;
        }

        ape-label {
          flex-basis: 0;
          flex-grow: 1;
        }

        div[part=box] {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;        
          height: 100%;
          width: 100%;
        }

        div[part=group] {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;    
          width: 100%;    
        }        

        :host( [card] ) div[part=box] {
          background: var( --box-background, #ffffff );
          border-color: var( --box-border-color, #161616 );
          border-style: var( --box-border-style, solid );
          border-width: var( --box-border-width, 1px );
          border-radius: var( --box-border-radius, 4px );
        }

        :host( [fill] ) div[part=box] { 
          background: var( --box-background, #ffffff );
        }        
      </style>
      <div part="group">
        <ape-label exportparts="content" part="label"></ape-label>      
        <slot name="prefix"></slot>
      </div>
      <div part="box">
        <slot></slot>
      </div>
      <slot name="suffix"></slot>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$label = this.shadowRoot.querySelector( 'ape-label' );
  }

  // When attributes change
  _render() {
    this.$label.disabled = this.disabled;
    this.$label.textContent = this.label === null ? '' : this.label;

    for( let c = 0; c < this.children.length; c++ ) {
      this.children[c].disabled = this.disabled;
    }
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
    this._upgrade( 'card' );            
    this._upgrade( 'center' );      
    this._upgrade( 'direction' );      
    this._upgrade( 'disabled' );        
    this._upgrade( 'fill' );        
    this._upgrade( 'gap' );        
    this._upgrade( 'grow' );            
    this._upgrade( 'hidden' );  
    this._upgrade( 'justify' );  
    this._upgrade( 'label' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'card',  
      'center',
      'direction',
      'disabled',
      'fill',
      'gap',
      'grow',
      'hidden',      
      'justify',
      'label'
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
  get card() {
    return this.hasAttribute( 'card' );
  }

  set card( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'card' );
      } else {
        this.setAttribute( 'card', '' );
      }
    } else {
      this.removeAttribute( 'card' );
    }
  }

  get center() {
    return this.hasAttribute( 'center' );
  }

  set center( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'center' );
      } else {
        this.setAttribute( 'center', '' );
      }
    } else {
      this.removeAttribute( 'center' );
    }
  }

  get direction() {
    if( this.hasAttribute( 'direction' ) ) {
      return this.getAttribute( 'direction' );
    }

    return null;
  }

  set direction( value ) {
    if( value !== null ) {
      this.setAttribute( 'direction', value );
    } else {
      this.removeAttribute( 'direction' );
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

  get fill() {
    return this.hasAttribute( 'fill' );
  }

  set fill( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'fill' );
      } else {
        this.setAttribute( 'fill', '' );
      }
    } else {
      this.removeAttribute( 'fill' );
    }
  }  

  get gap() {
    if( this.hasAttribute( 'gap' ) ) {
      return this.getAttribute( 'gap' );
    }

    return null;
  }

  set gap( value ) {
    if( value !== null ) {
      this.setAttribute( 'gap', value );
    } else {
      this.removeAttribute( 'gap' );
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

  get justify() {
    return this.hasAttribute( 'justify' );
  }

  set justify( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'justify' );
      } else {
        this.setAttribute( 'justify', '' );
      }
    } else {
      this.removeAttribute( 'justify' );
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
}

window.customElements.define( 'ape-box', PrimateBox );
