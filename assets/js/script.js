var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var oApp = void 0;

	var nbrLines = 5,
	    nbrBricksLine = 7,
	    lineSpace = 3,
	    brickWidth = 54,
	    brickHeight = 15,
	    brickSpace = 3,
	    brickColor = ["coral", "slateblue"],
	    barWidth = 90,
	    barHeight = 15,
	    barColor = "slateblue",
	    barSpeed = 12,
	    ballRadius = 8,
	    ballColor = "limegreen",
	    ballSpeed = 5,
	    arrowLeft = 37,
	    arrowRight = 39,
	    refreshInterval = 10;

	var bricksHeight = (lineSpace + brickHeight) * nbrLines,
	    barX = void 0,
	    barY = void 0,
	    ballX = void 0,
	    ballY = void 0,
	    ballDirX = 1,
	    ballDirY = -1,
	    keyPressed = null,
	    tabBricks = void 0,
	    currentTime = void 0,
	    playerWin = 0,
	    gameLoop = void 0,
	    animationRequestID = void 0;

	var BreakBrick = function (_CanvApp) {
		_inherits(BreakBrick, _CanvApp);

		function BreakBrick() {
			_classCallCheck(this, BreakBrick);

			return _possibleConstructorReturn(this, (BreakBrick.__proto__ || Object.getPrototypeOf(BreakBrick)).apply(this, arguments));
		}

		_createClass(BreakBrick, [{
			key: "drawRectangleAt",
			value: function drawRectangleAt(x, y, width, height, sColor) {
				var context = this.context;


				context.fillStyle = sColor;
				context.fillRect(x, y, width, height);
			}
		}, {
			key: "drawBallAt",
			value: function drawBallAt(x, y, radius, start, end) {
				var context = this.context,
				    width = this.width,
				    height = this.height;


				context.beginPath();
				context.fillStyle = ballColor;
				context.arc(x, y, radius, start, end);
				context.closePath();
				context.fill();
			}
		}, {
			key: "initBricks",
			value: function initBricks() {
				var context = this.context,
				    width = this.width,
				    height = this.height;


				var i = void 0,
				    j = void 0,
				    brickX = 0,
				    brickY = 0,
				    colorID = 0;

				tabBricks = new Array(nbrLines);

				for (i = 0; i < nbrLines; i++) {
					tabBricks[i] = new Array(nbrBricksLine);
					for (j = 0; j < nbrBricksLine; j++) {
						i % 2 ? colorID = 0 : colorID = 1;
						this.drawRectangleAt(brickX, brickY, brickWidth, brickHeight, brickColor[colorID]);
						brickX += brickWidth + 3;
						tabBricks[i][j] = 1;
					}
					brickX = 0;
					brickY += brickHeight + 3;
				}
			}
		}, {
			key: "initBar",
			value: function initBar() {
				var context = this.context,
				    width = this.width,
				    height = this.height;


				barX = (width - barWidth) / 2;
				barY = height - barHeight;

				this.drawRectangleAt(barX, barY, barWidth, barHeight, barColor);
			}
		}, {
			key: "initBall",
			value: function initBall() {
				var context = this.context,
				    width = this.width,
				    height = this.height;


				ballX = width / 2;
				ballY = barY - ballRadius;

				console.log("ballX :", ballX);

				this.drawBallAt(ballX, ballY, ballRadius, 0, 2 * Math.PI);
			}
		}, {
			key: "draw",
			value: function draw() {
				this.initBricks();
				this.initBar();
				this.initBall();

				this.start();
			}
		}, {
			key: "clear",
			value: function clear() {
				var context = this.context,
				    width = this.width,
				    height = this.height;


				context.clearRect(0, 0, width, height);
			}
		}, {
			key: "animateBricks",
			value: function animateBricks() {
				var context = this.context,
				    width = this.width,
				    height = this.height;


				var i = void 0,
				    j = void 0,
				    brickX = 0,
				    brickY = 0,
				    colorID = 0;

				for (i = 0; i < nbrLines; i++) {
					for (j = 0; j < nbrBricksLine; j++) {
						i % 2 ? colorID = 0 : colorID = 1;
						if (tabBricks[i][j] === 1) {
							this.drawRectangleAt(brickX, brickY, brickWidth, brickHeight, brickColor[colorID]);
							playerWin = 0;
						}
						brickX += brickWidth + 3;
						tabBricks[i][j] = 1;
					}
					brickX = 0;
					brickY += brickHeight + 3;
				}
			}
		}, {
			key: "animateBar",
			value: function animateBar(keyPressed) {
				var context = this.context,
				    width = this.width,
				    height = this.height;

				if (keyPressed === arrowRight) {
					barX += barSpeed;
				}

				if (keyPressed === arrowLeft) {
					barX -= barSpeed;
				}

				if (barX < 0) {
					barX = 0;
				}

				if (barX > width - barWidth) {
					barX = width - barWidth;
				}

				this.drawRectangleAt(barX, height - barHeight, barWidth, barHeight, barColor);
			}
		}, {
			key: "animateBall",
			value: function animateBall() {
				var context = this.context,
				    width = this.width,
				    height = this.height;

				if (ballX + ballRadius > width) {
					ballDirX = -1;
				}
				if (ballX - ballRadius < 0) {
					ballDirX = 1;
				}

				if (ballY + ballDirY * ballSpeed > height) {
					this.gameIsLost();
				}
				if (ballY + ballDirY * ballSpeed < 0) {
					ballDirY = 1;
				}

				if (ballX >= barX && ballX <= barX + barWidth && ballY + ballRadius / 2 >= barY && ballY + ballRadius / 2 <= barY + barWidth) {
					ballDirY = -1;
					ballDirX = 2 * (ballX - (barX + barWidth / 2)) - barWidth;
				}

				if (ballY <= bricksHeight) {
					var lineY = Math.floor(ballY / (brickHeight + brickSpace)),
					    lineX = Math.floor(ballX / (brickWidth + brickSpace));
					if (tabBricks[lineY][lineX] === 1) {
						tabBricks[lineY][lineX] = 0;
						ballDirY = 1;
					}
				}

				ballX += ballDirX * ballSpeed;
				ballY += ballDirY * ballSpeed;

				this.drawBallAt(ballX, ballY, ballRadius, 0, 2 * Math.PI);
			}
		}, {
			key: "refreshGame",
			value: function refreshGame(keyPressed) {
				this.clear();
				playerWin = 1;
				this.animateBricks();
				if (playerWin) {
					this.gameIsWin();
				}
				this.animateBar(keyPressed);
				this.animateBall();
			}
		}, {
			key: "findKey",
			value: function findKey(oEvent) {
				var keyID = void 0;


				keyPressed = 0;

				if (oEvent.which === 39) {
					keyPressed = 39;
				}

				if (oEvent.which === 37) {
					keyPressed = 37;
				}

				if (keyPressed) {
					this.refreshGame(keyPressed);
				}
			}
		}, {
			key: "start",
			value: function start() {
				animationRequestID = window.requestAnimationFrame(this.refreshGame.bind(this));
				keyPressed = window.addEventListener("keydown", this.findKey.bind(this));
			}
		}, {
			key: "gameIsLost",
			value: function gameIsLost() {
				window.cancelAnimationFrame(animationRequestID);
				alert("You LOST !");
			}
		}, {
			key: "gameIsWin",
			value: function gameIsWin() {
				window.cancelAnimationFrame(animationRequestID);
				alert("You win !");
			}
		}]);

		return BreakBrick;
	}(CanvApp);

	;

	oApp = new BreakBrick("app");
	oApp.draw();
})();