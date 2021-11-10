document.addEventListener('DOMContentLoaded', function(event) {

	var renderer
	var camera;
	var scene;

	// stats to display fps and render rate
	function initStats() {
		var stats = new Stats();
		stats.setMode(0);
		document.getElementById("stats-output").appendChild(stats.domElement);
		return stats;
	}

	var stats = initStats();

	function buildScene() {
		renderer = new THREE.WebGLRenderer();
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		scene = new THREE.Scene();

		renderer.setClearColor(new THREE.Color(0x000000));
		renderer.setSize(window.innerWidth, window.innerHeight);

		var axes = new THREE.AxesHelper(20);
		scene.add(axes);

		var rocketBodyMidGeo = new THREE.CylinderGeometry(2.5, 2.5, 11, 32);
		var rocketBodyMidMat = new THREE.MeshLambertMaterial({
			color: 0x0000FF
		});

		var rocketBodyMid = new THREE.Mesh(rocketBodyMidGeo,
										   rocketBodyMidMat);
		
		rocketBodyMid.rotation.set(0, 0, 0.8);
		rocketBodyMid.position.set(0.7, -0.7, 0);

		scene.add(rocketBodyMid);

		var rocketBodyTopGeo = new THREE.CylinderGeometry(1, 2.5, 5, 32);
		var rocketBodyTopMat = new THREE.MeshLambertMaterial({
			color: 0xFF00FF
		});

		var rocketBodyTop = new THREE.Mesh(rocketBodyTopGeo,
										   rocketBodyTopMat);

		rocketBodyTop.rotation.set(0, 0, 0.8);
		rocketBodyTop.position.set(-5.05, 4.85, 0);
		scene.add(rocketBodyTop);

		var rocketBodyTipGeo = new THREE.ConeGeometry(1, 4, 32);
		var rocketBodyTipMat = new THREE.MeshLambertMaterial({
			color: 0x00FFFF
		});

		var rocketBodyTip = new THREE.Mesh(rocketBodyTipGeo, rocketBodyTipMat);
		rocketBodyTip.position.set(-8.2, 7.9, 0);
		rocketBodyTip.rotation.set(0, 0, 0.8);
		scene.add(rocketBodyTip);

		var rocketFlameGeo = new THREE.ConeGeometry(2, 5, 32);
		var rocketFlameMat = new THREE.MeshLambertMaterial({
			color: 0xFFFF00
		});

		var rocketFlame = new THREE.Mesh(rocketFlameGeo, rocketFlameMat);
		rocketFlame.position.set(6.5, -6.2, 0);
		rocketFlame.rotation.set(0, 0, -2.3);
		scene.add(rocketFlame);


		var spotLight = new THREE.SpotLight(0xFFFFFF);
		spotLight.position.set(0, 0, -30);
		scene.add(spotLight);


		camera.position.set(0,0,-30);
		camera.lookAt(scene.position);

		// add the output of the renderer to the html element
		document.getElementById("webgl-output").appendChild(renderer.domElement);

		// add event listeners to keys for camera control
		document.addEventListener('keydown', function(event) {
			if(event.key == "w") {
				camera.position.y += 1;
			}

			if(event.key == "s") {
				camera.position.y -= 1;
			}
			
			if(event.key == "a") {
				camera.position.x += 1;
			}

			if(event.key == "d") {
				camera.position.x -= 1;
			}

			if(event.key == "z") {
				camera.position.z += 1;
			}

			if(event.key == "x") {
				camera.position.z -= 1;
			}
	});

		function renderScene() {
			stats.update();
			requestAnimationFrame(renderScene);
			renderer.render(scene, camera);
		}

		renderScene();
	}

	function onResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	// add event listener to change the camera when the browser is resized
	window.addEventListener('resize', onResize, false);
	buildScene();
});
