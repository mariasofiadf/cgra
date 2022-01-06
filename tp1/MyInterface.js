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
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();


        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Checkbox for triangle
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        //Checkbox for diamond
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamon');

        //Checkbox for parallelogram
        this.gui.add(this.scene, 'displayParall').name('Display Parall');

        //Checkbox for Big Triangle
        this.gui.add(this.scene, 'displayBig').name('Display Big');

        //Checkbox for Small Triangle
        this.gui.add(this.scene, 'displaySmall').name('Display Small');
        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}