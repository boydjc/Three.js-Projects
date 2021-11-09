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

		camera.position.set(0,0,0);
		camera.lookAt(scene.position);

		// add the output of the renderer to the html element
		document.getElementById("webgl-output").appendChild(renderer.domElement);

		function renderScene() {
			stats.update();
			requestAnimationFrame(renderScene);
			renderer.render(scene, camera);
		}
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
