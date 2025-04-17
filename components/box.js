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
        
        :host( [center] ) div {
          align-items: center;
        }

        :host( [direction=column] ) div {
          flex-direction: column;
        }
        :host( [direction=column-reverse] ) div {
          flex-direction: column-reverse;
        }        
        :host( [direction=row-reverse] ) div {
          flex-direction: row-reverse;
        }             

        :host( [gap=xs] ) div {
          gap: 2px;
        }
        :host( [gap=s] ) div {
          gap: 4px;
        }       
        :host( [gap=m] ) div {
          gap: 8px;
        }       
        :host( [gap=l] ) div {
          gap: 16px;
        }        
        :host( [gap=xl] ) div {
          gap: 32px;
        }             
        
        :host( [grow] ) {
          flex-basis: 0;
          flex-grow: 1;
        }        

        :host( [hidden] ) {
          display: none;
        }

        :host( [justify] ) div {
          justify-content: center;
        }
        
        :host( :not( [label] ) ) ape-label {
          display: none;
        }

        div {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;        
          height: 100%;
          width: 100%;
        }
      </style>
      <ape-label exportparts="content" part="label"></ape-label>
      <div part="box">
        <slot></slot>
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$label = this.shadowRoot.querySelector( 'ape-label' );
  }

  // When attributes change
  _render() {
    this.$label.textContent = this.label === null ? '' : this.label;
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
    this._upgrade( 'center' );      
    this._upgrade( 'direction' );      
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
      'center',
      'direction',
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
