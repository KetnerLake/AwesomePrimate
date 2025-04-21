export default class PrimateLink extends HTMLElement {
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

        :host( [hidden] ) {
          display: none;
        }

        a {
          box-sizing: border-box;
          color: var( --link-color, #0f62fe );
          cursor: var( --link-cursor, pointer );
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: var( --link-font-size, 14px );
          font-style: normal;
          font-weight: var( --link-font-weight, 400 );
          line-height: var( --link-line-height, 18px );
          margin: 0;
          padding: 0;
          text-align: var( --link-text-align, left );
          text-decoration: var( --link-text-decoration, none );   
          text-decoration-thickness: var( --link-decoration-thickness, 0 );          
          text-rendering: optimizeLegibility;            
          text-transform: var( --link-text-transform, none );     
          text-underline-offset: var( --link-text-underline-offset, 0 );
        }

        ape-icon {
          vertical-align: sub;
        }

        :host( [kind=disabled] ) a {
          color: var( --link-disabled-color, #16161640 );
          cursor: var( --link-disabled-cursor, not-allowed );
        }        
        :host( [kind=info] ) a {
          font-weight: 600;
        }                

        :host( [disabled] ) a {
          color: var( --link-disabled-color, #16161640 );
          cursor: var( --link-disabled-cursor, not-allowed );
        }

        :host( [inline] ) a {
          text-decoration: underline;
          text-decoration-thickness: var( --link-decoration-thickness, 1px );                    
          text-underline-offset: var( --link-text-underline-offset, 4px );          
        }

        :host( [size=xs] ) a {
          font-size: 12px;
          line-height: 16px;
        }
        :host( [size=s] ) a {
          font-size: 14px;
          line-height: 18px;
        }
        :host( [size=m] ) a {
          font-size: 16px;
          line-height: 20px;
        }        
        :host( [size=l] ) a {
          font-size: 18px;
          line-height: 22px;
        }        
        :host( [size=xl] ) a {
          font-size: 24px;
          line-height: 30px;
        }
        :host( [size=heading] ) a {
          font-size: 24px;
          line-height: 32px;
        }                

        :host( [weight=bold] ) a {
          font-weight: 600;
        }

        :host( :not( [external] ) ) ape-icon {
          display: none;
        }

        :host( :not( [text] ) ) span {
          display: none;
        }
      </style>
      <a part="link">
        <span></span>
        <slot></slot>
        <ape-icon exportparts="icon" part="external" size="xs"></ape-icon>
      </a>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$anchor = this.shadowRoot.querySelector( 'a' );
    this.$icon = this.shadowRoot.querySelector( 'ape-icon' );        
    this.$text = this.shadowRoot.querySelector( 'span' );    
  }

  // When attributes change
  _render() {
    this.$anchor.href = this.href === null ? '' : this.href;
    this.$text.textContent = this.text === null ? '' : this.text;
    this.$icon.disabled = this.disabled;
    this.$icon.name = this.icon === null ? 'open_in_new' : this.icon;
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
    this._upgrade( 'disabled' );            
    this._upgrade( 'external' );            
    this._upgrade( 'hidden' );    
    this._upgrade( 'href' );
    this._upgrade( 'icon' );    
    this._upgrade( 'inline' );
    this._upgrade( 'kind' );    
    this._upgrade( 'size' );        
    this._upgrade( 'text' );        
    this._upgrade( 'weight' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disabled',
      'external',
      'hidden',
      'href',
      'icon',
      'inline',
      'kind',
      'size',
      'text',
      'weight'
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

  get external() {
    return this.hasAttribute( 'external' );
  }

  set external( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'external' );
      } else {
        this.setAttribute( 'external', '' );
      }
    } else {
      this.removeAttribute( 'external' );
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

  get href() {
    if( this.hasAttribute( 'href' ) ) {
      return this.getAttribute( 'href' );
    }

    return null;
  }

  set href( value ) {
    if( value !== null ) {
      this.setAttribute( 'href', value );
    } else {
      this.removeAttribute( 'href' );
    }
  }
  
  get icon() {
    if( this.hasAttribute( 'icon' ) ) {
      return this.getAttribute( 'icon' );
    }

    return null;
  }

  set icon( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon', value );
    } else {
      this.removeAttribute( 'icon' );
    }
  }

  get inline() {
    return this.hasAttribute( 'inline' );
  }

  set inline( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'inline' );
      } else {
        this.setAttribute( 'inline', '' );
      }
    } else {
      this.removeAttribute( 'inline' );
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
  
  get text() {
    if( this.hasAttribute( 'text' ) ) {
      return this.getAttribute( 'text' );
    }

    return null;
  }

  set text( value ) {
    if( value !== null ) {
      this.setAttribute( 'text', value );
    } else {
      this.removeAttribute( 'text' );
    }
  }         

  get weight() {
    if( this.hasAttribute( 'weight' ) ) {
      return this.getAttribute( 'weight' );
    }

    return null;
  }

  set weight( value ) {
    if( value !== null ) {
      this.setAttribute( 'weight', value );
    } else {
      this.removeAttribute( 'weight' );
    }
  }      
}

window.customElements.define( 'ape-link', PrimateLink );
