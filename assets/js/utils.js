;

(function () {
	"use strict";

	var fIsCanvasSupported = function fIsCanvasSupported($elt) {
		return !!$elt.getContext;
	};

	window.isCanvasSupported = fIsCanvasSupported;
})();