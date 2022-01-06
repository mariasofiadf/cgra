#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 vTextureCoordCopy;
vec2 vTextureCoordCopy2;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;


void main() {
	float maxOffset = 0.5;
	vec4 map = texture2D(uSampler2, vTextureCoordCopy);
	float xOffset =  map.g - maxOffset;
	float yOffset = map.r - maxOffset;
	vTextureCoordCopy2 = vTextureCoord;

	if(vTextureCoordCopy2.x + xOffset >= 0.0 && vTextureCoordCopy2.x + xOffset < 1.0)
		vTextureCoordCopy2.x += xOffset;

	if(vTextureCoordCopy2.y + yOffset >= 0.0 && vTextureCoordCopy2.y + yOffset < 1.0)
	vTextureCoordCopy2.y += yOffset;
	
	vec4 color = texture2D(uSampler, vTextureCoordCopy2);
	color.r *= 0.5;
	color.g *= 0.5;
	color.b *= 0.6;
	gl_FragColor = color ;
}
