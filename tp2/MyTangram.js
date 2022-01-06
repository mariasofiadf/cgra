import {CGFobject} from '../lib/CGF.js';
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
	}

    display(){

        //Middle triangle
        this.scene.pushMatrix();

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

        this.scene.triangBig.display();
        
        //Big triangle on the right

        this.scene.translate(-6.5, 1.5, 0);
        
        this.scene.triangBig.display();

        this.scene.popMatrix();
        
        //Square (cat's face)

        this.scene.pushMatrix();

        this.scene.translate(-5.25, 2.25, 0);

        this.scene.diamond.display();

        this.scene.popMatrix();

        //Left Small Triangle
        this.scene.pushMatrix();

        this.scene.translate(-5.25, 6.25, 0);

        this.scene.triangleSmall.display();
        

        //Right Small Triangle
        this.scene.rotate(Math.PI, 0, 0, 1);

        this.scene.triangleSmall.display();

        this.scene.popMatrix();

        //Parallelogram
        this.scene.pushMatrix();

        this.scene.translate(5, 0, 0);
        
        this.scene.parall.display();

        this.scene.popMatrix();
        
    }

}