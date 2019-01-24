let camera;
let scene;
let backgroundScene;
let backgroundCamera;
let renderer;
let geometry;
let material;
let mesh;
let mesh2;
let image;
let orbit;
let orbitDir;
let loader;
let mouse;
let raycaster;
let synth;
let utterThis;


const talky = ()=>{
    synth = window.speechSynthesis;
    utterThis = new SpeechSynthesisUtterance("Oh, Hey, What is up dog?");
    utterThis.rate = 0.6;
    utterThis.pitch = 0;
    synth.speak(utterThis);
}

const onclick = (event)=> {
    talky();
    // mouse = new THREE.Vector2();
    // raycaster.setFromCamera(mouse, camera);
    
    // let intersects = raycaster.intersectObjects([mesh], true); //array
    // if (intersects.length > 0) {
    //     selectedObject = intersects[0];
    //     console.log("selected",selectedObject)
    //     if(mesh.name=="yo"){
    //         talky();
    //     }
    // }
}

const init=()=>{
    image = THREE.ImageUtils.loadTexture('./images/pink.jpg');
    image2 = THREE.ImageUtils.loadTexture('./images/frisbee.jpg');

    scene = new THREE.Scene();
    geometry = new THREE.SphereGeometry(200, 64, 64);
    material = new THREE.MeshBasicMaterial({map: image});
    material2 = new THREE.MeshBasicMaterial({map: image2});


    mesh = new THREE.Mesh(geometry.clone(),material.clone());
    mesh2 = new THREE.Mesh(geometry.clone(),material2.clone());

    mesh2.scale.x=.25;
    mesh2.scale.y=.25;
    mesh2.scale.z=.25;
    mesh2.position.x=300;


   
    // loader = new THREE.TextureLoader();
    // bgTexture = loader.load("./images/space.jpg");
    // scene.background = bgTexture;
    

    renderer = new THREE.WebGLRenderer({antialias: true,alpha:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer.domElement.addEventListener("click", onclick, true);
    var selectedObject;
    
    orbit = new THREE.Group();
    orbitDir = new THREE.Group();
    orbitDir.rotation.x = 0.25;
   
    
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1000);
    camera.position.z = 500;

    orbit.add(mesh);
    orbit.add(mesh2);
    orbitDir.add(orbit);
    scene.add(orbitDir);
    scene.add(camera);
}

const onWindowResize = ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


const render=()=>{
    let date = Date.now() * .0001;
    mesh.rotation.x = date;
    mesh.rotation.y = date;
    mesh2.rotation.x = date * 2;
    mesh2.rotation.y = date * 2;
    orbit.rotation.y += 0.01;
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(scene, camera);
}

const animate = ()=> {
    requestAnimationFrame(animate);
    render();   
    window.addEventListener( 'resize', onWindowResize, false );
}


init();
animate();
