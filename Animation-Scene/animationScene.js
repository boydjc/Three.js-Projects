document.addEventListener('DOMContentLoaded', function(event) {

	var renderer
	var camera;
	var scene;

	var animationControls = new function() {
		this.rocketSpeed = 0.05;
	}

	// stats to display fps and render rate
	function initStats() {
		var stats = new Stats();
		stats.setMode(0);
		document.getElementById("stats-output").appendChild(stats.domElement);
		return stats;
	}

	var stats = initStats();
	var gui = new dat.GUI();
	gui.add(animationControls, 'rocketSpeed', 0.05, 0.3);

	function buildScene() {
		renderer = new THREE.WebGLRenderer();
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		scene = new THREE.Scene();

		renderer.setClearColor(new THREE.Color(0x000000));
		renderer.setSize(window.innerWidth, window.innerHeight);

		const STARNUM = 1000;

		// start rocket main body

		var rocketBodyMidGeo = new THREE.CylinderGeometry(2.5, 2.5, 11, 64);
		var rocketBodyMidMat = new THREE.MeshLambertMaterial({
			color: 0x888888
		});

		var rocketBodyMid = new THREE.Mesh(rocketBodyMidGeo,
										   rocketBodyMidMat);
		
		rocketBodyMid.rotation.set(0, 0, 0.8);
		rocketBodyMid.position.set(0.7, -0.7, 0);

		scene.add(rocketBodyMid);

		var rocketBodyTopGeo = new THREE.CylinderGeometry(1, 2.5, 5, 64);
		var rocketBodyTopMat = new THREE.MeshLambertMaterial({
			color: 0x888888
		});

		var rocketBodyTop = new THREE.Mesh(rocketBodyTopGeo,
										   rocketBodyTopMat);

		rocketBodyTop.rotation.set(0, 0, 0.8);
		rocketBodyTop.position.set(-5.05, 4.85, 0);
		scene.add(rocketBodyTop);

		var rocketBodyTipGeo = new THREE.ConeGeometry(1, 4, 64);
		var rocketBodyTipMat = new THREE.MeshLambertMaterial({
			color: 0xAA0000
		});

		var rocketBodyTip = new THREE.Mesh(rocketBodyTipGeo, rocketBodyTipMat);
		rocketBodyTip.position.set(-8.2, 7.9, 0);
		rocketBodyTip.rotation.set(0, 0, 0.8);
		scene.add(rocketBodyTip);

		// end rocket main body

		// start rocket details

		var rocketFlameGeo = new THREE.ConeGeometry(2, 5, 32);
		var rocketFlameMat = new THREE.MeshLambertMaterial({
			color: 0xFFFF00
		});

		var rocketFlame = new THREE.Mesh(rocketFlameGeo, rocketFlameMat);
		rocketFlame.position.set(5.8, -5.5, 0);
		rocketFlame.rotation.set(0, 0, -2.3);
		scene.add(rocketFlame);

		var rocketWindowFrameGeo = new THREE.CylinderGeometry(1, 1, 1, 32);
		var rocketWindowFrameMat = new THREE.MeshLambertMaterial({
			color: 0x555555
		});

		var rocketWindowPaneGeo = new THREE.CylinderGeometry(0.7, 0.7, 1, 32);
		var rocketWindowPaneMat = new THREE.MeshLambertMaterial({
			color: 0x00FFFF
		});

	 	var rocketWindows = [];

		for(var i=0; i<2; i++) {
			rocketWindows[i] = [new THREE.Mesh(rocketWindowFrameGeo,
											   rocketWindowFrameMat),
								new THREE.Mesh(rocketWindowPaneGeo,
											   rocketWindowPaneMat)];

			rocketWindows[i][0].rotation.set(1.5, 0, 0);
			rocketWindows[i][1].rotation.set(1.5, 0, 0);

			if(i == 0) {
				rocketWindows[i][0].position.set(-1.6, 1.6, -2.2);
				rocketWindows[i][1].position.set(-1.6, 1.6, -2.3);
			}else {
				rocketWindows[i][0].position.set(1, -1, -2.2);
				rocketWindows[i][1].position.set(1, -1, -2.3);
			}

			scene.add(rocketWindows[i][0]);
			scene.add(rocketWindows[i][1]);
		}

		var rocketFinGeo = new THREE.CylinderGeometry(2, 2, 1, 3);
		var rocketFinMat = new THREE.MeshLambertMaterial({
			color: 0xAA0000
		});

		var rocketFins = [];

		for(var i=0; i<2; i++) {
			rocketFins[i] = new THREE.Mesh(rocketFinGeo, rocketFinMat);
			if(i == 0) {
				rocketFins[i].rotation.set(-1.7, 1.1, 0);
				rocketFins[i].position.set(5, -1, 0);
			}else {
				rocketFins[i].rotation.set(-1.7, -0.6, 0);
				rocketFins[i].position.set(1.3, -5.1, 0);
			}	

			scene.add(rocketFins[i]);
		}
	
		// end rocket details

		// create star

		var starGeo = new THREE.SphereGeometry(1, 27, 32)
		var starMat = new THREE.MeshLambertMaterial({
			color: 0xFFFFFF
		});

		var stars = [];

		for(var i=0; i<STARNUM; i++) {
			stars[i] = new THREE.Mesh(starGeo, starMat);

			var starPosX = Math.random() * (window.innerWidth - -window.innerWidth) + -window.innerWidth;
			var starPosY = Math.random() * (window.innerHeight - -window.innerHeight) + -window.innerHeight;
			var starPosZ = Math.random() * (350 - 150) + 150;

			stars[i].position.set(starPosX, starPosY, starPosZ);
			scene.add(stars[i]);
		}

		var spotLight = new THREE.SpotLight(0xFFFFFF);
		spotLight.position.set(0, 0, -30);
		scene.add(spotLight);


		camera.position.set(0,0,-50);
		camera.lookAt(scene.position);

		// add the output of the renderer to the html element
		document.getElementById("webgl-output").appendChild(renderer.domElement);	

		var shrinkFlame = false;
		function renderScene() {

			stats.update();

			if(!shrinkFlame) {
				rocketFlame.scale.y += animationControls.rocketSpeed;
				if(rocketFlame.scale.y >= 1.6) {
					shrinkFlame = true;
				}
			}else if(shrinkFlame) {
				rocketFlame.scale.y -= animationControls.rocketSpeed;
				if(rocketFlame.scale.y <= 0.9) {
					shrinkFlame = false;
				}
			}

			for(var i=0; i<STARNUM; i++) {

				if(stars[i].position.x > window.innerWidth || stars[i].position.y > window.innerHeight) {
					var starPosX = Math.random() * (window.innerWidth - -window.innerWidth) + -window.innerWidth;
					var starPosY = Math.random() * (window.innerHeight - -window.innerHeight) + -window.innerHeight;
					var starPosZ = Math.random() * (350 - 150) + 150;
	
					stars[i].position.set(starPosX, starPosY, starPosZ);
				}else{
					stars[i].position.set(stars[i].position.x += animationControls.rocketSpeed*3,
										  stars[i].position.y -= animationControls.rocketSpeed*3,
										  stars[i].position.z);
				}
			}

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

