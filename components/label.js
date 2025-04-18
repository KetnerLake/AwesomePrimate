export default class PrimateLabel extends HTMLElement {
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

        p {
          box-sizing: border-box;
          color: var( --label-color, #161616 );
          cursor: var( --label-cursor, default );
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: var( --label-font-size, 14px );
          font-style: normal;
          font-weight: var( --label-font-weight, 400 );
          line-height: var( --label-line-height, 18px );
          margin: 0;
          padding: 0;
          text-align: var( --label-text-align, left );
          text-decoration: var( --label-text-decoration, none );     
          text-transform: var( --label-text-transform, none );     
          text-rendering: optimizeLegibility;
        }

        :host( [center] ) p {
          text-align: center;
        }

        :host( [monospace] ) p {
          font-family: 'IBM Plex Mono', sans-serif;          
        }

        :host( [kind=disabled] ) p {
          color: var( --label-disabled-color, #16161640 );
        }        
        :host( [kind=error] ) p {
          color: var( --label-error-color, #da1e28 );
        }
        :host( [kind=link] ) p {
          color: var( --label-link-color, #0f62fe );
        }
        :host( [kind=subtle] ) p {
          color: var( --label-success-color, #525252 );
        }                
        :host( [kind=success] ) p {
          color: var( --label-success-color, #24a148 );
        }        
        :host( [kind=warning] ) p {
          color: var( --label-warning-color, #fddc69 );
        }                

        :host( [disabled] ) p {
          color: var( --label-disabled-color, #16161640 );
        }

        :host( [size=xs] ) p {
          font-size: 12px;
          line-height: 16px;
        }
        :host( [size=s] ) p {
          font-size: 14px;
          line-height: 18px;
        }
        :host( [size=m] ) p {
          font-size: 16px;
          line-height: 20px;
        }        
        :host( [size=l] ) p {
          font-size: 18px;
          line-height: 22px;
        }        
        :host( [size=xl] ) p {
          font-size: 24px;
          line-height: 30px;
        }
        :host( [size=heading] ) p {
          font-size: 24px;
          line-height: 32px;
        }                

        :host( [weight=bold] ) p {
          font-weight: 600;
        }

        :host( [truncate] ) {
          overflow: hidden;
        }

        :host( [truncate] ) p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        :host( :not( [text] ) ) span {
          display: none;
        }

        ::slotted( strong ) {
          font-weight: 600;
        }
      </style>
      <p part="content">
        <span></span>
        <slot></slot>
      </p>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$inline = this.shadowRoot.querySelector( 'span' );
  }

  // When attributes change
  _render() {
    this.$inline.textContent = this.text === null ? '' : this.text;
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
    this._upgrade( 'disabled' );            
    this._upgrade( 'hidden' );    
    this._upgrade( 'kind' );      
    this._upgrade( 'monospace' );          
    this._upgrade( 'size' );  
    this._upgrade( 'text' );              
    this._upgrade( 'truncate' );    
    this._upgrade( 'weight' );      
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'center',
      'disabled',
      'hidden',
      'kind',
      'monospace',
      'size',
      'text',
      'truncate',
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

  get monospace() {
    return this.hasAttribute( 'monospace' );
  }

  set monospace( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'monospace' );
      } else {
        this.setAttribute( 'monospace', '' );
      }
    } else {
      this.removeAttribute( 'monospace' );
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

  get truncate() {
    return this.hasAttribute( 'truncate' );
  }

  set truncate( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'truncate' );
      } else {
        this.setAttribute( 'truncate', '' );
      }
    } else {
      this.removeAttribute( 'truncate' );
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

window.customElements.define( 'ape-label', PrimateLabel );
