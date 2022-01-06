import {CGFobject} from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     */
    constructor(scene, slices) {
      super(scene);
      this.longDivs = slices;
      this.initBuffers();
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
  
      var theta = 0;
      var thetaInc = (2 * Math.PI) / this.longDivs;
  
      var i = 1;
  
      // build an all-around stack at a time, starting on "north pole" and proceeding "south"
      for (let longitude = 0; longitude <= this.longDivs+1; longitude++){
          
        // in each stack, build all the slices around, starting on longitude 0
        for (let y = 0; y <= 1; y++) {
          //--- Vertices coordinates
          var x = Math.cos(theta);
          var z = Math.sin(-theta);
          this.vertices.push(x, y, z);
          this.vertices.push(0, y, 0);
          i++;
  
          //--- Normals
          // at each vertex, the direction of the normal is equal to 
          // the vector from the center of the sphere to the vertex.
          // in a sphere of radius equal to one, the vector length is one.
          // therefore, the value of the normal is equal to the position vectro
          this.normals.push(x, y, z);
          if(y == 0)
            this.normals.push(0, -1, 0);
          else
            this.normals.push(0,1,0);
          
  
          //--- Texture Coordinates
          // To be done... 
          // May need some additional code also in the beginning of the function.
        }
  
  
        // var current = (longitude-1)*2;    
        // if(longitude > 0){
        //   var next = current + 2;
        //   this.indices.push( current + 1, current, next);
        //   this.indices.push( current + 1, next, next +1);
        // }
  
        if(longitude > 0){
          var current = (longitude-1)*4;
          var next = current + 4;
  
          this.indices.push( current + 1, current, next); //base
          this.indices.push( current + 3, current + 2, next+2); // top
  
          this.indices.push( current + 2, current, next); //side
          this.indices.push( current + 2, next, next + 2); //side
          
        }
  
        this.texCoords.push(current/this.longDivs/2, 1/3);
        this.texCoords.push(current/this.longDivs/2, 0);
        this.texCoords.push(current/this.longDivs/2, 1);
        this.texCoords.push(current/this.longDivs/2, 2/3);
  
        theta += thetaInc;
      }
    
        
      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
      
    }
    
  }
  