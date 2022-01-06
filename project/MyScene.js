import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyAnemoneNest } from "./MyAnemoneNest.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillar } from "./MyPillar.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MySeaWeedSet } from "./MySeaWeedSet.js";
import { MyMovingFishSet } from "./MyMovingFishSet.js";
import { MyUtils } from "./MyUtils.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
        this.maxHeight = 5.0;
        this.size = 50;
    }
    init(application) {
        super.init(application);

        this.utils = new MyUtils(this);

        this.fishPos = [0, this.maxHeight, 0];
        
        this.initCameras(2);

        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.initSettings();
        
        this.createMaterials();

        this.createObjects();


        // this.cubeTextures = [this.demoCubeMap, this.testCubeMap];
        // this.textureIds = {'Demo' : 0, 'Test' : 1};

        //Objects connected to MyInterface
        // this.displaySphere = false;
        // this.displayCyl = false;
        // this.displayCube = false;
        // this.displayTriangle = false;
    }

    initSettings(){

        this.time = 0;
        
        this.selectedTexture = -1;    

        this.scaleFactor = 1;

        this.speedFactor = 1;

        this.freeCam = false;

        this.displayAxis = false;

        this.cameraHAng = -20*Math.PI/180;
        this.cameraHeight = 1.5;
        this.cameraFront = 0;
        this.cameraRad = 2;
    }

    createObjects(){
        this.axis = new CGFaxis(this);

        this.cubeMap = new MyCubeMap(this, this.underWaterCubeMap);
        
        //this.incompleteSphere = new MySphere(this, 16, 8);

        this.fish = new MyFish(this);

        this.movingFish = new MyMovingFish(this, [0,this.maxHeight,0], 0,0, this.fish);
        
        this.fishSchool = new MyMovingFishSet(this,3);

        this.seaFloor = new MySeaFloor(this, 50);
        
        this.waterSurface = new MyWaterSurface(this, 50);

        this.anemone = new MyAnemoneNest(this, 50, 3.6, 12);

        this.pillar = new MyPillar(this, 4);

        this.rockSet = new MyRockSet(this, 80, 60, 0.2);

        this.rockSetMed = new MyRockSet(this, 15, 25, 1);

        this.rockSetBig = new MyRockSet(this, 4, 8, 3);

        this.seaWeedSet = new MySeaWeedSet(this, 40);
    }

    //Comented unused appearences
    createMaterials(){
        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

        this.underWaterCubeMap= [
            new CGFtexture(this, 'images/underwater_cubemap/top.jpg'),
            new CGFtexture(this, 'images/underwater_cubemap/front.jpg'),
            new CGFtexture(this, 'images/underwater_cubemap/right.jpg'),
            new CGFtexture(this, 'images/underwater_cubemap/back.jpg'),
            new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg'),
            new CGFtexture(this, 'images/underwater_cubemap/left.jpg')
        ]

		// this.sphereAppearance = new CGFappearance(this);
		// this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		// this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		// this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		// this.sphereAppearance.setShininess(120);
        // this.sphereAppearance.loadTexture('images/earth.jpg');
        // this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT');
        
        // this.cylMaterial = new CGFappearance(this);
        // this.cylMaterial.setAmbient(10, 10, 10, 1);
        // this.cylMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        // this.cylMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        // this.cylMaterial.setShininess(10.0);
        // this.cylMaterial.loadTexture('images/earth.jpg');
        // this.cylMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // this.demoCubeMap = [
        //     new CGFtexture(this, 'images/demo_cubemap/top.png'),
        //     new CGFtexture(this, 'images/demo_cubemap/front.png'),
        //     new CGFtexture(this, 'images/demo_cubemap/right.png'),
        //     new CGFtexture(this, 'images/demo_cubemap/back.png'),
        //     new CGFtexture(this, 'images/demo_cubemap/bottom.png'),
        //     new CGFtexture(this, 'images/demo_cubemap/left.png')
        // ]   

        // this.testCubeMap = [
        //     new CGFtexture(this, 'images/test_cubemap/py.png'),
        //     new CGFtexture(this, 'images/test_cubemap/pz.png'),
        //     new CGFtexture(this, 'images/test_cubemap/px.png'),
        //     new CGFtexture(this, 'images/test_cubemap/nz.png'),
        //     new CGFtexture(this, 'images/test_cubemap/ny.png'),
        //     new CGFtexture(this, 'images/test_cubemap/nx.png')
        // ]

    
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras(fov) {

        this.camPos = [];
        this.camPos[0] = this.fishPos[0] + 0.5;
        this.camPos[1] = this.fishPos[1] + 1.5;
        this.camPos[2] = this.fishPos[2] - 1;
        
        this.camTarget = [];
        
        this.camTarget[0] = this.fishPos[0] + 0.5;
        this.camTarget[1] = this.fishPos[1] - 1.0;
        this.camTarget[2] = this.fishPos[2] + 3;

        this.camera = new CGFcamera(fov * 0.8,0.1, 500, this.camPos, this.camTarget);
    }

    updateCamera()
    {
        var xP = Math.sin(this.movingFish.ang + this.cameraHAng + this.cameraFront*Math.PI);
        var zP = Math.cos(this.movingFish.ang + this.cameraHAng + this.cameraFront*Math.PI);

        this.camPos[0] = this.movingFish.pos[0] - this.cameraRad*xP;
        this.camPos[1] = this.movingFish.pos[1] + this.cameraHeight;
        this.camPos[2] = this.movingFish.pos[2] - this.cameraRad*zP;

        this.camera.setPosition(this.camPos);

        var xT = Math.sin(this.movingFish.ang + this.cameraFront*Math.PI);
        var zT = Math.cos(this.movingFish.ang + this.cameraFront*Math.PI);

        this.camTarget[0] = this.movingFish.pos[0] + 3*xT;
        this.camTarget[1] = this.movingFish.pos[1] - 0.5;
        this.camTarget[2] = this.movingFish.pos[2] + 3*zT;

        this.camera.setTarget(this.camTarget);
    }

    updateAppliedCubeTextureMap() {
        this.cubeMap.setTextureMap(this.cubeTextures[this.selectedTexture]);
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    checkKeys(){
        var text = "Keys pressed: ";
        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.movingFish.accelerate(1);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.movingFish.accelerate(-1);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyA") && !this.gui.isKeyPressed("KeyD")) {

            this.movingFish.turn(1);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyD") && !this.gui.isKeyPressed("KeyA")) {
            this.movingFish.turn(-1);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.movingFish.reset();
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyP")){
            this.movingFish.setBuoyancy(1);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyL")){
            this.movingFish.setBuoyancy(-1);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyC")){
            this.movingFish.grabRock(this.rockSet);
            //keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyV")){
            this.cameraFront = 1;
        }
        else
            this.cameraFront = 0;

        if(!keysPressed){
            this.movingFish.fish.noRotation();
        }
    }

    adjustCam(){
        if(!this.freeCam)
            this.initCameras(2);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingFish.update();
        this.time += 1;
        if(t)
        this.waterSurface.waterShader.setUniformsValues({ timeFactor: t / 100 % 101});
        if(!this.freeCam){
            this.updateCamera();
            this.gui.setActiveCamera(null);
        } else {
            this.gui.setActiveCamera(this.camera);
        }
        this.fishSchool.update();
        //To be done...
    }

    updateSpeedFactor(){
        this.movingFish.alterSpeed(this.speedFactor);
        //To be done...
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
           
        this.displayObjects();
    }

    displayObjects(){
        if (this.displayAxis)
            this.axis.display();

        this.cubeMap.display();

        this.movingFish.display();

        this.seaFloor.display();
        
        this.pillar.display();
        
        this.waterSurface.display();
        
        this.rockSet.display();
        
        this.rockSetMed.display();
        
        this.rockSetBig.display();
        
        this.fishSchool.display();
        
        this.seaWeedSet.display();

        this.anemone.display();
    }

    
}