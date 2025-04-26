export default class PrimateMonth extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: row;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        article {
          box-sizing: border-box;
          margin: 0;
          padding: 0;                
        }

        article[part=month] {
          display: grid;
          grid-template-columns: repeat( 7, 1fr );
          grid-column-gap: 0px;
          grid-row-gap: 0px;
        }

        article[part=month] button {        
          align-items: center;
          appearance: none;
          background: none;
          border: none;
          border-radius: 6px;
          box-sizing: border-box;          
          color: var( --month-color, #2f323f );
          cursor: pointer;
          display: flex;
          flex-direction: column;
          font-size: var( --month-font-size, 16px );          
          height: var( --month-size, 43px );
          justify-content: center;
          margin: 0;
          outline: solid 3px transparent;
          outline-offset: 1px;
          padding: 0;
          text-align: center;
          width: var( --month-size, 43px );
        }

        article[part=month] button:hover {
          background: var( --month-hover-background, #f1f2f3 );
        }

        article[part=month] button.hidden {
          visibility: hidden;
        }

        article[part=month] button.outside {
          color: var( --month-outside-color, #9194a2 );
          visibility: hidden;
        }

        article[part=month] button.today {
          background: var( --month-today-background, #f1f2f3 );
        }

        article[part=month] button.selected {        
          background: var( --month-color, #2f323f );
          color: var( --month-selected-color, #ffffff );
        }        

        article[part=month] button[disabled] {
          color: var( --month-outside-color, #9194a2 );
          cursor: default;
        }        

        article[part=month] button[disabled]:hover {
          background: transparent;
        }                

        article[part=weekdays] {
          align-items: center;
          display: flex;
          flex-direction: row;
        }

        article[part=weekdays] p {        
          box-sizing: border-box;
          color: var( --month-outside-color, #9194a2 );
          flex-basis: 0;
          flex-grow: 1;
          font-size: var( --month-font-size, 16px );
          height: var( --month-size, 43px );
          line-height: var( --month-size, 43px );
          margin: 0;
          padding: 0;
          text-align: center;
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
          border-radius: var( --month-border-radius, 6px );
          box-sizing: border-box;
          color: var( --month-outside-color, #9194a2 );
          cursor: pointer;
          display: flex;
          font-size: calc( var( --month-font-size, 16px ) * 0.85 );
          font-weight: 400;
          height: var( --month-size, 43px );
          justify-content: center;
          margin: 0;
          padding: 0;
          text-align: center;
          width: var( --month-size, 43px );      
        }

        aside button:hover {
          background: var( --month-hover-background, #f1f2f3 );
        }

        section {
          box-sizing: border-box;          
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;                          
        }

        :host( [hide-weekdays] ) article[part=weekdays] {
          display: none;
        }

        :host( [show-outside-days] ) article[part=month] button.outside { 
          visibility: visible;
        }

        :host( :not( [show-week-number] ) ) aside {
          display: none;
        }

        :host( [size=s] ) article[part=month] button,
        :host( [size=sm] ) article[part=month] button,        
        :host( [size=small] ) article[part=month] button {
          font-size: 14px;
          height: 33px;
          width: 33px;
        }

        :host( [size=s] ) article[part=weekdays] p,
        :host( [size=sm] ) article[part=weekdays] p,
        :host( [size=small] ) article[part=weekdays] p { 
          font-size: 14px;
          height: 33px;
          line-height: 33px;
          width: 33px;
        }

        :host( [size=s] ) aside button,
        :host( [size=sm] ) aside button,        
        :host( [size=small] ) aside button {
          font-size: 12px;
          height: 33px;
          width: 33px;
        }
        
        :host( [size=l] ) article[part=month] button,
        :host( [size=lg] ) article[part=month] button,        
        :host( [size=large] ) article[part=month] button {
          font-size: 20px;
          height: 56px;
          width: 56px;
        }

        :host( [size=l] ) article[part=weekdays] p,
        :host( [size=lg] ) article[part=weekdays] p,
        :host( [size=large] ) article[part=weekdays] p { 
          font-size: 20px;
          height: 56px;
          line-height: 56px;
          width: 56px;
        }
        
        :host( [size=l] ) aside button,
        :host( [size=lg] ) aside button,                
        :host( [size=large] ) aside button {
          font-size: 16px;
          height: 56px;
          width: 56px;
        }                
      </style>
      <aside></aside>
      <section>
        <article part="weekdays">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>                                        
          <p></p>                                                
        </article>
        <article part="month"></article>
      </section>      
    `;

    // Private
    this._disabled = null;
    this._hidden = null;

    // Events
    this.doDateClick = this.doDateClick.bind( this );
    this.doWeekClick = this.doWeekClick.bind( this );        

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$aside = this.shadowRoot.querySelector( 'aside' );
    this.$month = this.shadowRoot.querySelector( 'article[part=month]' );
    this.$weekdays = this.shadowRoot.querySelector( 'article[part=weekdays]' );    
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

    if( this.toggleSelection ) {
      if( this.value === null ) {
        this.valueAsDate = value;
      } else {
        if(
          value.getFullYear() === this.valueAsDate.getFullYear() &&
          value.getMonth() === this.valueAsDate.getMonth() &&
          value.getDate() === this.valueAsDate.getDate()
        ) {
          this.value = null;
        } else {
          this.valueAsDate = value;
        }
      }
    } else {
      this.valueAsDate = value;
    }

    this.dispatchEvent( new CustomEvent( 'ape-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        today: evt.currentTarget.classList.contains( 'today' ),
        value: this.valueAsDate
      } 
    } ) );
  }

  doWeekClick( evt ) {
    const week = parseInt( evt.currentTarget.getAttribute( 'data-week' ) );
    
    this.dispatchEvent( new CustomEvent( 'ape-week', {
      bubbles: true,
      cancelable: false,
      composed: true,      
      detail: {
        value: week
      } 
    } ) );    
  }

  // When attributes change
  _render() {
    const display = this.defaultAsDate === null ? new Date() : this.defaultAsDate;
    const value = this.valueAsDate;
    const today = new Date();    
    const weeks = this.fixedWeeks ? 6 : this.weekCount( display.getFullYear(), display.getMonth() + 1 );

    let calendar = new Date( 
      display.getFullYear(),
      display.getMonth(),
      1
    );

    const aside = this.weekNumber( calendar );

    // Back to first day of the week
    calendar.setDate( calendar.getDate() - calendar.getDay() );    

    // Weekdays per locale
    const weekday = new Intl.DateTimeFormat( navigator.language, {
      weekday: 'narrow'
    } );

    for( let c = 0; c < this.$weekdays.children.length; c++ ) {
      this.$weekdays.children[c].textContent = weekday.format( calendar );
      calendar.setDate( calendar.getDate() + 1 );
    }

    // Reset calendar
    calendar = new Date( 
      display.getFullYear(),
      display.getMonth(),
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
      button.textContent = '9';
      this.$month.appendChild( button );
    }

    // Populate weeks
    for( let c = 0; c < this.$aside.children.length; c++ ) {
      this.$aside.children[c].textContent = aside + c;
      this.$aside.children[c].disabled = this.readOnly;
      this.$aside.children[c].setAttribute( 'data-week', aside + c );
    }

    // Populate month
    for( let c = 0; c < this.$month.children.length; c++ ) {      
      this.$month.children[c].textContent = calendar.getDate();
      this.$month.children[c].setAttribute( 'data-year', calendar.getFullYear() );
      this.$month.children[c].setAttribute( 'data-month', calendar.getMonth() );
      this.$month.children[c].setAttribute( 'data-date', calendar.getDate() );      

      // Externally disabled
      if( this._disabled === null ) {
        this.$month.children[c].disabled = false;        
      } else {
        this.$month.children[c].disabled = this._disabled( calendar );
      }

      // Externally hidden
      if( this._hidden === null ) {
        this.$month.children[c].classList.remove( 'hidden' );        
      } else {
        if( this._hidden( calendar ) ) {
          this.$month.children[c].classList.add( 'hidden' );
        } else {
          this.$month.children[c].classList.remove( 'hidden' );
        }
      }      

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
        calendar.getFullYear() === display.getFullYear() &&
        calendar.getMonth() === display.getMonth()
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
    this._upgrade( 'defaultMonth' );            
    this._upgrade( 'defaultAsDate' );
    this._upgrade( 'fixedWeeks' );
    this._upgrade( 'hidden' );
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
      'fixed-weeks',
      'hidden',
      'hide-weekdays',
      'name',
      'show-outside-days',
      'show-week-number',
      'size',
      'toggle-selection',
      'value'
    ];
  }

  // Observed attribute has changed
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
    this.defaultMonth = date === null ? null : date.toISOString();
  }

  get isDateDisabled() {
    return this._disabled;
  }

  set isDateDisabled( func ) {
    this._disabled = func;
  }

  get isDateHidden() {
    return this._hidden;
  }

  set isDateHidden( func ) {
    this._hidden = func;
  }

  get valueAsDate() {
    return this.value === null ? null : new Date( Date.parse( this.value ) );
  }
  
  set valueAsDate( date ) {
    this.value = date === null ? null : date.toISOString();
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

window.customElements.define( 'ape-month', PrimateMonth );
