import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
import { CGFappearance} from "../lib/CGF.js";

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {

	constructor(scene, textureMap) {
		super(scene);
		this.initBuffers();
        this.setTextureMap(textureMap);
        this.quad = new MyQuad(this.scene);
        this.createMat();
    }

    createMat(){
        this.quadMaterial = new CGFappearance(this.scene);
        this.quadMaterial.setAmbient(10, 10, 10, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    setTextureMap(texturePack){
        this.textureTop = texturePack[0];
        this.textureFront = texturePack[1];
        this.textureRight = texturePack[2];
        this.textureBack = texturePack[3];
        this.textureBottom = texturePack[4];
        this.textureLeft = texturePack[5];
    }

    display(){

        this.scene.pushMatrix();
        
        this.scene.translate(this.scene.camera.position[0],this.scene.camera.position[1],this.scene.camera.position[2]);
        this.scene.scale(this.scene.size, this.scene.size, this.scene.size); //Aumenta a Paisagem

        this.scene.pushMatrix();

        this.scene.translate(0,0,0.5);

        this.quadMaterial.setTexture(this.textureFront);
        this.quadMaterial.apply();
        if(this.scene.linearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR)
        this.quad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2, 0,1,0);

        this.quadMaterial.setTexture(this.textureRight);
        this.quadMaterial.apply();   
        this.quad.display();


        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI, 0,1,0);
        this.scene.translate(0,0,0.5);

        this.quadMaterial.setTexture(this.textureBack);
        this.quadMaterial.apply();
        
        this.quad.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2, 0,1,0);

        this.quadMaterial.setTexture(this.textureLeft);
        this.quadMaterial.apply();
        this.quad.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);

        this.quadMaterial.setTexture(this.textureTop);
        
        this.quadMaterial.apply();
        if(this.scene.linearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR)
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);

        this.quadMaterial.setTexture(this.textureBottom);
        this.quadMaterial.apply();
        if(this.scene.linearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR)
        this.quad.display();

        this.scene.popMatrix();

        this.scene.popMatrix();
    }


}

