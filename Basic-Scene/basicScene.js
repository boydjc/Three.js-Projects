document.addEventListener('DOMContentLoaded', function(event) {
	function loadScene() {
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.1, 1000);
		var renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(new THREE.Color(0x000000));
		renderer.setSize(window.innerWidth, window.innerHeight);

		var axes = new THREE.AxesHelper(20);
		scene.add(axes);

		// create a plane for the ground 
		var planeGeo = new THREE.PlaneGeometry(50, 50);
		var planeMat = new THREE.MeshBasicMaterial({
			color: 0x56b00
		});

		var plane = new THREE.Mesh(planeGeo, planeMat);
		plane.rotation.x = -0.5 * Math.PI;
		plane.position.set(7, 0, -7);
		scene.add(plane);

		// position and point the camera to the center of the scene
		camera.position.set(-30, 40, 30);
		camera.lookAt(scene.position);

		// add the ouput of the renderer to the html element
		document.getElementById("webgl-output").appendChild(renderer.domElement);
		// render the scene
		renderer.render(scene, camera);
	}

	loadScene();
});
