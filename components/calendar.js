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

        article {
          box-sizing: border-box;
          display: grid;
          grid-template-columns: repeat( 7, 1fr );
          grid-column-gap: 0px;
          grid-row-gap: 0px;
          margin: 0;
          padding: 0;      
        }

        article button {
          appearance: none;
          background: none;
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          color: #2f323f;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 16px;
          font-weight: 400;
          height: 43px;
          justify-content: center;
          margin: 0;
          outline: solid 3px transparent;
          outline-offset: 1px;
          padding: 0;      
          text-align: center;    
          width: 43px;
        }

        article button:hover {
          background: #f1f2f3;
        }

        article button.outside {
          color: #9194a2;
          visibility: hidden;
        }

        article button.selected {        
          background: #2f323f;
          color: #ffffff;
        }

        aside {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;          
        }

        aside button {
          align-items: center;
          appearance: none;
          background: none;
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          color: #9194a2;
          cursor: pointer;
          display: flex;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          height: 43px;
          justify-content: center;
          margin: 0;
          padding: 0;
          text-align: center;
          width: 43px;      
        }

        aside button:hover {
          background: #f1f2f3;
        }        

        div {
          box-sizing: border-box;
          display: flex;
        }

        div[part=calendar] {
          flex-direction: row;
        }

        div[part=month] {
          flex-direction: column;
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
          border: solid 1px #9194a2;
          border-radius: 4px;
          box-sizing: border-box;
          color: #9194a2;
          cursor: pointer;
          display: flex;
          height: 43px;
          justify-content: center;
          margin: 0;
          outline: solid 3px transparent;
          outline-offset: 1px;
          padding: 0;
          width: 43px;
        }

        header button:hover {
          background: #f1f2f3;
        }

        header button:focus {        
          outline: solid 3px #3e96ff;          
        }

        header button:disabled {
          cursor: not-allowed;
        }

        header button:hover:disabled {
          background: transparent
        }        

        header p {
          flex-basis: 0;
          flex-grow: 1;
          font-weight: 600;
          text-align: center;
        }

        i {
          box-sizing: border-box;
          color: var( --icon-color, #9194a2 );
          cursor: var( --icon-cursor, pointer );
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

        p {
          box-sizing: border-box;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 16px;
          font-weight: 400;
          margin: 0;
          padding: 0;
        }

        section {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;          
          margin: 0;
          padding: 0;
        }

        section p {
          color: #9194a2;          
          padding: 11px 0 11px 0;
          text-align: center;         
          width: 43px;
        }

        :host( [hide-navigation] ) header button {
          visibility: hidden;
        }

        :host( [hide-weekdays] ) section {
          display: none;
        }

        :host( [read-only] ) aside button,
        :host( [read-only] ) article button {
          cursor: default;
        }
        :host( [read-only] ) aside button:hover {
          background: transparent;
        }

        :host( [show-outside-days] ) article button.outside { 
          visibility: visible;
        }

        :host( :not( [show-week-number] ) ) aside {
          display: none;
        }

        :host( [size=s] ) article button,
        :host( [size=sm] ) article button,        
        :host( [size=small] ) article button {
          font-size: 14px;
          height: 33px;
          width: 33px;
        }

        :host( [size=s] ) aside button,
        :host( [size=sm] ) aside button,        
        :host( [size=small] ) aside button {
          font-size: 12px;
          height: 33px;
          width: 33px;
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

        :host( [size=s] ) section p,
        :host( [size=sm] ) section p,
        :host( [size=small] ) section p { 
          font-size: 14px;
          padding: 7px 0 7px 0;          
          width: 33px;
        }
        
        :host( [size=l] ) article button,
        :host( [size=lg] ) article button,        
        :host( [size=large] ) article button {
          font-size: 20px;
          height: 56px;
          width: 56px;
        }

        :host( [size=l] ) aside button,
        :host( [size=lg] ) aside button,                
        :host( [size=large] ) aside button {
          font-size: 16px;
          height: 56px;
          width: 56px;
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

        :host( [size=l] ) section p,
        :host( [size=lg] ) section p,
        :host( [size=large] ) section p { 
          font-size: 20px;
          padding: 15px 0 15px 0;          
          width: 56px;
        }        

        /* TODO: Selected, today styles and events */
      </style>
      <header>
        <button>
          <i>chevron_left</i>
        </button>
        <p></p>
        <button>
          <i>chevron_right</i>
        </button>
      </header>      
      <div part="calendar">
        <aside></aside>
        <div part="month">
          <section>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>                                        
            <p></p>                                                
          </section>
          <article></article>
        </div>
      </div>
      <slot></slot>              
    `;

    // Private
    this._display = new Date();
    this._disabled = null;

    // Events
    this.doDateClick = this.doDateClick.bind( this );
    this.doWeekClick = this.doWeekClick.bind( this );    

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$aside = this.shadowRoot.querySelector( 'aside' );
    this.$label = this.shadowRoot.querySelector( 'header p' );
    this.$month = this.shadowRoot.querySelector( 'article' );
    this.$previous = this.shadowRoot.querySelector( 'header button:nth-of-type( 1 )' );
    this.$previous.addEventListener( 'click', () => {
      let display = null;
      const value = new Date();

      if( this._display === null ) {
        if( value === null ) {
          display = new Date();
        } else {
          display = new Date( value.getTime() );
        }
      } else {
        display = new Date( this._display.getTime() );
      }    
  
      let month = display.getMonth();
      let year = display.getFullYear();
  
      year = ( month === 0 ) ? year - 1 : year;
      month = ( month === 0 ) ? 11 : month - 1;
  
      this._display = new Date(
        year,
        month,
        display.getDate()
      );

      this._render();
  
      this.dispatchEvent( new CustomEvent( 'aa-change', {
        detail: {
          display: this._display,
          name: this.name,
          value: value
        }
      } ) );      
    } );
    this.$next = this.shadowRoot.querySelector( 'header button:nth-of-type( 2 )' );
    this.$next.addEventListener( 'click', () => {
      let display = null;
      const value = new Date();

      if( this._display === null ) {
        if( value === null ) {
          display = new Date();
        } else {
          display = new Date( value.getTime() );          
        }
      } else {
        display = new Date( this._display.getTime() );
      }    
  
      let month = display.getMonth();
      let year = display.getFullYear();
  
      year = ( month === 11 ) ? year + 1 : year;
      month = ( month + 1 ) % 12;
  
      this._display = new Date(
        year,
        month,
        display.getDate()
      );

      this._render();
  
      this.dispatchEvent( new CustomEvent( 'aa-change', {
        detail: {
          display: this._display,
          name: this.name,
          value: value
        }
      } ) );      
    } );
    this.$week = this.shadowRoot.querySelector( 'section' );
  }

  // Month is in the range 1 - 12
  // https://stackoverflow.com/questions/2483719/get-weeks-in-month-through-javascript
  weekCount( year, month, start = 0 ) {
    const firstDayOfWeek = start || 0;
    const firstOfMonth = new Date( year, month - 1, 1 );
    const lastOfMonth = new Date( year, month, 0 );
    const numberOfDaysInMonth = lastOfMonth.getDate();
    const firstWeekDay = ( firstOfMonth.getDay() - firstDayOfWeek + 7 ) % 7;
    const used = firstWeekDay + numberOfDaysInMonth;

    return Math.ceil( used / 7 );
  }

  // Week of the year
  // https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php/6117889#6117889
  weekNumber( date ) {
    date = new Date( Date.UTC( date.getFullYear(), date.getMonth(), date.getDate() ) );
    date.setUTCDate( date.getUTCDate() + 4 - ( date.getUTCDay() || 7 ) );
    const yearStart = new Date( Date.UTC( date.getUTCFullYear(), 0, 1 ) );
    return Math.ceil( ( ( ( date - yearStart ) / 86400000 ) + 1 ) / 7 );
  } 

  doDateClick( evt ) {
    const value = new Date(
      parseInt( evt.currentTarget.getAttribute( 'data-year' ) ),
      parseInt( evt.currentTarget.getAttribute( 'data-month' ) ),
      parseInt( evt.currentTarget.getAttribute( 'data-date' ) )
    );

    // this.valueAsDate = selected;

    this.dispatchEvent( new CustomEvent( 'ape-change', {
      detail: {
        value: value
      } 
    } ) );
  }

  doWeekClick( evt ) {
    const week = parseInt( evt.currentTarget.getAttribute( 'data-week' ) );
    
    this.dispatchEvent( new CustomEvent( 'ape-week', {
      detail: {
        value: week
      } 
    } ) );    
  }

  // When things change
  _render() {
    const value = new Date();
    const today = new Date();    
    const weeks = this.fixedWeeks ? 6 : this.weekCount( this._display.getFullYear(), this._display.getMonth() + 1 );

    let calendar = new Date( 
      this._display.getFullYear(),
      this._display.getMonth(),
      1
    );

    const aside = this.weekNumber( calendar );

    // Back to first day of the week
    calendar.setDate( calendar.getDate() - calendar.getDay() );    

    // Weekdays per locale
    const weekday = new Intl.DateTimeFormat( navigator.language, {
      weekday: 'narrow'
    } );

    for( let c = 0; c < this.$week.children.length; c++ ) {
      this.$week.children[c].textContent = weekday.format( calendar );
      calendar.setDate( calendar.getDate() + 1 );
    }

    // Reset calendar
    calendar = new Date( 
      this._display.getFullYear(),
      this._display.getMonth(),
      1
    );    
    calendar.setDate( calendar.getDate() - calendar.getDay() );

    // Remove to match days in month
    while( this.$aside.children.length > weeks ) {
      this.$aside.children[0].removeEventListener( 'click', this.doWeekClick );
      this.$aside.children[0].remove();
    }

    while( this.$month.children.length > ( weeks * 7 ) ) {
      this.$month.children[0].removeEventListener( 'click', this.doDateClick );
      this.$month.children[0].remove();
    }

    // Add to match days in month
    while( this.$aside.children.length < weeks ) {
      const button = document.createElement( 'button' );
      button.addEventListener( 'click', this.doWeekClick );
      button.type = 'button';
      this.$aside.appendChild( button );
    }

    while( this.$month.children.length < ( weeks * 7 ) ) {
      const button = document.createElement( 'button' );
      button.addEventListener( 'click', this.doDateClick );
      button.type = 'button';
      this.$month.appendChild( button );
    }

    // Navigation
    this.$previous.disabled = this.disabledNavigation;
    this.$next.disabled = this.disabledNavigation;

    // Month label per locale
    this.$label.textContent = new Intl.DateTimeFormat( navigator.language, {
      month: 'long',
      year: 'numeric'
    } ).format( this._display );

    // Populate weeks
    for( let c = 0; c < this.$aside.children.length; c++ ) {
      this.$aside.children[c].textContent = aside + c;
      this.$aside.children[c].disabled = this.readOnly;
      this.$aside.children[c].setAttribute( 'data-week', aside + c );
    }

    // Populate month
    for( let c = 0; c < this.$month.children.length; c++ ) {      
      this.$month.children[c].textContent = calendar.getDate();
      this.$month.children[c].disabled = this.readOnly;
      this.$month.children[c].setAttribute( 'data-year', calendar.getFullYear() );
      this.$month.children[c].setAttribute( 'data-month', calendar.getMonth() );
      this.$month.children[c].setAttribute( 'data-date', calendar.getDate() );

      // Selection
      if( value === null ) {
        this.$month.children[c].classList.remove( 'selected' );
      } else {
        if(
          calendar.getFullYear() === value.getFullYear() &&
          calendar.getMonth() === value.getMonth() &&
          calendar.getDate() === value.getDate() &&
          calendar.getMonth() === value.getMonth()
        ) {
          this.$month.children[c].classList.add( 'selected' );
        } else {
          this.$month.children[c].classList.remove( 'selected' );
        }
      }      

      // Outside
      if(
        calendar.getFullYear() === this._display.getFullYear() &&
        calendar.getMonth() === this._display.getMonth()
      ) {
        this.$month.children[c].classList.remove( 'outside' );
      } else {
        this.$month.children[c].classList.add( 'outside' );
      }

      // Today
      if(
        calendar.getFullYear() === today.getFullYear() &&
        calendar.getMonth() === today.getMonth() &&
        calendar.getDate() === today.getDate()
      ) {
        this.$month.children[c].classList.add( 'today' );
      } else {
        this.$month.children[c].classList.remove( 'today' );
      }

      calendar.setDate( calendar.getDate() + 1 );            
    }
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
    this._upgrade( 'disabledNavigation' );
    this._upgrade( 'fixedWeeks' );    
    this._upgrade( 'hideNavigation' );
    this._upgrade( 'hideWeekdays' );
    this._upgrade( 'isDateDisabled' );
    this._upgrade( 'name' );
    this._upgrade( 'readOnly' );
    this._upgrade( 'showOutsideDays' );
    this._upgrade( 'showWeekNumber' );
    this._upgrade( 'size' );
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
      'hide-navigation',
      'hide-weekdays',
      'name',
      'read-only',
      'show-outside-days',
      'show-week-number',
      'size',
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
    return this.defaultMonth === null ? null : new Date( Date.parse( this.defaultMonth ) );
  }
  
  set defaultAsDate( date ) {
    this.defaultMonth = date === null ? null : date.toString();
  }

  get isDateDisabled() {
    return this._disabled;
  }

  set isDateDisabled( func ) {
    this._disabled = func;
  }

  get valueAsDate() {
    return this.value === null ? null : new Date( Date.parse( this.value ) );
  }
  
  set valueAsDate( date ) {
    this.value = date === null ? null : date.toString();
  }     

  // Attributes
  // Reflected
  // Boolean, Number, String, null
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

  get readOnly() {
    return this.hasAttribute( 'read-only' );
  }

  set readOnly( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'read-only' );
      } else {
        this.setAttribute( 'read-only', '' );
      }
    } else {
      this.removeAttribute( 'read-only' );
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
