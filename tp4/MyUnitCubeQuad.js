import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {

	constructor(scene, top, front, right , behind, left, bottom) {
		super(scene);
		this.initBuffers();
        this.textureTop = top;
        this.textureFront = front;
        this.textureRight = right;
        this.textureBehind = behind;
        this.textureBottom = bottom;
        this.textureLeft = left;
    }
    
    display(){
        this.scene.pushMatrix();

        this.scene.translate(0,0,0.5);

        
        this.scene.quadMaterial.setTexture(this.textureFront);
        this.scene.quadMaterial.apply();
        if(this.scene.linearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR)
        this.scene.quad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2, 0,1,0);

        this.scene.quadMaterial.setTexture(this.textureRight);
        this.scene.quadMaterial.apply();   
        this.scene.quad.display();


        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI, 0,1,0);
        this.scene.translate(0,0,0.5);

        this.scene.quadMaterial.setTexture(this.textureBehind);
        this.scene.quadMaterial.apply();
        
        this.scene.quad.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2, 0,1,0);

        this.scene.quadMaterial.setTexture(this.textureLeft);
        this.scene.quadMaterial.apply();
        this.scene.quad.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);

        this.scene.quadMaterial.setTexture(this.textureTop);
        
        this.scene.quadMaterial.apply();
        if(this.scene.linearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR)
        this.scene.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);

        this.scene.quadMaterial.setTexture(this.textureBottom);
        this.scene.quadMaterial.apply();
        if(this.scene.linearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR)
        this.scene.quad.display();

        this.scene.popMatrix();
    }
}

