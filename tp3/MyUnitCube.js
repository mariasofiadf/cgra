import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	//0
			0.5, -0.5, 0.5,	    //1
			0.5, 0.5, 0.5,	    //2
			-0.5, 0.5, 0.5,	    //3

			0.5, -0.5, 0.5,	    //1
			0.5, -0.5, -0.5,	//5
			0.5, 0.5, -0.5,	    //6
			0.5, 0.5, 0.5,	    //2

            -0.5, -0.5, -0.5,	//4
			0.5, -0.5, -0.5,	//5
			0.5, 0.5, -0.5,	    //6
			-0.5, 0.5, -0.5,	//7
			
			-0.5, -0.5, 0.5,	//0
            -0.5, 0.5, 0.5,	    //3
			-0.5, 0.5, -0.5,	//7
			-0.5, -0.5, -0.5,	//4

			-0.5, -0.5, 0.5,	//0
			-0.5, -0.5, -0.5,	//4
			0.5, -0.5, -0.5,	//5
			0.5, -0.5, 0.5,	    //1
			
			-0.5, 0.5, -0.5,	//7
			-0.5, 0.5, 0.5,	    //3
			0.5, 0.5, 0.5,	    //2
			0.5, 0.5, -0.5,	    //6
			
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,

			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,

			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,

			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,		
			
			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,
			
			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,
		]

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            2, 3, 0,

			4, 5, 6,
			6, 7, 4,
			
			10, 9, 8,
			8, 11, 10,

			12, 13, 14,
			14, 15, 12,

			16, 17, 18,
			18, 19, 16,

			20, 21, 22,
			22, 23, 20,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

