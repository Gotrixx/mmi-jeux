class CanvApp {
	constructor( sCanvAppID ) {
		this.canvas = document.getElementById( sCanvAppID );
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		if( !window.isCanvasSupported( this.canvas ) ) {
			return console.error( "don't support" );
		}
		this.context = this.canvas.getContext( "2d" );
	}

	draw() {
		console.warn( "The draw method must be overrided" )
	}
}

window.CanvApp = CanvApp;