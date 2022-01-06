#ifdef GL_ES
precision highp float;
#endif


varying vec4 coords;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;



void main(){
    //gl_FragColor = vec4(0.9219,0.6172,0.2266,1.0);
    if(coords.z >= 0.4)
        gl_FragColor = vec4(250.0/256.0, 76.0/256.0, 16.0/256.0, 1.0);
    else
        gl_FragColor = texture2D(uSampler, vTextureCoord);

}
