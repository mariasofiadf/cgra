attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec2 vTextureCoordCopy;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

uniform float timeFactor;

void main() {
	vec3 offset = vec3(0.0,0.0,0.0);

	vTextureCoord = aTextureCoord;
	vTextureCoordCopy = aTextureCoord;

	vTextureCoordCopy.x += (0.008*timeFactor);

	vTextureCoordCopy.y += (0.008*timeFactor);
	
	vec4 map = texture2D(uSampler2, vTextureCoordCopy);

	//offset.z = map.r;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

