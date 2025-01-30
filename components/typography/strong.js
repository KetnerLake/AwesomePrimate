export default class ApeStrong extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline;
          font-weight: 700;
          position: relative;
        }

        :host( [hidden] ) { display: none; }

        :host( [wrap=balance] ) { text-wrap: balance; }        
        :host( [wrap=pretty] ) { text-wrap: pretty; }        
        :host( [wrap=nowrap] ) { text-wrap: nowrap; }

        :host( [truncate] ) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }        
      </style>
      <slot></slot>
    `;
    
    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );
  }
  
  // When attributes change
  _render() {;}

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
    this._upgrade( 'hidden' );      
    this._upgrade( 'truncate' );        
    this._upgrade( 'wrap' );      
    this._render();
  }
  
  // Set down
  diconnectedCallback() {;}

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',
      'truncate',
      'wrap'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Attributes
  // Reflected
  // Boolean, Float, Integer, String, null
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

  get wrap() {
    if( this.hasAttribute( 'wrap' ) ) {
      return this.getAttribute( 'wrap' );
    }

    return null;
  }

  set wrap( value ) {
    if( value !== null ) {
      this.setAttribute( 'wrap', value );
    } else {
      this.removeAttribute( 'wrap' );
    }
  }  
}

window.customElements.define( 'ape-strong', ApeStrong );
