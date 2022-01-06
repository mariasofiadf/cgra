
export class MyUtils{

    constructor(scene)
    {
        this.scene = scene;
    }

    getRandom(from, to){
        return (to-from)*Math.random()+from;
    }

    aboveNest(pos){
		var r = this.scene.anemone.r;
		return !(pos[0] > r || pos[0] < -r || pos[2] > r || pos[2] < -r);
	}
}