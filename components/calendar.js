export default class PrimateCalendar extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: column;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        } 

        header {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 0;
        }

        header button {
          appearance: none;
          align-items: center;
          background: none;
          border: none;
          border: var( --calendar-header-button-border, solid 1px #e4e5e9 );
          border-color: var( --calendar-header-button-border-color, #e4e5e9 );
          border-radius: var( --calendar-header-button-border-radius, 6px );
          box-sizing: border-box;
          color: var( --calendar-header-button-color, #9194a2 );          
          cursor: pointer;
          display: flex;
          height: var( --calendar-header-button-size, 43px );
          justify-content: center;
          margin: 0;
          outline: solid 3px transparent;
          outline-offset: 1px;
          padding: 0;
          width: var( --calendar-header-button-size, 43px );
        }

        header button:hover {
          background: var( --calendar-header-button-background-hover, #f1f2f3 );
        }

        header button:focus {        
          outline: solid 3px #3e96ff;          
        }

        header button[disabled] {
          cursor: default;
        }

        header button:hover[disabled] {
          background: transparent
        }        

        header p {
          box-sizing: border-box;
          flex-basis: 0;
          flex-grow: 1;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          padding: 0;
          text-align: center;
        }

        i {
          box-sizing: border-box;
          color: var( --calendar-header-button-color, #9194a2 );
          cursor: pointer;
          direction: ltr;
          display: flex;
          font-family: 'Material Symbols Outlined';
          font-size: 20px;
          font-style: normal;
          font-weight: normal;
          height: 20px;
          letter-spacing: normal;
          line-height: 20px;
          margin: 0;
          max-height: 20px;
          max-width: 20px;
          min-height: 20px;
          min-width: 20px;
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;
          text-transform: none;
          white-space: nowrap;
          width: 20px;
          word-wrap: normal;          
        }

        :host( [disabled-navigation] ) i {
          cursor: default;
        }

        :host( [hide-navigation] ) header button {
          visibility: hidden;
        }

        :host( [size=s] ) header button,
        :host( [size=sm] ) header button,
        :host( [size=small] ) header button { 
          height: 33px;
          width: 33px;
        }        

        :host( [size=s] ) header p,
        :host( [size=sm] ) header p,
        :host( [size=small] ) header p { 
          font-size: 14px;
        }                
        
        :host( [size=l] ) header button,
        :host( [size=lg] ) header button,
        :host( [size=large] ) header button { 
          height: 56px;
          width: 56px;
        }                

        :host( [size=l] ) header p,
        :host( [size=lg] ) header p,
        :host( [size=large] ) header p { 
          font-size: 20px;
        }                
      </style>
      <header>
        <button type="button">
          <i>chevron_left</i>
        </button>
        <p></p>
        <button type="button">
          <i>chevron_right</i>
        </button>
      </header>      
      <ape-month></ape-month>
      <slot></slot>              
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$label = this.shadowRoot.querySelector( 'header p' );
    this.$month = this.shadowRoot.querySelector( 'ape-month' );
    this.$previous = this.shadowRoot.querySelector( 'header button:nth-of-type( 1 )' );
    this.$previous.addEventListener( 'click', () => {
      let display = this.defaultAsDate === null ? new Date() : this.defaultAsDate;  
      let month = display.getMonth();
      let year = display.getFullYear();
  
      year = ( month === 0 ) ? year - 1 : year;
      month = ( month === 0 ) ? 11 : month - 1;
  
      this.defaultAsDate = new Date( year, month, display.getDate() );

      this.dispatchEvent( new CustomEvent( 'aa-change', {
        detail: {
          display: this.displayAsDate,
          name: this.name,
          value: this.valueAsDate
        }
      } ) );      
    } );
    this.$next = this.shadowRoot.querySelector( 'header button:nth-of-type( 2 )' );
    this.$next.addEventListener( 'click', () => {
      let display = this.defaultAsDate === null ? new Date() : this.defaultAsDate;
      let month = display.getMonth();
      let year = display.getFullYear();
  
      year = ( month === 11 ) ? year + 1 : year;
      month = ( month + 1 ) % 12;
  
      this.defaultAsDate = new Date(
        year,
        month,
        display.getDate()
      );

      this.dispatchEvent( new CustomEvent( 'aa-change', {
        detail: {
          display: this.defaultAsDate,
          name: this.name,
          value: this.valueAsDate
        }
      } ) );      
    } );
  }

  // Month label per locale
  _updateLabel() {
    this.$label.textContent = new Intl.DateTimeFormat( navigator.language, {
      month: 'long',
      year: 'numeric'
    } ).format( this.defaultAsDate );
  }

  // When things change
  _render() {
    // Navigation
    this.$previous.disabled = this.disabledNavigation;
    this.$next.disabled = this.disabledNavigation;

    // Label
    this._updateLabel();

    // Pass to month element
    this.$month.defaultMonth = this.defaultMonth;
    this.$month.fixedWeeks = this.fixedWeeks;
    this.$month.showOutsideDays = this.showOutsideDays;
    this.$month.showWeekNumber = this.showWeekNumber;
    this.$month.size = this.size;
    this.$month.toggleSelection = this.toggleSelection;
    this.$month.value = this.value;
  }

  // Properties set before module loaded
  _upgrade( property ) {
    if( this.hasOwnProperty( property ) ) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }    
  }    

  // Setup
  connectedCallback() {
    this._upgrade( 'defaultMonth' );
    this._upgrade( 'defaultAsDate' );
    this._upgrade( 'disabledNavigation' );
    this._upgrade( 'fixedWeeks' );    
    this._upgrade( 'hidden' );    
    this._upgrade( 'hideNavigation' );
    this._upgrade( 'hideWeekdays' );
    this._upgrade( 'isDateDisabled' );
    this._upgrade( 'isDateHidden' );
    this._upgrade( 'name' );
    this._upgrade( 'showOutsideDays' );
    this._upgrade( 'showWeekNumber' );
    this._upgrade( 'size' );
    this._upgrade( 'toggleSelection' );
    this._upgrade( 'value' );                     
    this._upgrade( 'valueAsDate' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'default-month',
      'disabled-navigation',
      'fixed-weeks',
      'hidden',
      'hide-navigation',
      'hide-weekdays',
      'name',
      'show-outside-days',
      'show-week-number',
      'size',
      'toggle-selection',
      'value'
    ];
  }

  // Observed tag attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Properties
  // Not reflected
  // Array, Date, Object, null
  get defaultAsDate() {
    return this.$month.defaultAsDate;
  }
  
  set defaultAsDate( date ) {
    this.$month.defaultAsDate = date;
    this._updateLabel();
  }

  get isDateDisabled() {
    return this.$month.isDateDisabled;
  }

  set isDateDisabled( func ) {
    this.$month.isDateDisabled = func;
  }

  get isDateHidden() {
    return this.$month.isDateHidden;
  }

  set isDateHidden( func ) {
    this.$month.isDateHidden = func;
  }

  get valueAsDate() {
    return this.$month.valueAsDate;
  }
  
  set valueAsDate( date ) {
    this.$month.valueAsDate = date;
  }     

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get defaultMonth() {
    if( this.hasAttribute( 'default-month' ) ) {
      return this.getAttribute( 'default-month' );
    }

    return null;
  }

  set defaultMonth( value ) {
    if( value !== null ) {
      this.setAttribute( 'default-month', value );
    } else {
      this.removeAttribute( 'default-month' );
    }
  }

  get disabledNavigation() {
    return this.hasAttribute( 'disabled-navigation' );
  }

  set disabledNavigation( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disabled-navigation' );
      } else {
        this.setAttribute( 'disabled-navigation', '' );
      }
    } else {
      this.removeAttribute( 'disabled-navigation' );
    }
  }

  get fixedWeeks() {
    return this.hasAttribute( 'fixed-weeks' );
  }

  set fixedWeeks( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'fixed-weeks' );
      } else {
        this.setAttribute( 'fixed-weeks', '' );
      }
    } else {
      this.removeAttribute( 'fixed-weeks' );
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

  get hideNavigation() {
    return this.hasAttribute( 'hide-navigation' );
  }

  set hideNavigation( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hide-navigation' );
      } else {
        this.setAttribute( 'hide-navigation', '' );
      }
    } else {
      this.removeAttribute( 'hide-navigation' );
    }
  }
  
  get hideWeekdays() {
    return this.hasAttribute( 'hide-weekdays' );
  }

  set hideWeekdays( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hide-weekdays' );
      } else {
        this.setAttribute( 'hide-weekdays', '' );
      }
    } else {
      this.removeAttribute( 'hide-weekdays' );
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

  get showOutsideDays() {
    return this.hasAttribute( 'show-outside-days' );
  }

  set showOutsideDays( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'show-outside-days' );
      } else {
        this.setAttribute( 'show-outside-days', '' );
      }
    } else {
      this.removeAttribute( 'show-outside-days' );
    }
  }

  get showWeekNumber() {
    return this.hasAttribute( 'show-week-number' );
  }

  set showWeekNumber( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'show-week-number' );
      } else {
        this.setAttribute( 'show-week-number', '' );
      }
    } else {
      this.removeAttribute( 'show-week-number' );
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

  get toggleSelection() {
    return this.hasAttribute( 'toggle-selection' );
  }

  set toggleSelection( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'toggle-selection' );
      } else {
        this.setAttribute( 'toggle-selection', '' );
      }
    } else {
      this.removeAttribute( 'toggle-selection' );
    }
  }
  
  get value() {
    if( this.hasAttribute( 'value' ) ) {
      return this.getAttribute( 'value' );
    }

    return null;
  }

  set value( value ) {
    if( value !== null ) {
      this.setAttribute( 'value', value );
    } else {
      this.removeAttribute( 'value' );
    }
  }   
}

window.customElements.define( 'ape-calendar', PrimateCalendar );
