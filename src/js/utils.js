// hepl-mmi/meet-canvas - utils
const fIsCanvasSupported = function( $elt ) {
	return !!$elt.getContext;
};

window.isCanvasSupported = fIsCanvasSupported;