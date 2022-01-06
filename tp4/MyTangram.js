import {CGFobject} from '../lib/CGF.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle, MyTriangleBig, MyTriangleSmall } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject{
    constructor(scene) {
		super(scene);
        this.initBuffers();
        this.materialTangram = new CGFappearance(this.scene);

        this.tangramTexture = new CGFtexture(scene, 'images/tangram.png');
        
        this.materialTangram = new CGFappearance(this.scene);
        this.materialTangram.setAmbient(1, 1, 1, 1.0);
        this.materialTangram.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.materialTangram.setSpecular(1, 1, 1, 1.0);
        this.materialTangram.setShininess(50.0);
        this.materialTangram.setTexture(this.tangramTexture);
        //this.materialTangram.loadTexture(this.tangramTexture);
        this.materialTangram.setTextureWrap('REPEAT', 'REPEAT');
        
	}

    display(){

        //Middle triangle
        this.scene.pushMatrix();
        
        this.scene.triangle1.setPink();

        this.materialTangram.apply();
        //this.materialTangram.apply();
        this.scene.triangle1.display();
        
        this.scene.popMatrix();

        var transl = [

        1, 0, 0, 0,
        
        0, 1, 0, 0,
        
        0, 0, 1, 0,
        
        -1, -1, 0, 1
        
        ];

        //Big triangle on the left
        this.scene.pushMatrix();

        this.scene.multMatrix(transl);

        this.scene.triangBig.setBlue();
        
        this.scene.triangBig.display();
        
        //Big triangle on the right
        
        this.scene.translate(-6.5, 1.5, 0);
        
        this.scene.triangBig.setOrange();
        this.scene.triangBig.display();

        this.scene.popMatrix();
        
        //Square (cat's face)

        this.scene.pushMatrix();

        this.scene.translate(-5.25, 2.75, 0);

        
        this.scene.diamond.setGreen();
        this.scene.diamond.display();

        this.scene.popMatrix();

        //Left Small Triangle
        this.scene.pushMatrix();

        this.scene.translate(-5.25, 6.75, 0);

        //this.materialTangram.apply();
        
        this.scene.triangleSmall.setRed();
        this.scene.triangleSmall.display();
        

        //Right Small Triangle
        this.scene.rotate(Math.PI, 0, 0, 1);

        this.scene.triangleSmall.setPurple();
        this.scene.triangleSmall.display();

        this.scene.popMatrix();

        //Parallelogram
        this.scene.pushMatrix();

        this.scene.translate(5, 0, 0);
        
        this.scene.parall.setYellow();
        this.scene.parall.display();

        this.scene.popMatrix();
        
    }


}