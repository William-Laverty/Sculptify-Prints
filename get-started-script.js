const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const modelViewerContainer = document.getElementById('model-viewer-container');

let scene, camera, renderer, controls, model;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, modelViewerContainer.offsetWidth / modelViewerContainer.offsetHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(modelViewerContainer.offsetWidth, modelViewerContainer.offsetHeight);
    modelViewerContainer.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function loadModel(url, type) {
    scene.remove(model);

    const loader = new THREE.STLLoader();
    if (type === 'obj') {
        loader = new THREE.OBJLoader();
    } else if (type === 'gltf' || type === 'glb') {
        loader = new THREE.GLTFLoader();
    }

    loader.load(url, (loadedModel) => {
        model = loadedModel;
        model.position.y = -1;
        scene.add(model);
        animate();
    });
}

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.stl')) {
        loadModel(URL.createObjectURL(file), 'stl');
    } else if (fileName.endsWith('.obj')) {
        loadModel(URL.createObjectURL(file), 'obj');
    } else if (fileName.endsWith('.gltf') || fileName.endsWith('.glb')) {
        loadModel(URL.createObjectURL(file), 'gltf');
    } else {
        alert('Unsupported file format. Please upload an STL, OBJ, GLTF, or GLB file.');
    }
});

uploadButton.addEventListener('click', () => {
    fileInput.click();
});

init();