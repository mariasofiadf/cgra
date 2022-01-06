import {CGFobject} from '../lib/CGF.js';
import { MyNewCylinder } from './MyNewCylinder.js';
import { CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAnemoneNest extends CGFobject {
	constructor(scene, density, radius, maxRocks) {
		super(scene);
        this.n = density;
        this.r = radius;
        this.tentacle = new MyNewCylinder(this.scene, 10, 10);
        this.randomX = [];
        this.randomY = [];
        this.createAppearance();
        this.rocks = [];
        this.maxRocks = maxRocks;
        this.generateRandom();
	}

    generateRandom(){
        for(let i = 0; i < this.n; i++)
        {
            this.randomX[i] = this.scene.utils.getRandom(35,30);
            this.randomY[i] = this.scene.utils.getRandom(40,50);
        }
    }

    createAppearance(){
        this.anemoneAppearence = new CGFappearance(this.scene);
		this.anemoneAppearence.setAmbient(247/256, 135/256, 80/256,0.37);
        this.anemoneAppearence.setDiffuse(254/256, 173/256, 134/256,0);
        this.anemoneAppearence.setSpecular(254/256, 227/256, 204/256,0);
        this.anemoneAppearence.setEmission(0,0,0,0);
		this.anemoneAppearence.setShininess(20.0);

        this.bodyTexture2 = new CGFtexture(this.scene, "images/nemoD.png");

        this.anemoneAppearence.setTexture(this.bodyTexture2);

        this.shader = new CGFshader(this.scene.gl, "shaders/anemone.vert", "shaders/anemone.frag");
    }
	
    display(){
        this.drawRocks(this.maxRocks);
        

        this.bodyTexture2.bind(this.shader); 

        this.shader.setUniformsValues({ textureOn:true});
        this.scene.setActiveShader(this.shader);
        this.drawTentacles();
        
        this.scene.setActiveShader(this.scene.defaultShader);  
        
        this.bodyTexture2.unbind();      
    }

    drawTentacles(){
        var theta = 0;
        var thetaInc = (2 * Math.PI) / this.n;

        this.anemoneAppearence.apply();
            
        this.scene.gl.enable(this.scene.gl.BLEND);

        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        //this.scene.gl.blendFunc(this.scene.gl.SRC_COLOR, this.scene.gl.DST_COLOR);

        for (let longitude = 0; longitude <= this.n; longitude++){
              //--- Vertices coordinates
            var x = this.r*Math.cos(theta);
            var z = this.r*Math.sin(-theta);
            this.alp = theta;
    
            this.scene.pushMatrix();

            this.scene.translate(x,0,z);
            this.scene.rotate(theta,0,1,0);
            this.scene.scale(0.2, 6.0, 0.2);

            this.shader.setUniformsValues({ timeFactor: this.scene.time/this.randomX[longitude]});   

            this.shader.setUniformsValues({ timeFactor2: this.scene.time/this.randomY[longitude]});   

            this.tentacle.display();

            this.scene.popMatrix();
      
            theta += thetaInc;
        }
        
        //this.scene.gl.disable(this.scene.gl.BLEND);
    }

    drawRocks(numMax){
        var theta = 0;
        var thetaInc = (2 * Math.PI) / numMax;
        for(let i = 0; i < this.rocks.length; i++){
            if(this.rocks[i] == null)
                continue;
            var x = (this.r - 1)*Math.cos(theta);
            var z = (this.r - 1)*Math.sin(-theta);

            this.scene.pushMatrix();
            this.scene.translate(x,1.6,z);
            this.scene.rotate(theta,0,1,0);
            this.scene.scale(3,3,3);
            this.rocks[i].display();
            this.scene.popMatrix();

            theta += thetaInc;
        }
    }


    addRock(rock){
        this.rocks.push(rock);
    }

}

