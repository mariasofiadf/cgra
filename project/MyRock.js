import {CGFobject} from '../lib/CGF.js';
import { CGFscene, CGFappearance } from "../lib/CGF.js";

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, index = null, size) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.xScale = this.scene.utils.getRandom(0.2, 1.0);
    this.yScale = this.scene.utils.getRandom(0.2, 0.5);
    this.zScale = this.scene.utils.getRandom(0.2, 1.0);
    this.size = size;
    this.index = index;
    this.initBuffers();
    this.createApperence();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var offset = this.scene.utils.getRandom(0.8, 1.0);
        if(longitude == 0)
          var firstOffset = offset;
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;

        if(longitude == this.longDivs)
          this.vertices.push(firstOffset*x,firstOffset*y,firstOffset*z);
        else
          this.vertices.push(offset*x, offset*y, offset*z);
        
        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }
        
        this.texCoords.push(longitude/this.longDivs, latitude/this.latDivs)

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.
        
      }
      phi += phiInc;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  display(){

    this.scene.pushMatrix();
    
    //this.scene.translate(0,2.5  ,0);
    this.scene.scale(this.xScale,this.yScale, this.zScale);
    this.scene.scale(this.size, this.size, this.size);
    //this.scene.defaultAppearance.apply();

    this.rockMat.apply();

    super.display();

    this.scene.popMatrix();
  }

  createApperence(){
    this.rockMat = new CGFappearance(this.scene);
    this.rockMat.setAmbient(0.3,0.3,0.3,1.0);
    this.rockMat.setDiffuse(0.3,0.3,0.3, 1.0);
    this.rockMat.setSpecular(0.3,0.3,0.3, 1.0);
    this.rockMat.setShininess(1);
  }
}


