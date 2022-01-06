import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			2, 2, 0,	//1
			0, 4, 0,	//2
			-2, 2, 0,	//3

			0, 0, 0,	//0
			2, 2, 0,	//1
			0, 4, 0,	//2
			-2, 2, 0	//3
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1
		]

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 3, 0,
			
			2, 1, 0,
			0, 3, 2
		];
		
		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	setGreen(){
		this.texCoords = [
			0,0.5,
			0.25,0.75,
			0.5,0.5,
			0.25,0.25,

			0,0.5,
			0.25,0.75,
			0.5,0.5,
			0.25,0.25
		];
		this.updateTexCoordsGLBuffers();
	}
}

