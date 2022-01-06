import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyCone } from "./MyCone.js";
import { MyPlane } from "./MyPlane.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle, MyTriangleBig, MyTriangleSmall } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 5);
        this.cone = new MyCone(this, 3, 1);
        this.pyramid = new MyPyramid(this, 3, 1);
        
        this.diamond = new MyDiamond(this);
        this.triangle1 = new MyTriangle(this);
        this.parall = new MyParallelogram(this);
        this.triangBig= new MyTriangleBig(this)
        this.triangleSmall = new MyTriangleSmall(this);
        this.quad = new MyQuad(this);
        this.cubeQuad = new MyUnitCubeQuad(this);
        this.cube = new MyUnitCube(this);
        this.tangram = new MyTangram(this);
        
        this.objects = [this.plane, this.pyramid, this.cone, this.tangram, this.cube];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Plane': 0 , 'Pyramid': 1, 'Cone': 2, 'Tangram' : 3, 'Cube' : 4};

        //Other variables connected to MyInterface
        this.selectedObject = 0;
        this.selectedMaterial = 0;
        this.displayAxis = true;
        this.displayNormals = false;
        this.objectComplexity = 0.5;
        this.scaleFactor = 2.0;

    }
    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        this.lights[0].setPosition(2.0, 2.0, -1.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].disable();
        this.lights[0].setVisible(true);
        this.lights[0].update();

        this.lights[1].setPosition(0.0, -1.0, 2.0, 1.0);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 0.0, 1.0);
        this.lights[1].disable();
        this.lights[1].setVisible(true);
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }

    updateCustomMaterial() {
        this.customMaterial.setAmbient(...this.hexToRgbA(this.customMaterialValues['Ambient']));
        this.customMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Diffuse']));
        this.customMaterial.setSpecular(...this.hexToRgbA(this.customMaterialValues['Specular']));

        this.customMaterial.setShininess(this.customMaterialValues['Shininess']);

    };

    updateObjectComplexity(){
        this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
    }


    initMaterials() {
        // Red Ambient (no diffuse, no specular)
        this.material1 = new CGFappearance(this);
        this.material1.setAmbient(1, 0, 0, 1.0);
        this.material1.setDiffuse(0, 0, 0, 1.0);
        this.material1.setSpecular(0, 0, 0, 1.0);
        this.material1.setShininess(10.0);

        // Red Diffuse (no ambient, no specular)
        this.material2 = new CGFappearance(this);
        this.material2.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material2.setDiffuse(1, 0, 0, 1.0);
        this.material2.setSpecular(0, 0, 0, 1.0);
        this.material2.setShininess(10.0);

        

        // Red Specular (no ambient, no diffuse)
        this.material3 = new CGFappearance(this);
        this.material3.setAmbient(0, 0, 0, 1.0);
        this.material3.setDiffuse(0, 0, 0, 1.0);
        this.material3.setSpecular(1, 0, 0, 1.0);
        this.material3.setShininess(10.0);

        //Wood (low specular, high difuse)
        //RGB HEX CODE #82490B
        var hex = 0x82490B, 
            redMask = 0xFF0000, 
            greenMask = 0x00FF00, 
            blueMask = 0x0000FF;
        var r = ((hex & redMask) >> 16)/0xFF, 
            g = ((hex & greenMask) >> 8)/0xFF, 
            b = (hex & blueMask)/0xFF;
        this.material4 = new CGFappearance(this);
        this.material4.setAmbient(0,0,0,1.0);
        this.material4.setDiffuse(r,g,b, 1.0);
        this.material4.setSpecular(r/2,g/2,b/2, 1.0);
        this.material4.setShininess(1);

        //Pink
        var hex = 0xFF78CF;
        var r = ((hex & redMask) >> 16)/0xFF,
        g = ((hex & greenMask) >> 8)/0xFF,
        b = (hex & blueMask)/0xFF;
        this.pinkMat = new CGFappearance(this);
        this.pinkMat.setAmbient(0,0,0,1.0);
        this.pinkMat.setDiffuse(r,g,b, 1.0);
        this.pinkMat.setSpecular(r/2,g/2,b/2, 1.0);
        this.pinkMat.setShininess(1);

        //Blue
        var hex = 0x0082FF;
        var r = ((hex & redMask) >> 16)/0xFF,
        g = ((hex & greenMask) >> 8)/0xFF,
        b = (hex & blueMask)/0xFF;
        this.blueMat= new CGFappearance(this);
        this.blueMat.setAmbient(0,0,0,1.0);
        this.blueMat.setDiffuse(r,g,b, 1.0);
        this.blueMat.setSpecular(r/2,g/2,b/2, 1.0);
        this.blueMat.setShininess(1);

        //Orange
        var hex = 0xFF9A00;
        var r = ((hex & redMask) >> 16)/0xFF,
        g = ((hex & greenMask) >> 8)/0xFF,
        b = (hex & blueMask)/0xFF;
        this.orangeMat= new CGFappearance(this);
        this.orangeMat.setAmbient(0,0,0,1.0);
        this.orangeMat.setDiffuse(r,g,b, 1.0);
        this.orangeMat.setSpecular(r/2,g/2,b/2, 1.0);
        this.orangeMat.setShininess(1);
        
        //Green 
        var hex = 0x00FF2E;
        var r = ((hex & redMask) >> 16)/0xFF,
        g = ((hex & greenMask) >> 8)/0xFF,
        b = (hex & blueMask)/0xFF;
        this.greenMat= new CGFappearance(this);
        this.greenMat.setAmbient(0,0,0,1.0);
        this.greenMat.setDiffuse(r,g,b, 1.0);
        this.greenMat.setSpecular(r/2,g/2,b/2, 1.0);
        this.greenMat.setShininess(1);

        //Purple
        var hex = 0xFF0000;
        var r = ((hex & redMask) >> 16)/0xFF,
        g = ((hex & greenMask) >> 8)/0xFF,
        b = (hex & blueMask)/0xFF;
        this.redMat= new CGFappearance(this);
        this.redMat.setAmbient(0,0,0,1.0);
        this.redMat.setDiffuse(r,g,b, 1.0);
        this.redMat.setSpecular(r/2,g/2,b/2, 1.0);
        this.redMat.setShininess(1);

        //Purple
        var hex = 0xC300BF;
        var r = ((hex & redMask) >> 16)/0xFF,
        g = ((hex & greenMask) >> 8)/0xFF,
        b = (hex & blueMask)/0xFF;
        this.purpleMat= new CGFappearance(this);
        this.purpleMat.setAmbient(0,0,0,1.0);
        this.purpleMat.setDiffuse(r,g,b, 1.0);
        this.purpleMat.setSpecular(r/2,g/2,b/2, 1.0);
        this.purpleMat.setShininess(1);

        
        //Yellow
        var hex = 0xF2FF18;
        var r = ((hex & redMask) >> 16)/0xFF,
        g = ((hex & greenMask) >> 8)/0xFF,
        b = (hex & blueMask)/0xFF;
        this.yellowMat= new CGFappearance(this);
        this.yellowMat.setAmbient(0,0,0,1.0);
        this.yellowMat.setDiffuse(r,g,b, 1.0);
        this.yellowMat.setSpecular(r/2,g/2,b/2, 1.0);
        this.yellowMat.setShininess(1);

        // Custom material (can be changed in the interface)
        // initially midrange values on ambient, diffuse and specular, on R, G and B respectively

        this.customMaterialValues = {
            'Ambient': '#0000ff',
            'Diffuse': '#ff0000',
            'Specular': '#000000',
            'Shininess': 10
        }
        this.customMaterial = new CGFappearance(this);

        this.updateCustomMaterial();

        this.materials = [this.material1, this.material2, this.material3, this.customMaterial, this.material4];

        // Labels and ID's for object selection on MyInterface
        this.materialIDs = {'Red Ambient': 0, 'Red Diffuse': 1, 'Red Specular': 2, 'Custom': 3, 'Wood' : 4 };
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        this.lights[0].update();
        this.lights[1].update();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        this.materials[this.selectedMaterial].apply();

        this.pushMatrix();
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
        
        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();
        
        this.objects[this.selectedObject].display();
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}