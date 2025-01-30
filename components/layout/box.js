export default class ApeBox extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline;
          position: relative;
        }

        :host( [display=block] ) { display: block; }                
        :host( [display=inline] ) { display: inline; }        
        :host( [display=inline-block] ) { display: inline-block; }
        :host( [display=none] ) { display: none; }        

        :host( [hidden] ) { display: none; } 
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
    this._upgrade( 'display' );            
    this._upgrade( 'hidden' );      
    this._render();
  }
  
  // Set down
  diconnectedCallback() {;}

  // Watched attributes
  static get observedAttributes() {
    return [
      'display',
      'hidden'
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
  get display() {
    if( this.hasAttribute( 'display' ) ) {
      return this.getAttribute( 'display' );
    }

    return null;
  }

  set display( value ) {
    if( value !== null ) {
      this.setAttribute( 'display', value );
    } else {
      this.removeAttribute( 'display' );
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
}

window.customElements.define( 'ape-box', ApeBox );
