import { CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";


export class MyWaterSurface extends MyPlane {
    constructor(scene, nrDivs, minS, maxS, minT, maxT) {
		super(scene, nrDivs, minS, maxS, minT, maxT);
        this.createAppearance();
    }


    display(){
        this.scene.pushMatrix();

        this.scene.translate(0,10,0);
        this.scene.scale(50,0,50);
        this.scene.rotate(Math.PI/2, 1,0,0);

        this.waterText.bind(this.waterShader);

        this.waterDist.bind(1);

        this.waterAppearance.apply();

        this.scene.setActiveShader(this.waterShader);

        super.display();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.waterText.unbind();

        this.scene.popMatrix();
    }

    createAppearance(){
        this.waterAppearance = new CGFappearance(this.scene);
		this.waterAppearance.setAmbient(1, 1, 1, 1.0);
        this.waterAppearance.setDiffuse(1, 1, 1, 1.0);
        this.waterAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.waterAppearance.setEmission(0,0,0,1);
		this.waterAppearance.setShininess(10);

        this.waterText = new CGFtexture(this.scene, "images/pier.jpg");
		this.waterDist = new CGFtexture(this.scene, "images/distortionmap.png");

        this.waterShader = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");

        this.waterShader.setUniformsValues({ uSampler2: 1 });

        this.waterShader.setUniformsValues({ timeFactor: 0});

        this.waterAppearance.setTextureWrap('MIRROR', 'MIRROR');
    
        this.waterAppearance.setTexture(this.waterText);

    }

}