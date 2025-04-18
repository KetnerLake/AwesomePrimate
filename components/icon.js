export default class PrimateIcon extends HTMLElement {
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

        i {
          box-sizing: border-box;
          color: var( --icon-color, #161616 );
          cursor: var( --icon-cursor, default );
          direction: ltr;
          display: flex;
          font-family: 'Material Symbols Outlined';
          font-size: var( --icon-size, 20px );
          font-style: normal;
          font-weight: normal;
          height: var( --icon-size, 20px );
          letter-spacing: normal;
          line-height: var( --icon-size, 20px );
          margin: 0;
          max-height: var( --icon-size, 20px );
          max-width: var( --icon-size, 20px );
          min-height: var( --icon-size, 20px );
          min-width: var( --icon-size, 20px );
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;
          text-transform: none;
          white-space: nowrap;
          width: var( --icon-size, 20px );
          word-wrap: normal;  
        }

        img {
          height: 20px;
          max-height: 20px;
          max-width: 20px;
          min-height: 20px;
          min-width: 20px;
          object-fit: contain;
          width: 20px;
        }

        :host( [kind=disabled] ) i {
          color: var( --icon-disabled-color, #16161640 );
        }        
        :host( [kind=error] ) i {
          color: var( --icon-error-color, #da1e28 );
        }
        :host( [kind=inverted] ) i {
          color: var( --icon-error-color, #ffffff );
        }        
        :host( [kind=link] ) i {
          color: var( --icon-link-color, #0f62fe );
        }
        :host( [kind=subtle] ) i {
          color: var( --icon-success-color, #525252 );
        }                
        :host( [kind=success] ) i {
          color: var( --icon-success-color, #24a148 );
        }        
        :host( [kind=warning] ) i {
          color: var( --icon-warning-color, #fddc69 );
        }                

        :host( [disabled] ) i {
          color: var( --icon-disabled-color, #16161640 );
        }        

        :host( [size=xs] ) i,
        :host( [size=xs] ) img {
          font-size: 16px;
          height: 16px;
          line-height: 16px;
          max-height: 16px;
          max-width: 16px;
          min-height: 16px;
          min-width: 16px;
          width: 16px;
        }

        :host( [size=s] ) i,
        :host( [size=s] ) img {
          font-size: 20px;
          height: 20px;
          line-height: 20px;
          max-height: 20px;
          max-width: 20px;
          min-height: 20px;
          min-width: 20px;
          width: 20px;
        }        

        :host( [size=m] ) i,
        :host( [size=m] ) img {
          font-size: 24px;
          height: 24px;
          line-height: 24px;
          max-height: 24px;
          max-width: 24px;
          min-height: 24px;
          min-width: 24px;
          width: 24px;
        }       

        :host( [size=l] ) i,
        :host( [size=l] ) img {
          font-size: 32px;
          height: 32px;
          line-height: 32px;
          max-height: 32px;
          max-width: 32px;
          min-height: 32px;
          min-width: 32px;
          width: 32px;
        }
        
        :host( [size=xl] ) i,
        :host( [size=xl] ) img {
          font-size: 48px;
          height: 48px;
          line-height: 48px;
          max-height: 48px;
          max-width: 48px;
          min-height: 48px;
          min-width: 48px;
          width: 48px;
        }        

        :host( :not( [name] ) ) i {
          display: none;
        }

        :host( :not( [src] ) ) img {
          display: none;
        }
      </style>
      <i part="icon"></i>
      <img part="image">
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$icon = this.shadowRoot.querySelector( 'i' ); 
    this.$image = this.shadowRoot.querySelector( 'img' );
  }

  // When attributes change
  _render() {
    this.$icon.textContent = this.name === null ? '' : this.name;
    this.$image.src = this.src === null ? '' : this.src;

    if( this.name !== null ) {
      const variation = [];
      variation.push( '\'FILL\' ' + ( this.filled ? 1 : 0 ) );                        
      variation.push( '\'wght\' ' + ( this.weight === null ? 400 : this.weight ) );              
      variation.push( '\'GRAD\' ' + ( this.grade === null ? 0 : this.grade ) );                              
      variation.push( '\'opsz\' ' + ( this.optical === null ? 20 : this.optical ) );                
      this.$icon.style.fontVariationSettings = variation.toString();    
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
    this._upgrade( 'disabled' );            
    this._upgrade( 'filled' );        
    this._upgrade( 'grade' );            
    this._upgrade( 'hidden' );    
    this._upgrade( 'kind' );                
    this._upgrade( 'name' );    
    this._upgrade( 'optical' );    
    this._upgrade( 'size' );        
    this._upgrade( 'src' );        
    this._upgrade( 'weight' );    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disabled',
      'filled',
      'grade',
      'hidden',
      'kind',
      'name',
      'optical',
      'size',
      'src',
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

  get filled() {
    return this.hasAttribute( 'filled' );
  }

  set filled( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'filled' );
      } else {
        this.setAttribute( 'filled', '' );
      }
    } else {
      this.removeAttribute( 'filled' );
    }
  }  

  get grade() {
    if( this.hasAttribute( 'grade' ) ) {
      return parseInt( this.getAttribute( 'grade' ) );
    }

    return null;
  }

  set grade( value ) {
    if( value !== null ) {
      this.setAttribute( 'grade', value );
    } else {
      this.removeAttribute( 'grade' );
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

  get name() {
    if( this.hasAttribute( 'name' ) ) {
      return this.getAttribute( 'name' );
    }

    return null;
  }

  set name( value ) {
    if( value !== null ) {
      this.setAttribute( 'name', value );
    } else {
      this.removeAttribute( 'name' );
    }
  }    

  get optical() {
    if( this.hasAttribute( 'optical' ) ) {
      return parseInt( this.getAttribute( 'optical' ) );
    }

    return null;
  }

  set optical( value ) {
    if( value !== null ) {
      this.setAttribute( 'optical', value );
    } else {
      this.removeAttribute( 'optical' );
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

  get src() {
    if( this.hasAttribute( 'src' ) ) {
      return this.getAttribute( 'src' );
    }

    return null;
  }

  set src( value ) {
    if( value !== null ) {
      this.setAttribute( 'src', value );
    } else {
      this.removeAttribute( 'src' );
    }
  }  

  get weight() {
    if( this.hasAttribute( 'weight' ) ) {
      return parseInt( this.getAttribute( 'weight' ) );
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

window.customElements.define( 'ape-icon', PrimateIcon );
