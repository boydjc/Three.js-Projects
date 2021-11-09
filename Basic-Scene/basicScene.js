document.addEventListener('DOMContentLoaded', function(event) {
	function loadScene() {
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.1, 1000);
		var renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(new THREE.Color(0x1F8DBA));
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;

		// create a plane for the ground 
		var planeGeo = new THREE.PlaneGeometry(300, 300);
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
			color: 0xCC0000
		});

		var house = new THREE.Mesh(houseGeo, houseMat);
		house.castShadow = true;
		house.position.set(15, 3, 0);
		scene.add(house);

		// cone made into a triangle for the house roof
		var roofGeo = new THREE.CylinderGeometry(0, 5, 8, 4);
		var roofMat = new THREE.MeshLambertMaterial({
			color: 0x5A5A5A
		});

		var doorGeo = new THREE.BoxGeometry(1, 5, 2.5);
		var doorMat = new THREE.MeshLambertMaterial({
			color: 0x5A5A5A
		});

		var door = new THREE.Mesh(doorGeo, doorMat)
		door.position.set(10.5, 3, 0);
		scene.add(door);

		var doorKnobGeo = new THREE.IcosahedronGeometry(0.3, 4);
		var doorKnobMat = new THREE.MeshLambertMaterial({
			color: 0xFFFF00
		});

		var doorKnob = new THREE.Mesh(doorKnobGeo, doorKnobMat);
		doorKnob.position.set(10, 3, 0.8);
		scene.add(doorKnob);

		var chimneyGeo = new THREE.BoxGeometry(1.5, 5, 1.5);
		var chimneyMat = new THREE.MeshLambertMaterial({
			color: 0x555555
		});

		var chimney = new THREE.Mesh(chimneyGeo, chimneyMat);
		chimney.position.set(15, 12, 6);
		chimney.castShadow = true;
		scene.add(chimney);

		var windowFrameGeo = new THREE.BoxGeometry(1, 3, 3);
		var windowFrameMat = new THREE.MeshLambertMaterial({
			color: 0x5A5A5A
		});

		var windowPaneGeo = new THREE.BoxGeometry(1, 2, 2);
		var windowPaneMat = new THREE.MeshLambertMaterial({
			color: 0x87CEEB
		});

		var houseWindows = [];

		for(var i=0; i<2; i++) {
			houseWindows[i] = [new THREE.Mesh(windowFrameGeo, windowFrameMat),
							   new THREE.Mesh(windowPaneGeo, windowPaneMat)];
			if(i == 0) {
				houseWindows[i][0].position.set(10.5, 4, 4);
				houseWindows[i][1].position.set(10.4, 4, 4);
			} else {
				houseWindows[i][0].position.set(10.5, 4, -4);
				houseWindows[i][1].position.set(10.4, 4, -4);
			}

			scene.add(houseWindows[i][0]);
			scene.add(houseWindows[i][1]);

		}

		var roof = new THREE.Mesh(roofGeo, roofMat);
		roof.castShadow = true;
		roof.rotation.y = 0.8;
		roof.scale.set(2, 0.8, 2);
		roof.position.set(14, 12, 1);
		scene.add(roof);

		// tree made from cylinder and squished Dodecahedron
		var treeTrunkGeo = new THREE.CylinderGeometry(0.8, 0.8, 7, 15)
		var treeTrunkMat = new THREE.MeshLambertMaterial({
			color: 0x53350A
		});

		var treeTopGeo = new THREE.DodecahedronGeometry(4, 3);
		var treeTopMat = new THREE.MeshLambertMaterial({
			color: 0x476a30
		});

		var trees = [];

		// create an array of trees, size them, and position them
		for(var i=0; i<75; i++) {

			trees[i] = [new THREE.Mesh(treeTrunkGeo, treeTrunkMat),
						new THREE.Mesh(treeTopGeo, treeTopMat)];
			
			// squish the tree tops
			trees[i][1].scale.set(1, 1.5, 1);
			
			// give all of the trees random positions as long as they do not colide with the coordinates of the house
			var randomX = 0;
			var randomZ = 0;
			while(randomX <= 20 && randomX >= -20) { 
				randomX = Math.random() * (100 - -100) + -100;
				if(!(randomX <= 20) && !(randomX >= -20)) {
					break;
				}
			}

			while(randomZ <= 20 && randomZ >= -20) {
				randomZ = Math.random() * (100 - -100) + -100;
				if(!(randomZ <= 20) && !(randomZ >= -20)){
					break;
				}
			}

			trees[i][0].position.set(randomX, 3, randomZ);
			trees[i][1].position.set(randomX, 11, randomZ);

			// add shadows to the trees
			trees[i][0].castShadow = true;
			trees[i][1].castShadow = true;
			scene.add(trees[i][0]);
			scene.add(trees[i][1]);
		}

		// road towards the house made from a flatten square
		var roadGeo = new THREE.BoxGeometry(7, 0.5, 5);
		var roadMat = new THREE.MeshLambertMaterial({
			color: 0x76552B
		});

		var road = new THREE.Mesh(roadGeo, roadMat);
		road.position.set(7, 0, 0);
		scene.add(road);

		// add a light source
		var spotLight = new THREE.SpotLight(0xFFFFFF);
		spotLight.position.set(-100, 200, -50);
		spotLight.shadow.mapSize = new THREE.Vector2(5000, 5000);
		spotLight.shadow.camera.far = 300;
		spotLight.shadow.camera.near = 30;
		spotLight.intensity = 1.4;
		spotLight.castShadow = true;
		scene.add(spotLight);

		// position and point the camera to the center of the scene
		camera.position.set(-70, 40, 50);
		camera.lookAt(scene.position);

		// add the output of the renderer to the html element
		document.getElementById("webgl-output").appendChild(renderer.domElement);
		// render the scene
		renderer.render(scene, camera);
	}

	loadScene();
});
