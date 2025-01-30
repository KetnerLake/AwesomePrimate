export default class ApeText extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          color: var( --text-color, #1c2024 );
          cursor: var( --text-cursor, default );
          display: inline;
          font-family: var( --text-font-family, sans-serif );
          font-size: var( --text-font-size, 16px );
          font-style: normal;
          line-height: var( --text-line-height, 16px );
          position: relative;
          text-rendering: optimizeLegibility;
        }

        :host( [align=center] ) { text-align: center; }
        :host( [align=right] ) { text-align: right; }        

        :host( [as=div] ),
        :host( [as=label] ),        
        :host( [as=p] ) {
          display: block;
        }

        :host( [color=amber] ) { color: #ffc53d; }
        :host( [color=blue] ) { color: #0090ff; }
        :host( [color=bronze] ) { color: #a18072; }
        :host( [color=brown] ) { color: #ad7f58; }
        :host( [color=crimson] ) { color: #e93d82; }                               
        :host( [color=cyan] ) { color: #00a2c7; }
        :host( [color=gold] ) { color: #978365; }
        :host( [color=grass] ) { color: #46a758; } 
        :host( [color=gray] ) { color: #8b8d98; } 
        :host( [color=green] ) { color: #30a46c; } 
        :host( [color=indigo] ) { color: #3e63dd; }         
        :host( [color=iris] ) { color: #5b5bd6; }
        :host( [color=jade] ) { color: #29a383; }        
        :host( [color=lime] ) { color: #bdee63; }                
        :host( [color=mint] ) { color: #86ead4; }                        
        :host( [color=orange] ) { color: #f76b15; }       
        :host( [color=pink] ) { color: #d6409f; }                                       
        :host( [color=plum] ) { color: #ab4aba; }                                               
        :host( [color=purple] ) { color: #8e4ec6; }                                             
        :host( [color=red] ) { color: #e5484d; }               
        :host( [color=ruby] ) { color: #e54666; }
        :host( [color=sky] ) { color: #7ce2fe; }                        
        :host( [color=teal] ) { color: #12a594; }                       
        :host( [color=tomato] ) { color: #e54d2e; }       
        :host( [color=violet] ) { color: #6e56cf; }                                                     
        :host( [color=yellow] ) { color: #ffe629; }                

        :host( [hidden] ) { display: none; }

        :host( [size="1"] ) { 
          font-size: calc( 12px * var( --scaling, 1 ) ); 
          line-height: calc( 12px * var( --scaling, 1 ) );
        }
        :host( [size="2"] ) { 
          font-size: calc( 14px * var( --scaling, 1 ) ); 
          line-height: calc( 14px * var( --scaling, 1 ) );          
        }        
        :host( [size="3"] ) { 
          font-size: calc( 16px * var( --scaling, 1 ) ); 
          line-height: calc( 16px * var( --scaling, 1 ) );          
        }                
        :host( [size="4"] ) { 
          font-size: calc( 18px * var( --scaling, 1 ) ); 
          line-height: calc( 18px * var( --scaling, 1 ) );          
        }                        
        :host( [size="5"] ) { 
          font-size: calc( 20px * var( --scaling, 1 ) ); 
          line-height: calc( 20px * var( --scaling, 1 ) );
        }                                
        :host( [size="6"] ) { 
          font-size: calc( 24px * var( --scaling, 1 ) ); 
          line-height: calc( 24px * var( --scaling, 1 ) );          
        }                                
        :host( [size="7"] ) { 
          font-size: calc( 28px * var( --scaling, 1 ) ); 
          line-height: calc( 28px * var( --scaling, 1 ) );
        }                                
        :host( [size="8"] ) { 
          font-size: calc( 35px * var( --scaling, 1 ) ); 
          line-height: calc( 35px * var( --scaling, 1 ) );          
        }                                
        :host( [size="9"] ) { 
          font-size: calc( 60px * var( --scaling, 1 ) ); 
          line-height: calc( 60px * var( --scaling, 1 ) );          
        }                                

        :host( [weight=bold] ) { font-weight: 700; }        
        :host( [weight=light] ) { font-weight: 300; }
        :host( [weight=medium] ) { font-weight: 500; }                
        :host( [weight=regular] ) { font-weight: 400; }        

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
    this._upgrade( 'align' );   
    this._upgrade( 'as' );       
    this._upgrade( 'color' );         
    this._upgrade( 'hidden' );      
    this._upgrade( 'size' );      
    this._upgrade( 'truncate' );        
    this._upgrade( 'weight' );      
    this._upgrade( 'wrap' );      
    this._render();
  }
  
  // Set down
  diconnectedCallback() {;}

  // Watched attributes
  static get observedAttributes() {
    return [
      'align',
      'as',
      'color',    
      'hidden',
      'size',
      'truncate',
      'weight',
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
  
  get as() {
    if( this.hasAttribute( 'as' ) ) {
      return this.getAttribute( 'as' );
    }

    return null;
  }

  set as( value ) {
    if( value !== null ) {
      this.setAttribute( 'as', value );
    } else {
      this.removeAttribute( 'as' );
    }
  }        

  get color() {
    if( this.hasAttribute( 'color' ) ) {
      return this.getAttribute( 'color' );
    }

    return null;
  }

  set color( value ) {
    if( value !== null ) {
      this.setAttribute( 'color', value );
    } else {
      this.removeAttribute( 'color' );
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

  get size() {
    if( this.hasAttribute( 'size' ) ) {
      return parseInt( this.getAttribute( 'size' ) );
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

window.customElements.define( 'ape-text', ApeText );
