import {CGFobject} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene, min, max, rockSize) {
    super(scene);
    this.numRocks =(max-min)*Math.random()+min;
    this.rocks = [];
    this.position = [];
    this.rockSize = rockSize;
    this.createRocks();
  }


  createRocks(){
      for(let i = 0; i < this.numRocks;i++){
          this.rocks[i] = new MyRock(this.scene, 6, 6, i, this.rockSize);
          this.position[i] = [this.scene.utils.getRandom(-25,25), 0, this.scene.utils.getRandom(-25,25)];
      }
  }

  display()
  {
      for(let i = 0; i < this.numRocks; i++){
        this.scene.pushMatrix();

        this.scene.translate(this.position[i][0],this.position[i][1]+0.5,this.position[i][2]);
        
        if(this.rocks[i] != null)
          this.rocks[i].display();

        this.scene.popMatrix();
      }
  }

  getRock(pos, r){
    var rock = null;
    for(let i = 0; i < this.numRocks;i++){
      if(this.distance(this.position[i], pos) < r ){
        rock = this.rocks[i];
        this.rocks[i] = null;
        return rock;
      }
    }
  }

  distance(a, b){
    var xDel = a[0] - b[0];
    var yDel = a[1] - b[1];
    var zDel = a[2] - b[2];
    return Math.sqrt(Math.pow(xDel,2) + Math.pow(zDel,2));
  }
}


