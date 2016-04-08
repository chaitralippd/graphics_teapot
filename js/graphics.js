(function (lab3 , $, undefined) {

lab3.init = function(hook) {



	//1. Create A Renderer
	//like canvas contexts, it has an internal resolution
	var WIDTH = 600,
	  HEIGHT = 500;

	//all three elements are in the THREE namespace
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
	hook.append(renderer.domElement);

	//2. Create a Camera
	//Camera variables
	var VIEW_ANGLE = 65, //65 FOV is most 'natural' FOV
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,		//these elements are needed for cameras to
	  FAR = 10000;		//partition space correctly
	  
	var camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);
		
	camera.position.z = 300;
		
	//3. Create a scene
	var scene = new THREE.Scene();
	scene.add(camera);
	var ambient = new THREE.AmbientLight( 0x555555 );
scene.add( ambient );


var teapot = null;
var teaPotHeight=0;
	function updateTeapot() {
		if (teapot != null)
		{
		teaPotHeight+=1;
		teapot.position.y = teaPotHeight%200;
		teapot.rotation.z += 0.1; 
		}
	}
	
	var material2 =
        new THREE.MeshNormalMaterial(
		{
		color: 0xccbbaa,
		side: THREE.DoubleSide
		}
		);
 loader = new THREE.JSONLoader();
 loader.load( "models/utah-teapot.json", function( geometry ) {
 teapot = new THREE.Mesh( geometry, material2 );
 //modifications to teapot transformation in here…..
  teapot.scale.set( 20, 20, 20 );
        teapot.position = new THREE.Vector3(-30, 100, 20);
scene.add(teapot);
 } );


	loader = new THREE.JSONLoader();

	
  /*  loader.load( "utah-teapot.json", function( geometry ) {
	
		
	
         mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial({
		color: 0xccbbaa,
		side: THREE.DoubleSide
		}) );
		//modify mesh position, scale, rotation here in
		//this callback
		
		
        mesh.scale.set( 20, 20, 20 );
        mesh.position = new THREE.Vector3(-30, 100, 20);
		

		//add it to the scene
		scene.add(mesh)
    } );*/
	
	
	//4. Create a box primitive
	var width = 40;
	var	height = 55;
	var	depth = 30;
	var material =
	new THREE.MeshLambertMaterial(
	{
	color: 0x00bbcc
	});
	var box = new THREE.Mesh(
    new THREE.CubeGeometry(width,height,depth),
    material);
    scene.add(box);
	
	//5. Create a light
	var pointLight =
	  new THREE.PointLight(0xFFFFFF);
	//three.js has a vector class to set all variables at one time
	pointLight.position = new THREE.Vector3(-10, 30, 100);

	// add to the scene
	scene.add(pointLight);
	
	
	
	

	//trackball

	var controls = new THREE.TrackballControls( camera );
controls.target.set( 0, 0, 0 );


	//6. Tell Three to render
	//this function will be called over and over and over....
	function renderLoop() {
	//debugger;
	  updateTeapot();
		renderer.render(scene, camera);
		

		controls.update();
	  
		window.requestAnimationFrame(renderLoop);
	}
	
	window.requestAnimationFrame(renderLoop);
}

})(window.lab3 = window.lab3 || {} , jQuery)
