import {CGFobject} from '../lib/CGF.js';

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene, p, vel, ang) {
		super(scene);
		this.pos = p;
		this.vel = vel;
		this.ang = ang;
		this.initBuffers();
        this.speed = 0.05;
        this.rotSpeed = 0.1;
		this.buoyancy = 1; // -1 sinks and 1 floats
		this.ySpeed = 0.1;
		this.maxSpeed = 1;
	}

	turn(val){
		this.ang += this.rotSpeed*val;
	}

	accelerate(val){
		if(this.vel <= this.maxSpeed){
			this.vel += this.speed*val;
		}
		else
			this.vel = this.vel/Math.abs(this.vel) * this.maxSpeed;
	}

	setBuoyancy(val){
		this.buoyancy = val;
	}

	reset(){
		this.vel = 0;
		this.pos = [0,5,0];
		this.ang = 0;
	}

	update(){
		this.pos[0] += this.vel*Math.sin(this.ang)*this.scene.speedFactor;
		this.pos[2] += this.vel*Math.cos(this.ang)*this.scene.speedFactor;
	}


	display(){
		this.scene.pushMatrix();

		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
		this.scene.rotate(this.ang, 0,1,0);

		this.scene.fish.display();

		this.scene.popMatrix();
	}



}


