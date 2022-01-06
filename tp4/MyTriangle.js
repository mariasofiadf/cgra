import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-2.5, 2.5, 0,	//0
			0, 0, 0,		//1
			2.5, 2.5, 0,	//2

			-2.5, 2.5, 0,	//0
			0, 0, 0,		//1
			2.5, 2.5, 0,	//2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0
		];

		this.texCoords = [
			0,0,
			0,0,
			0,0
        ];
		  

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	setPink(){
		this.texCoords = [
			0,0.5,
			0,1,
			0.5,1,
			
			0,0.5,
			0,1,
			0.5,1
		];
		this.updateTexCoordsGLBuffers();
	}
}
export class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			3.5, 3.5, 0,	//0
			0, 0, 0,		//1
			7, 0, 0,		//2

			3.5, 3.5, 0,	//0
			0, 0, 0,		//1
			7, 0, 0,		//2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];


		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0
		];

		this.texCoords = [
			0, 0,
			0,0,
		 	0,0, 
	 	];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	setBlue(){
		this.texCoords = [
			0, 0,
			1, 0, 
			0.5,0.5,

			0, 0,
			1, 0, 
			0.5,0.5
		];
		this.updateTexCoordsGLBuffers();
	}
	setOrange(){
		this.texCoords = [
			1, 0,
			0.5, 0.5, 
			1,1,

			1, 0,
			0.5, 0.5, 
			1,1
		];
		this.updateTexCoordsGLBuffers();
	}

}

export class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			-2, 2, 0,	//1
			-2, -2, 0,		//2

			0, 0, 0,	//0
			-2, 2, 0,	//1
			-2, -2, 0		//2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1 ,0
		];

		this.texCoords = [
			0, 0,
			0,0,
		 	0,0, 
	 	];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	setRed(){
		this.texCoords = [
			0.5, 0.5,
			0.75,0.75,
			0.25, 0.75,

			0.5, 0.5,
			0.75,0.75,
			0.25, 0.75
		];
		this.updateTexCoordsGLBuffers();
	}
	setPurple(){
		this.texCoords = [
			0, 0,
			0, 0.5, 
			0.25,0.25,

			0, 0,
			0, 0.5, 
			0.25,0.25
		];
		this.updateTexCoordsGLBuffers();
	}
	
}

