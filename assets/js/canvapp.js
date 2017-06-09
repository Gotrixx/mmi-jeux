;

(function () {
	"use strict";

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var CanvApp = function () {
		function CanvApp(sCanvAppID) {
			_classCallCheck(this, CanvApp);

			this.canvas = document.getElementById(sCanvAppID);
			this.width = this.canvas.width;
			this.height = this.canvas.height;
			if (!window.isCanvasSupported(this.canvas)) {
				return console.error("don't support");
			}
			this.context = this.canvas.getContext("2d");
		}

		_createClass(CanvApp, [{
			key: "draw",
			value: function draw() {
				console.warn("The draw method must be overrided");
			}
		}]);

		return CanvApp;
	}();

	window.CanvApp = CanvApp;
})();