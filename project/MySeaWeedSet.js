import {CGFobject} from '../lib/CGF.js';
import { MySeaWeed } from './MySeaWeed.js';
/**
 * MySeaWeedSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaWeedSet extends CGFobject {
	constructor(scene, quantity) {
		super(scene);
        this.nSets = quantity;
        this.seaWeed = [];
        this.position = [];
        this.createSeaWeed();    
	}

    createSeaWeed(){
        var n = 0; //Number of cones in the small group
        for (let i = 0; i < this.nSets; i++){
            n = this.scene.utils.getRandom(2,5);
            this.position[i] = [this.scene.utils.getRandom(-25,25), 0, this.scene.utils.getRandom(-25,25)];
            this.seaWeed[i] = new MySeaWeed(this.scene, n);
        }
    }
	
    display(){
        for (let i = 0; i < this.nSets; i++){
            this.scene.pushMatrix();

            this.scene.translate(this.position[i][0],this.position[i][1],this.position[i][2]);

            this.seaWeed[i].display();

            this.scene.popMatrix();
        }

    }

}

