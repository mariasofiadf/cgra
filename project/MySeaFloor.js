import { CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";


export class MySeaFloor extends MyPlane {
    constructor(scene, nrDivs, minS, maxS, minT, maxT) {
		super(scene, nrDivs, minS, maxS, minT, maxT);
        this.createAppearance();
        //this.loadTextures();
    }


    display(){
        this.scene.pushMatrix();

        this.sandTex.unbind();

        this.scene.scale(50,1,50);
        this.scene.rotate(-Math.PI/2, 1,0,0);

        this.sandTex.bind(this.seaFloorShader);

        this.sandMap.bind(1);

        this.nestMap.bind(2);

        this.seaFloorAppearance.apply();

        this.scene.setActiveShader(this.seaFloorShader);

        super.display();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.sandTex.unbind();

        this.scene.popMatrix();
    }

    createAppearance(){
        this.seaFloorAppearance = new CGFappearance(this.scene);
		this.seaFloorAppearance.setAmbient(1, 1, 1, 1.0);
        this.seaFloorAppearance.setDiffuse(1, 1, 1, 1.0);
        this.seaFloorAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.seaFloorAppearance.setEmission(0,0,0,1);
		this.seaFloorAppearance.setShininess(10);

        this.sandTex = new CGFtexture(this.scene, "images/sand_mod.jpg");
		this.sandMap = new CGFtexture(this.scene, "images/sandMap.png");
        this.nestMap = new CGFtexture(this.scene, "images/nest_map.png");

        this.seaFloorShader = new CGFshader(this.scene.gl, "shaders/sand.vert", "shaders/sand.frag");

        this.seaFloorShader.setUniformsValues({ uSampler2: 1 });

        this.seaFloorShader.setUniformsValues({ uSampler3: 2 });
    
        this.seaFloorAppearance.setTexture(this.sandTex);

    }

}