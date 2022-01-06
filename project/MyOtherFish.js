import { MyMovingObject } from './MyMovingObject.js';
import { MySphere } from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';
import { CGFscene, CGFappearance} from "../lib/CGF.js";


export class MyOtherFish extends MyMovingObject{
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, p, vel, ang, turnRate, scaleFactor, generalScale, finRGB, bodyRGB) {
    super(scene, p, vel, ang);
   
    this.sphere = new MySphere(this.scene, 10, 10);
    this.triangle = new MyTriangle(this.scene);
    this.tailSpeed = 1;
    this.leftFinSpeed = 0.5;
    this.rightFinSpeed = 0.5;
    this.turnRate = turnRate;
    this.scaleFactor = scaleFactor;
    this.finRGB = finRGB;
    this.bodyRGB = bodyRGB;
    this.generalScale = generalScale;
    this.createAppearence();
    this.createWhiteApperence();
    this.initBuffers();

  }

  display(){

    this.scene.pushMatrix();
    this.scene.scale(this.generalScale,this.generalScale,this.generalScale);
    this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
    
		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);

		this.scene.rotate(this.ang, 0,1,0);
    
    
    
    this.drawBody();

    this.drawTail();

    this.drawDorsal();

    this.drawSideFins();
    
    this.drawEyes();
    
    this.scene.popMatrix();
  }

  createWhiteApperence(){
    this.whiteMat2 = new CGFappearance(this.scene);
    this.whiteMat2.setAmbient(0.8,0.8,0.8,1.0);
    this.whiteMat2.setDiffuse(0.9,0.9,0.9, 1.0);
    this.whiteMat2.setSpecular(1,1,1, 1.0);
    this.whiteMat2.setShininess(100);

    //http://www.clker.com/clipart-eye-ball-orange.html
    this.whiteMat2.loadTexture("images/doriEye.png");
  }



  createAppearence(){

    this.bodyAppearence2 = new CGFappearance(this.scene);
		this.bodyAppearence2.setAmbient(this.bodyRGB[0], this.bodyRGB[1], this.bodyRGB[2],1.0);
    this.bodyAppearence2.setDiffuse(this.bodyRGB[0], this.bodyRGB[1], this.bodyRGB[2],1.0);
    this.bodyAppearence2.setSpecular(this.bodyRGB[0], this.bodyRGB[1], this.bodyRGB[2], 1.0);
    this.bodyAppearence2.setEmission(this.bodyRGB[0], this.bodyRGB[1], this.bodyRGB[2],1);
		this.bodyAppearence2.setShininess(20.0);


    this.finAppearence = new CGFappearance(this.scene);
		this.finAppearence.setAmbient(this.finRGB[0], this.finRGB[1], this.finRGB[2],1.0);
    this.finAppearence.setDiffuse(this.finRGB[0], this.finRGB[1], this.finRGB[2],1.0);
    this.finAppearence.setSpecular(this.finRGB[0], this.finRGB[1], this.finRGB[2],1.0);
    this.finAppearence.setEmission(this.finRGB[0], this.finRGB[1], this.finRGB[2],1);
		this.finAppearence.setShininess(20.0);

    //this.bodyTexture = new CGFtexture(this.scene, "images/nemoD.png");

    //this.shader = new CGFshader(this.scene.gl, "shaders/fish2.vert", "shaders/fish2.frag");

    //this.bodyAppearence2.setTexture(this.bodyTexture);

  }

  drawTail(){

    this.scene.pushMatrix();

    this.scene.translate(0,0, -0.5);

    this.alphaT = (20*Math.PI/180)*Math.cos(this.scene.time*this.tailSpeed);
    
    this.scene.rotate(this.alphaT, 0,1,0);
    this.scene.rotate(-Math.PI/2, 0, 0,1);
    this.scene.rotate(-Math.PI/2, 1, 0,0);

    
    this.scene.scale(0.4,0.4,0.4);

    this.finAppearence.apply();

    this.triangle.display();

    this.scene.popMatrix();

  }

  drawBody(){
    this.scene.pushMatrix();

    this.scene.scale(0.2, 0.5, 0.6);

    this.bodyAppearence2.apply();

    this.sphere.display();
    
    
    this.scene.popMatrix();
  }


  drawDorsal(){
    this.scene.pushMatrix();
    
    this.scene.translate(0,0.5,0.15);

    this.scene.scale(0.35,0.17,0.35);
    
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.rotate(-Math.PI/2, 0, 1, 0);

    this.finAppearence.apply();

    this.triangle.display();

    this.scene.popMatrix();
  }

  drawSideFins(){

    /*Left Fin*/ 
    this.scene.pushMatrix();
    
    this.scene.translate(0.23,0,0);
    this.scene.scale(0.2,0.2,0.2);
    

    if(this.leftFinSpeed != 0)
      this.alphaL = (25*Math.PI/180)*Math.cos(this.scene.time*this.leftFinSpeed);
    
    this.scene.rotate(this.alphaL, 0,0,1);
    this.scene.rotate( -Math.PI/8, 0, 0, 1);
    this.scene.rotate( Math.PI/8, 0, 1, 0);
    this.scene.rotate( -Math.PI/2, 1, 0, 0);
    this.scene.translate(1,-1,0);


    this.finAppearence.apply();

    this.triangle.display();

    this.scene.popMatrix();

    /*Right Fin*/ 
    this.scene.pushMatrix();

    this.scene.translate(-0.23,0,0);
    this.scene.scale(0.2,0.2,0.2);
    
    if(this.rightFinSpeed != 0)
      this.alphaR = -(25*Math.PI/180)*Math.cos(this.scene.time*this.rightFinSpeed);
    
    this.scene.rotate(this.alphaR, 0,0,1);

    this.scene.rotate( Math.PI/8, 0, 0, 1);
    this.scene.rotate( -Math.PI/8, 0, 1, 0);
    this.scene.rotate( -Math.PI/2, 1, 0, 0);
    this.scene.translate(-1,-1,0);
    

    this.finAppearence.apply();

    this.triangle.display();

    this.scene.popMatrix();
  }

  drawEyes(){
    //Left eye
    this.scene.pushMatrix();
    
    this.scene.translate(0.06,0.15,0.45);
    this.scene.scale(0.1, 0.08, 0.08);
    this.scene.rotate(5*Math.PI/6 ,0,1,0);

    this.whiteMat2.apply();

    this.sphere.display();

    this.scene.popMatrix();


    //Right eye

    this.scene.pushMatrix();
    
    this.scene.translate(-0.06,0.15,0.45);
    this.scene.scale(0.1, 0.08, 0.08);

    this.scene.rotate(Math.PI/6 ,0,1,0);

    this.whiteMat2.apply();

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
  

  update()
  {
    this.turn(this.turnRate);
    super.update();
  }
}
