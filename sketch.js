function setup(){
	createCanvas(windowWidth, windowHeight);
}

let ball = {
	x: 50, //x position of the ball
	y: 25, //y position of the ball
	d: 50, //diameter of the ball
	grav: 6.7, //flat rate of gravity when released
	acc: 1, //acceleration of gravity (default is no acceleration)
	speed: 1, //the total sum of all factors affecting position
	hitbox: 30, //range from the ball's center that it can be picked up from
	upthrow: 1, //the distance between the mouse's previous position and the current position after releasing the ball
	rightthrow: 0, //same as above except for horizontal tosses
	throwMultiplier: .38, //how much extra inertia is added after thowing
	friction: true, //determines if friction is on or not
	carried: false, //determines if the ball is currently being held
};

function draw(){
	background(0); //reset background

//following section dictates behaviours of the ball

	if(mouseIsPressed && mouseX <= ball.x + ball.hitbox && mouseX >= ball.x - ball.hitbox && mouseY <= ball.y + ball.hitbox && mouseY >= ball.y - ball.hitbox){ //ask if mouse is over the circle and you click
		ball.carried = true;
		ball.hitbox = 9999; //increase hitbox to make it convenient to hold once picked up
		ball.upthrow = mouseY - pmouseY; //find the distance between the mouse's previous position and the current one
		ball.rightthrow = mouseX - pmouseX; //above axcept horizontal


		ball.acc = 1; //stop acceleration
		ball.y = mouseY; //ball follows the mouseY
		ball.x = mouseX; //ball follows the mouseX
	}
	else{
		ball.carried = false;
		ball.hitbox = 30; //return to standard hitbox

		ball.acc = ball.acc * 1.05; //increase 'acc' exponentially to mimic real gravity's acceleration
		ball.speed = (ball.grav * ball.acc); //gather all info for position change
		ball.y = ball.y + ball.speed + (ball.upthrow * ball.throwMultiplier); //add the current speed to the current position
		ball.x = ball.x + (ball.rightthrow * ball.throwMultiplier);
	}

	//holding a key will disable friction
	if(keyIsPressed && ball.friction == true){
		ball.friction = false;
	}
	if(!keyIsPressed && ball.friction == false){
		ball.friction = true;
	}

	if(ball.y >= windowHeight - 29){ //this section stops the ball from falling past the bottom of the screen
		ball.y = windowHeight - 29;
		if(ball.friction == true){
			ball.rightthrow = 0;
		}
	}
	if(ball.y <= 25){ //stops the ball from going over the top of the screen
		ball.y = 25;
		ball.upthrow = 0;
	}

	if(ball.x <= -26){ //stops ball leaving the left screen
		ball.x = windowWidth + 24;
	}
	if(ball.x >= windowWidth + 26){
		ball.x = -24;
	}

	noStroke();									//draw the ball
	fill(0, 0, 255);							//^
	ellipse(ball.x, ball.y, ball.d, ball.d);	//^
}

function windowResized(){  //resize the canvas if the window changes
  resizeCanvas(windowWidth, windowHeight);
}