document.addEventListener('DOMContentLoaded', function(event) {
	function loadScene() {
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(45, window.innerWIdth/ window.innerHeight, 0.1, 1000);
		var renderer = new THREE.WEBGLRenderer();
		renderer.setClearColor(new THREE.Color(0x000000));
		renderer.setSize(window.innerWidth, window.innerHeight);

		// position and point the camera to the center of the scene
		camera.position.set(-30, 40, 30);
		camera.lookAt(scene.position);

		// add the ouput of the renderer to the html element
		document.getElementById("webgl-output").appendChild(renderer.domElement);
		// render the scene
		renderer.render(scene, camera);
	}
});
