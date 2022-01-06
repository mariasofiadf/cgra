import {MyMovingObject} from './MyMovingObject.js';
import {MyOtherFish} from './MyOtherFish.js'

/**
 * 
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFishSet extends MyMovingObject {
	constructor(scene, nFish) {
        super(scene);
		this.fishSet = [];
		this.nFish = nFish;
		this.createFish();
	}

	createFish(){
        for (let i = 0; i < this.nFish; i++){
            var x = this.scene.utils.getRandom(-18, 18);
			//Math.random()*40 - 20;
			var y = this.scene.utils.getRandom(3, 8);
			var z = this.scene.utils.getRandom(-18, 18);
			var s = this.scene.utils.getRandom(0.2, 0.5); // speed
			//Scale factors
			var xyzscaleFactor = [this.scene.utils.getRandom(0.2,0.4),
				this.scene.utils.getRandom(0.4,0.6),
				this.scene.utils.getRandom(0.6,0.8)]
			var generalScale = this.scene.utils.getRandom(0.8,1.1);
	
			var turnRate = this.scene.utils.getRandom(0.4, 0.8);

			if(this.scene.utils.getRandom(0,1) < 0.5)
				turnRate = -turnRate;
			var startAng = this.scene.utils.getRandom(0,1)*2*Math.PI;
            var pos = [x,y,z];
			var finColor = [this.scene.utils.getRandom(0.2,0.8),this.scene.utils.getRandom(0.1,0.4),this.scene.utils.getRandom(0.2 ,0.7)]
            var bodyColor = [this.scene.utils.getRandom(0.2,0.8),this.scene.utils.getRandom(0.2,0.8),this.scene.utils.getRandom(0.2,0.8)]
			this.fishSet[i] = new MyOtherFish(this.scene, pos, s, startAng, turnRate, xyzscaleFactor, generalScale, finColor, bodyColor);
        }
    }
	

	update(){
		for (let i = 0; i < this.nFish; i++){
            this.fishSet[i].update();
        }
	}

	display(){
		for (let i = 0; i < this.nFish; i++){
            this.fishSet[i].display();
        }
	}
}


