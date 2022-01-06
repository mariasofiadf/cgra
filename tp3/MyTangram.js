import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle, MyTriangleBig, MyTriangleSmall } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */


var redMask = 0xFF0000, greenMask = 0x00FF00, blueMask = 0x0000FF;

export class MyTangram extends CGFobject{
    constructor(scene) {
		super(scene);
        this.initBuffers();
        //this.createMaterials();
	}

    createMaterials(){
        
        var hex = 0xFF78CF;
        var r = ((hex & redMask) >> 16)/0xFF, 
        g = ((hex & greenMask) >> 8)/0xFF, 
        b = (hex & blueMask)/0xFF;
        scene.material5 = new CGFappearance(scene);
        /*
        this.material5.setAmbient(0,0,0,1.0);
        this.material5.setDiffuse(r,g,b, 1.0);
        this.material5.setSpecular(r/2,g/2,b/2, 1.0);
        this.material5.setShininess(1);
        /*
        hex = 0x0082FF;
        r = ((hex & redMask) >> 16)/0xFF;
        g = ((hex & greenMask) >> 8)/0xFF; 
        b = (hex & blueMask)/0xFF;
        this.scene.material6 = new CGFappearance(this.scene);
        this.scene.material6.setAmbient(0,0,0,1.0);
        this.scene.material6.setDiffuse(r,g,b, 1.0);
        this.scene.material6.setSpecular(r/2,g/2,b/2, 1.0);
        this.scene.material6.setShininess(1);*/
    }

    

    display(){
        //Middle triangle
        this.scene.pushMatrix();

        this.scene.pinkMaterial.apply();
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

        this.scene.blueMat.apply();
        this.scene.triangBig.display();
        
        //Big triangle on the right

        this.scene.translate(-6.5, 1.5, 0);
        
        
        this.scene.orangeMat.apply();
        this.scene.triangBig.display();

        this.scene.popMatrix();
        
        //Square (cat's face)

        this.scene.pushMatrix();

        this.scene.translate(-5.25, 2.75, 0);


        this.scene.customMaterial.apply();
        this.scene.diamond.display();

        this.scene.popMatrix();

        //Left Small Triangle
        this.scene.pushMatrix();

        this.scene.translate(-5.25, 6.75, 0);

        this.scene.redMat.apply();
        this.scene.triangleSmall.display();
        

        //Right Small Triangle
        this.scene.rotate(Math.PI, 0, 0, 1);

        this.scene.purpleMat.apply();
        this.scene.triangleSmall.display();

        this.scene.popMatrix();

        //Parallelogram
        this.scene.pushMatrix();

        this.scene.translate(5, 0, 0);
        
        this.scene.yellowMat.apply();
        this.scene.parall.display();

        this.scene.popMatrix();
        
    }
}