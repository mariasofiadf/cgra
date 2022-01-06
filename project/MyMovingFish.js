import {MyMovingObject} from './MyMovingObject.js';
/**
 * 
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFish extends MyMovingObject {
	constructor(scene, p, vel, ang, fish) {
        super(scene, p, vel, ang);
        this.fish = fish;
		this.nestMinH = 2.8; //min height in nest
		this.floorMinH = 1.4; //min height on the floor
	}


	display(){
		this.scene.pushMatrix();

		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
		this.scene.rotate(this.ang, 0,1,0);

		this.fish.display();

		this.scene.popMatrix();
	}

	turn(val){
		if(val > 0)
			this.fish.turnLeft();
		else
			this.fish.turnRight();
		super.turn(val);
	}
	
	accelerate(val){
		this.fish.fast(val);
		super.accelerate(val);
	}

	reset(){
		this.fish.tailSpeed = 1;
		this.fish.rightFinSpeed = 0.5;
		this.fish.leftFinSpeed = 0.5;
		super.reset();
	}

	grabRock(rockSet){
		if(this.aboveNest() && this.isNearFloor() && this.fish.rock != null && this.scene.anemone.rocks.length < this.scene.anemone.maxRocks) // Releases rock on the nest
		{
			this.scene.anemone.addRock(this.fish.rock);
			this.fish.rock = null;
		}
		else if (this.isNearFloor() && this.fish.rock == null ){
			this.fish.rock = this.selectRock(rockSet, 1.5);
		}
	}	

	selectRock(rockSet, r){
		return rockSet.getRock(this.pos, r);
	}

	update(){
		
		this.pos[0] += this.vel*Math.sin(this.ang)*this.scene.speedFactor;
		if(!this.isInsideScene()){ //Prevents Player from going out of the CubeQuad on x Axis
			this.pos[0] -= this.vel*Math.sin(this.ang)*this.scene.speedFactor;
		}

		this.pos[2] += this.vel*Math.cos(this.ang)*this.scene.speedFactor;
		if(!this.isInsideScene()){//Prevents Player from going out of the CubeQuad on y Axis
			this.pos[2] -= this.vel*Math.cos(this.ang)*this.scene.speedFactor;
		}

		if(this.pos[1] < this.scene.maxHeight && this.buoyancy > 0) //Rises fish to Uppper limit
			this.pos[1] += this.ySpeed;
		
		else if(this.scene.utils.aboveNest(this.pos)){ // If fish is above nest it moves fish to Lower Limit (which is this.nestMinH )
			if(this.pos[1] > this.nestMinH && this.buoyancy < 0)
				this.pos[1] -= this.ySpeed;
			else if(this.buoyancy < 0)
				this.pos[1] = this.nestMinH;
		}
		else if(this.pos[1] > this.floorMinH && this.buoyancy < 0) // If fish is NOT above nest it moves fish to Lower Limit (which is this.floorMinH )
			this.pos[1] -= this.ySpeed;
	}

	isNearFloor(){
		if(this.scene.utils.aboveNest(this.pos))
			return (this.pos[1] <= this.nestMinH);
		return (this.pos[1] <= this.floorMinH);
	}

	aboveNest(){
		var r = this.scene.anemone.r;
		return !(this.pos[0] > r || this.pos[0] < -r ||this.pos[2] > r ||this.pos[2] < -r);
	}


	reset()
	{	
		if(this.fish.rock != null){
			this.scene.rockSet.rocks[this.fish.rock.index] = this.fish.rock;
			this.fish.rock = null;
		}
		super.reset();
	}

	isInsideScene(){
		var limit = this.scene.size/2
		if(this.pos[0] <= -limit || this.pos[0] >= limit)
			return false;
		if(this.pos[2] <= -limit || this.pos[2] >= limit)
			return false;
		return true;
	}

}


