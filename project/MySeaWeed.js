import {CGFobject} from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';
import { CGFappearance} from "../lib/CGF.js";
/**
 * MySeaWeed
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaWeed extends CGFobject {
	constructor(scene, quantity) {
		super(scene);
        this.nPyramids = quantity;
        this.pyramid = new MyPyramid(this.scene, 6);
        this.pyramids = [];
        this.position = [];
        this.appearences = [];
        this.vScale = [];
        this.hScale = [];
        this.createPyramids();
	}

    createAppearance(r, g,b){
        this.seaWeedAppearance = new CGFappearance(this.scene);
		this.seaWeedAppearance.setAmbient(0.29 +r, .4+g, 0.13+b, 1.0);
        this.seaWeedAppearance.setDiffuse(0.0+r, .36 +g, 0.13+b, 1.0);
        this.seaWeedAppearance.setSpecular(0.0+r, 0.2+g, 0.05+b, 1.0);
        this.seaWeedAppearance.setEmission(0,0,0,1);
		this.seaWeedAppearance.setShininess(1);
        return this.seaWeedAppearance;
        //this.seaWeedText = new CGFtexture(this.scene, 'images/wood_pillar.jpg');
        //this.seaWeedAppearance.setTexture(this.pillarText);
    }

    createPyramids(){
        for (let i = 0; i < this.nPyramids; i++){
            this.position[i] = [this.scene.utils.getRandom(-0.3,0.3), 0, this.scene.utils.getRandom(-0.3,0.3)];
            this.appearences[i] = this.createAppearance(this.scene.utils.getRandom(0.0,0.1),this.scene.utils.getRandom(0.0,0.3),this.scene.utils.getRandom(0.0,0.1  ));
            this.vScale[i] = this.scene.utils.getRandom(0.7, 1.4);
            this.hScale[i] = this.scene.utils.getRandom(1.0, 1.6);
        }
    }
	
    display(){
        var r, g, b;
        for (let i = 0; i < this.nPyramids; i++){   
            this.scene.pushMatrix();

            this.scene.translate(this.position[i][0],this.position[i][1] +0.2,this.position[i][2]);

            this.scene.scale(0.1* this.hScale[i], 1.5 * this.vScale[i], 0.1* this.hScale[i]);
            
            //this.createAppearance(0,0,0);

            this.appearences[i].apply();
        
            this.pyramid.display();

            this.scene.popMatrix();
        }

    }

}

