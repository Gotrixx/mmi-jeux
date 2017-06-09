let oApp;

const // Bricks
	nbrLines = 5,
	nbrBricksLine = 7,
	lineSpace = 3,

	// Brick
	brickWidth= 54,
	brickHeight= 15,
	brickSpace = 3,
	brickColor = ["coral", "slateblue"],

	// Bar
	barWidth = 90,
	barHeight = 15,
	barColor = "slateblue",
	barSpeed = 12,

	// Ball
	ballRadius = 8,
	ballColor = "limegreen",
	ballSpeed = 5,

	// Key
	arrowLeft = 37,
	arrowRight = 39,

	// Utils
	refreshInterval = 10;

let // Bricks
	bricksHeight = ( lineSpace + brickHeight ) * nbrLines,

	// Bar
	barX,
	barY,

	// Ball
	ballX,
	ballY,
	ballDirX = 1,
	ballDirY = -1,

	// Utils
	keyPressed = null,
	tabBricks,
	currentTime,
	playerWin = 0,
	gameLoop,
	animationRequestID;

class BreakBrick extends CanvApp {
	drawRectangleAt(x, y, width, height, sColor) {
		let { context } = this;

		context.fillStyle = sColor;
		context.fillRect( x, y, width, height );
	}

	drawBallAt( x, y, radius, start, end ) {
		let { context, width, height } = this;

		context.beginPath();
		context.fillStyle = ballColor;
		context.arc( x, y, radius, start, end );
		context.closePath();
		context.fill();
	}

	initBricks() {
		let { context, width, height } = this;

		let i, j,// compteur
			brickX = 0, brickY = 0,// brick default position
			colorID = 0;

		tabBricks = new Array(nbrLines);

		for ( i = 0; i < nbrLines; i++) {
			tabBricks[i] = new Array(nbrBricksLine);
			for ( j = 0; j < nbrBricksLine; j++ ) {
				i % 2 ? colorID = 0 : colorID = 1;
				this.drawRectangleAt(
					brickX,
					brickY,
					brickWidth,
					brickHeight,
					brickColor[colorID]
				);
				brickX += brickWidth + 3;
				tabBricks[i][j] = 1;// on dit que la brique existe
			}
			brickX = 0;
			brickY += brickHeight + 3;
		}
	}

	initBar() {
		let { context, width, height } = this;

		barX = (width - barWidth) / 2;
		barY = height - barHeight;

		this.drawRectangleAt(
			barX, 
			barY,
			barWidth,
			barHeight,
			barColor
		);
	}

	initBall() {
		let { context, width, height } = this;

		ballX = width / 2;
		ballY = barY - ballRadius;

		console.log("ballX :", ballX);

		this.drawBallAt( ballX, ballY, ballRadius, 0, 2 * Math.PI )

	}

	draw() {
		this.initBricks();
		this.initBar();
		this.initBall();

		this.start();
	}

	clear() {
		let { context, width, height } = this;

		context.clearRect(0, 0, width, height);
	}

	animateBricks() {
		let { context, width, height } = this;

		let i, j,// compteur
			brickX = 0, brickY = 0,// brick default position
			colorID = 0;

		for ( i = 0; i < nbrLines; i++) {
			for ( j = 0; j < nbrBricksLine; j++ ) {
				i % 2 ? colorID = 0 : colorID = 1;
				if (tabBricks[i][j] === 1) {
					this.drawRectangleAt(
						brickX,
						brickY,
						brickWidth,
						brickHeight,
						brickColor[colorID]
					);
					playerWin = 0
				}
				brickX += brickWidth + 3;
				tabBricks[i][j] = 1;// on dit que la brique existe
			}
			brickX = 0;
			brickY += brickHeight + 3;
		}
	}

	animateBar( keyPressed ) {
		let { context, width, height } = this;

		// Déplacement a droite
		if ( keyPressed === arrowRight ) {
			barX += barSpeed;
		}

		// Déplacement a gauche
		if ( keyPressed === arrowLeft ) {
			barX -= barSpeed;	
		}

		// Choc bord gauche
		if ( barX < 0 ) {
			barX = 0
		}

		// Choc bord droit
		if ( barX > width - barWidth ) {
			barX = width - barWidth
		}

		this.drawRectangleAt(
			barX, 
			height - barHeight,
			barWidth,
			barHeight,
			barColor
		);
	}

	animateBall() {
		let { context, width, height } = this;

		// Choc avec les bord gauche et droite
		if ( ( ballX + ballRadius ) > ( width ) ) {
			ballDirX = -1;
		}
		if ( ( ballX - ballRadius ) < 0 ) {
			ballDirX = 1;
		}
		// Choc avec le bord bas
		if( ( ballY + ballDirY * ballSpeed ) > ( height ) ) {
			this.gameIsLost();
		}
		if ( ( ballY + ballDirY * ballSpeed ) < 0 ) {
		ballDirY = 1;
		}
		// Choc avec la barre
		if ( ballX >= barX &&
			 ballX <= barX + barWidth &&
			 ballY + ballRadius / 2 >= barY &&
			 ballY + ballRadius / 2 <= barY + barWidth ) {
			ballDirY = -1;
			ballDirX = 2 * ( ballX - ( barX + barWidth / 2 ) ) - barWidth;
		}	

		// Choc avec les briques
		if ( ballY <= bricksHeight) {
			let lineY = Math.floor( ballY / ( brickHeight + brickSpace ) ),
				lineX = Math.floor( ballX / ( brickWidth + brickSpace ) )
			if ( tabBricks[lineY][lineX] === 1 ) {
				tabBricks[lineY][lineX] = 0;
				ballDirY = 1;
			}

			// console.log( tabBricks[lineY][lineX] );
		}

		// mouvement de la balle
		ballX += ballDirX * ballSpeed;
		ballY += ballDirY * ballSpeed;

		this.drawBallAt( ballX, ballY, ballRadius, 0, 2 * Math.PI )

		// console.log("barX :", barX, "barY :", barY);
		// console.log("ballX :", ballX, "ballY :", ballY);
	}

	refreshGame( keyPressed ) {
		this.clear();
		playerWin = 1;
		this.animateBricks()
		if (playerWin){
			this.gameIsWin();
		}
		this.animateBar( keyPressed );
		this.animateBall();
	}

	findKey( oEvent ) {
		let keyID;
		// https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

		keyPressed = 0;

		// flèche droite
		if ( oEvent.which === 39 ) {
			keyPressed = 39;
		}

		//flèche gauche
		if ( oEvent.which === 37 ) {
			keyPressed = 37;
		}

		if ( keyPressed ) {
			this.refreshGame( keyPressed );
		}
	}

	start() {
		animationRequestID = window.requestAnimationFrame( this.refreshGame.bind( this ) );
		keyPressed = window.addEventListener( "keydown", this.findKey.bind( this ) );
	}

	gameIsLost() {
		window.cancelAnimationFrame( animationRequestID );
		alert("You LOST !");
	}

	gameIsWin() {
		window.cancelAnimationFrame( animationRequestID );
		alert("You win !");
	}
};

oApp = new BreakBrick( "app" );
oApp.draw();
// document.addEventListener( "load", oApp.start() );
