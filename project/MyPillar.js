import {CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { CGFappearance, CGFtexture} from "../lib/CGF.js";
/**
 * MyPillar
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPillar extends CGFobject {
	constructor(scene, quantity) {
		super(scene);
        this.nPillar = quantity;
        this.pillar = new MyCylinder(this.scene, 12);
        this.position = [];
        this.createAppearance();
        this.createPillar();    
	}

    createAppearance(){
        this.pillarAppearance = new CGFappearance(this.scene);
		this.pillarAppearance.setAmbient(1, 1, 1, 1.0);
        this.pillarAppearance.setDiffuse(1, 1, 1, 1.0);
        this.pillarAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.pillarAppearance.setEmission(0,0,0,1);
		this.pillarAppearance.setShininess(10);

        this.pillarText = new CGFtexture(this.scene, 'images/wood_pillar.jpg');
        this.pillarAppearance.setTexture(this.pillarText);
        this.pillarAppearance.setTextureWrap('REPEAT','REPEAT');
    }

    getRandom(from, to){
        return (to-from)*Math.random()+from;
    }

    createPillar(){
        //var x = 0;
        //var z = 0;
        //


        this.position[0] = [5, 0, 0.08];
        this.position[1] = [20, 0, 0.08];
        this.position[2] = [5, 0, -3.8];
        this.position[3] = [20, 0, -3.8];
    }
	
    display(){
        //var theta = 0;
        //var thetaInc = (2 * Math.PI) / this.n;
        for (let i = 0; i < this.nPillar; i++){
            this.scene.pushMatrix();

            this.scene.translate(this.position[i][0],this.position[i][1],this.position[i][2]);
            this.scene.scale(0.5, 10, 0.5);
            this.pillarAppearance.apply();
                
            this.pillar.display();

            this.scene.popMatrix();
        }

    }

}

