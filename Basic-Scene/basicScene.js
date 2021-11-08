document.addEventListener('DOMContentLoaded', function(event) {
	function loadScene() {
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.1, 1000);
		var renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(new THREE.Color(0x000000));
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;

		var axes = new THREE.AxesHelper(20);
		scene.add(axes);

		// create a plane for the ground 
		var planeGeo = new THREE.PlaneGeometry(50, 50);
		var planeMat = new THREE.MeshLambertMaterial({
			color: 0x56b00
		});

		var plane = new THREE.Mesh(planeGeo, planeMat);
		plane.receiveShadow = true;
		plane.rotation.x = -0.5 * Math.PI;
		plane.position.set(5, 0, -4);
		scene.add(plane);

		// a rectangle for the shape of a house
		var houseGeo = new THREE.BoxGeometry(9, 10, 13);
		var houseMat = new THREE.MeshLambertMaterial({
			color: 0xFF0000
		});

		var house = new THREE.Mesh(houseGeo, houseMat);
		house.castShadow = true;
		house.position.set(15, 6, 0);
		scene.add(house);

		// cone made into a triangle for the house roof
		var roofGeo = new THREE.CylinderGeometry(0, 5, 8, 4);
		var roofMat = new THREE.MeshLambertMaterial({
			color: 0x00FFFF
		});

		var roof = new THREE.Mesh(roofGeo, roofMat);
		roof.castShadow = true;
		roof.rotation.y = 0.8;
		roof.scale.set(2, 1, 2);
		roof.position.set(15, 16, 0.2);
		scene.add(roof);

		// add a light source
		var spotLight = new THREE.SpotLight(0xFFFFFF);
		spotLight.position.set(-40, 60, -10);
		spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
		spotLight.shadow.camera.far = 130;
		spotLight.shadow.camera.near = 40;
		spotLight.castShadow = true;
		scene.add(spotLight);

		// position and point the camera to the center of the scene
		camera.position.set(-30, 40, 30);
		camera.lookAt(scene.position);

		// add the output of the renderer to the html element
		document.getElementById("webgl-output").appendChild(renderer.domElement);
		// render the scene
		renderer.render(scene, camera);
	}

	loadScene();
});
