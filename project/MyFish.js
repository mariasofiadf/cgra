import {CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';
import { CGFscene, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";

export class MyFish extends CGFobject{
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene) {
    super(scene);
    this.initBuffers();
    this.createAppearence();
    this.createWhiteApperence();
    this.sphere = new MySphere(this.scene, 15, 15);
    this.triangle = new MyTriangle(this.scene);
    this.tailSpeed = 1;
    this.leftFinSpeed = 0.5;
    this.rightFinSpeed = 0.5;
    this.rock = null;
  }

  display(){

    this.scene.pushMatrix();
    
    //this.scene.translate(0.0,this.scene.maxHeight,0.0);
    
    this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
    
    this.drawRock();

    this.bodyAppearence.apply();

    this.bodyTexture.bind(this.shader);
    this.scene.setActiveShader(this.shader);
    
    this.shader.setUniformsValues({ textureOn:true});

    
    this.drawBody();
    
    this.shader.setUniformsValues({ textureOn:false});

    this.drawTail();

    this.drawDorsal();

    this.drawSideFins();
    
    this.whiteMat.apply();


    this.shader.setUniformsValues({ textureOn:true});
    this.drawEyes();

    this.scene.setActiveShader(this.scene.defaultShader);
    
    this.bodyTexture.unbind();
    
    this.scene.popMatrix();
  }

  createWhiteApperence(){
    this.whiteMat = new CGFappearance(this.scene);
    this.whiteMat.setAmbient(0.8,0.8,0.8,1.0);
    this.whiteMat.setDiffuse(0.9,0.9,0.9, 1.0);
    this.whiteMat.setSpecular(1,1,1, 1.0);
    this.whiteMat.setShininess(100);

    //http://www.clker.com/clipart-eye-ball-orange.html
    this.whiteMat.loadTexture("images/fishEye.jpg");
  }

  createAppearence(){

    this.bodyAppearence = new CGFappearance(this.scene);
		this.bodyAppearence.setAmbient(250/256, 55/256, 16/256,1.0);
    this.bodyAppearence.setDiffuse(250/256, 76/256, 16/256,1.0);
    this.bodyAppearence.setSpecular(250/256, 76/256, 16/256,1.0);
    this.bodyAppearence.setEmission(0,0,0,1);
		this.bodyAppearence.setShininess(20.0);

    this.bodyTexture = new CGFtexture(this.scene, "images/nemoD.png");

    this.shader = new CGFshader(this.scene.gl, "shaders/fish2.vert", "shaders/fish2.frag");

    this.bodyAppearence.setTexture(this.bodyTexture);

  }

  drawRock(){
    if(this.rock==null)
      return;
    this.scene.pushMatrix();
    this.scene.translate(0,-0.25,0.45);
    this.rock.display();
    this.scene.popMatrix();

  }

  drawTail(){

    this.scene.pushMatrix();

    this.scene.translate(0,0, -0.5);

    this.alphaT = (20*Math.PI/180)*Math.cos(this.scene.time*this.tailSpeed);
    
    this.scene.rotate(this.alphaT, 0,1,0);
    this.scene.rotate(-Math.PI/2, 0, 0,1);
    this.scene.rotate(-Math.PI/2, 1, 0,0);

    this.scene.scale(0.4,0.4,0.4);

    this.triangle.display();

    this.scene.popMatrix();

  }

  drawBody(){
    this.scene.pushMatrix();

    this.scene.scale(0.3, 0.4, 0.5);

    this.sphere.display();
    
    this.scene.popMatrix();
  }

  drawDorsal(){
    this.scene.pushMatrix();
    
    this.scene.translate(0,0.37,0.15);

    this.scene.scale(0.35,0.35,0.35);
    
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.rotate(-Math.PI/2, 0, 1, 0);

    this.triangle.display();

    this.scene.popMatrix();
  }

  drawSideFins(){

    /*Left Fin*/ 
    this.scene.pushMatrix();
    
    this.scene.translate(0.3,0,0);
    this.scene.scale(0.2,0.2,0.2);
    

    if(this.leftFinSpeed != 0)
      this.alphaL = (25*Math.PI/180)*Math.cos(this.scene.time*this.leftFinSpeed);
    
    this.scene.rotate(this.alphaL, 0,0,1);
    this.scene.rotate( -Math.PI/8, 0, 0, 1);
    this.scene.rotate( Math.PI/8, 0, 1, 0);
    this.scene.rotate( -Math.PI/2, 1, 0, 0);
    this.scene.translate(1,-1,0);


    this.triangle.display();

    this.scene.popMatrix();

    /*Right Fin*/ 
    this.scene.pushMatrix();

    this.scene.translate(-0.3,0,0);
    this.scene.scale(0.2,0.2,0.2);
    
    if(this.rightFinSpeed != 0)
      this.alphaR = -(25*Math.PI/180)*Math.cos(this.scene.time*this.rightFinSpeed);
    
    this.scene.rotate(this.alphaR, 0,0,1);

    this.scene.rotate( Math.PI/8, 0, 0, 1);
    this.scene.rotate( -Math.PI/8, 0, 1, 0);
    this.scene.rotate( -Math.PI/2, 1, 0, 0);
    this.scene.translate(-1,-1,0);

    this.triangle.display();

    this.scene.popMatrix();
  }

  drawEyes(){
    //Left eye
    this.scene.pushMatrix();
    
    this.scene.translate(0.18,0,0.35);
    this.scene.scale(0.1, 0.08, 0.08);
    this.scene.rotate(5*Math.PI/6 ,0,1,0);

    this.sphere.display();

    this.scene.popMatrix();

    //Right eye

    this.scene.pushMatrix();
    
    this.scene.translate(-0.18,0,0.35);
    this.scene.scale(0.1, 0.08, 0.08);

    this.scene.rotate(Math.PI/6 ,0,1,0);


    this.sphere.display();

    this.scene.popMatrix();

  }

  turnLeft(){
    this.leftFinSpeed = 0;
  }

  turnRight(){
    this.rightFinSpeed = 0;
  }

  noRotation(){
    this.rightFinSpeed = 0.5;
    this.leftFinSpeed = 0.5;
  }

  fast(val){
    //val equal -1 or 1
    //-1 -> slows down; 1 ->speeds up
    this.tailSpeed += 0.1 * val;
  }

  
}
