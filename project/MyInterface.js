import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');

        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        this.gui.add(this.scene, 'cameraHAng', -45*Math.PI/180, 45*Math.PI/180).name('Camera Angle');
        this.gui.add(this.scene, 'cameraHeight', -1.0, 3.0).name('Camera Height');
        this.gui.add(this.scene, 'cameraRad', 1, 4).name('Camera Radius');

        this.gui.add(this.scene, 'freeCam', false, true).name('Free Camera').onChange(this.scene.adjustCam.bind(this.scene));

        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        //disable the processKeyboard function
        this.processKeyboard=function(){};
        
        //create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    // called when a key is pressed down
    processKeyDown(event){
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    }

    // called when a key is released, mark it as inactive in the array
    processKeyUp(event){
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode){
        /*if(this.activeKeys[keyCode] == true && (keyCode == "keyL" || keyCode == "keyP")){
        
        }*/

        return this.activeKeys[keyCode];
    }

    
}