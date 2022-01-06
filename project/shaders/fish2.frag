#version 300 es
precision highp float;

in vec4 coords;

in vec4 vFinalColor;
in vec2 vTextureCoord;

out vec4 fragColor;

uniform sampler2D uSampler;

uniform bool uUseTexture;

in vec4 FrontMaterial;

uniform bool textureOn;


void main() {
	// Branching should be reduced to a minimal. 
	// When based on a non-changing uniform, it is usually optimized.
	if (uUseTexture && coords.z < 0.4 && textureOn)
	{
		vec4 textureColor = texture(uSampler, vTextureCoord);
		fragColor = textureColor * vFinalColor;
	}
	else
	{
		fragColor = FrontMaterial * vFinalColor;
	}

}