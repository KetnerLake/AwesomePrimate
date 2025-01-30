export default class ApeFlex extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: flex-start;
          box-sizing: border-box;
          display: flex;
          direction: column;
          flex-wrap: nowrap;
          gap: 0;
          justify-content: flex-start;
          position: relative;
        }

        :host( [align=baseline] ) { align-items: baseline; }         
        :host( [align=center] ) { align-items: center; } 
        :host( [align=end] ) { align-items: flex-end; }         
        :host( [align=stretch] ) { align-items: stretch; } 

        :host( [direction=column-reverse] ) { direction: column-reverse; }         
        :host( [direction=row] ) { direction: row; } 
        :host( [direction=row-reverse] ) { direction: row-reverse; }         

        :host( [display=inline-flex] ) { display: inline-flex; }
        :host( [display=none] ) { display: none; }

        :host( [gap="1"] ) { gap: 4px; } 
        :host( [gap="2"] ) { gap: 8px; } 
        :host( [gap="3"] ) { gap: 12px; } 
        :host( [gap="4"] ) { gap: 16px; } 
        :host( [gap="5"] ) { gap: 24px; } 
        :host( [gap="6"] ) { gap: 32px; } 
        :host( [gap="7"] ) { gap: 40px; } 
        :host( [gap="8"] ) { gap: 48px; } 
        :host( [gap="9"] ) { gap: 64px; }         

        :host( [hidden] ) { display: none; } 

        :host( [justify=around] ) { justify-content: space-around; } 
        :host( [justify=between] ) { justify-content: space-between; } 
        :host( [justify=center] ) { justify-content: center; } 
        :host( [justify=end] ) { justify-content: flex-end; } 
        :host( [justify=evenly] ) { justify-content: space-evenly; } 

        :host( [wrap=wrap] ) { flex-wrap: wrap; }                 
        :host( [wrap=wrap-reverse] ) { flex-wrap: wrap-reverse; }         
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
    this._upgrade( 'align' );                    
    this._upgrade( 'direction' );                
    this._upgrade( 'display' );            
    this._upgrade( 'gap' );                
    this._upgrade( 'hidden' );   
    this._upgrade( 'justify' );                   
    this._upgrade( 'wrap' );                       
    this._render();
  }
  
  // Set down
  diconnectedCallback() {;}

  // Watched attributes
  static get observedAttributes() {
    return [
      'align',
      'direction',
      'display',
      'gap',
      'hidden',
      'justify',
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
  get align() {
    if( this.hasAttribute( 'align' ) ) {
      return this.getAttribute( 'align' );
    }

    return null;
  }

  set align( value ) {
    if( value !== null ) {
      this.setAttribute( 'align', value );
    } else {
      this.removeAttribute( 'align' );
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

  get gap() {
    if( this.hasAttribute( 'gap' ) ) {
      return parseInt( this.getAttribute( 'gap' ) );
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
    if( this.hasAttribute( 'justify' ) ) {
      return this.getAttribute( 'justify' );
    }

    return null;
  }

  set justify( value ) {
    if( value !== null ) {
      this.setAttribute( 'justify', value );
    } else {
      this.removeAttribute( 'justify' );
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

window.customElements.define( 'ape-flex', ApeFlex );
