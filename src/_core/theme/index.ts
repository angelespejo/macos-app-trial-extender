
export class Theme {

	darkmode = false
	id = 'theme'
	modes = {
		dark  : 'dark',
		light : 'light',
	}

	onClick() {

		if ( this.darkmode )
			this.set( true )
		else
			this.set( false )

	}

	set( mode = true ) {

		const html = document.querySelector( 'html' )

		if ( mode ) {

			document.documentElement.classList.add( this.modes.dark )
			if ( html ) html.style.colorScheme = this.modes.dark
			localStorage.theme = this.modes.dark
			this.darkmode      = false

		}
		else {

			document.documentElement.classList.remove( this.modes.dark )
			if ( html ) html.style.colorScheme = this.modes.light
			localStorage.theme = this.modes.light
			this.darkmode      = true

		}

	}

	onMount() {

		if ( window.matchMedia ) {

			if ( localStorage.theme === this.modes.dark || ( !( this.id in localStorage ) && window.matchMedia( '(prefers-color-scheme: dark)' ).matches ) )
				this.set( true )
			else
				this.set( false )

		}

	}

}
