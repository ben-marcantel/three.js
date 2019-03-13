var camera, scene, renderer,effect;
var controls, clock;

function setup() {
   // document.body.style.backgroundColor = '#ffffff';
    setupThreeJS();
    setupWorld();
    requestAnimationFrame(function animate() {
      //  renderer.render(scene, camera);
      effect.render(scene,camera);
        controls.update(clock.getDelta());
        requestAnimationFrame(animate);
    });
}

function setupThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth /
    window.innerHeight, 1, 10000);
    camera.position.y = 400;
    camera.position.z = 400;
    camera.rotation.x = -45 * Math.PI / 180;
    renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    effect = new THREE.AsciiEffect( renderer, 'yes#):>*x-.`', { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = 'blue';
    effect.domElement.style.backgroundColor = 'black';
  //  document.body.appendChild(renderer.domElement);
    document.body.appendChild( effect.domElement );
}

function setupWorld() {

 // Floor
var geo = new THREE.PlaneGeometry(2500, 2500, 20, 20);
var mat = new THREE.MeshBasicMaterial({color: 0x4f0023});
mat.transparent = true;
mat.opacity = 0.85;
var floor = new THREE.Mesh(geo, mat);
floor.rotation.x = -90 * Math.PI / 180;

 // Original building
 var geometry = new THREE.CylinderGeometry( 1, 1, 1, 32 );
//var geometry = new THREE.CubeGeometry(1, 1, 1);
geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5,0));
   
var material = new THREE.MeshPhongMaterial({color:0xa5003c});
material.transparent = true;
material.opacity = 0.95;

var light = new THREE.DirectionalLight(0xffffff, 1);

light.position.set(1, 3, 2);

scene.add(floor);
scene.add(light);
scene.fog = new THREE.FogExp2(0xff5e96, 0.005,1000);

 // Cloned buildings
var cityGeometry = new THREE.Geometry();

 for (var i = 0; i < 35; i++) {
  var building = new THREE.Mesh(geometry.clone());
  building.position.x = Math.floor(Math.random() * 200 - 100) * 4;
  building.position.z = Math.floor(Math.random() * 200 - 100) * 4;
  building.scale.x = Math.random() * 50 + 10;
  building.scale.y = Math.random() * building.scale.x * 8 + 8;
  building.scale.z = building.scale.x;
  THREE.GeometryUtils.merge(cityGeometry, building);
 }

var city = new THREE.Mesh(cityGeometry, material);

scene.add(city);

renderer.shadowMap.enabled = true;
floor.receiveShadow = true;
city.castShadow = true;
city.receiveShadow = true;
light.castShadow = true;
light.shadowDarkness = 0.5;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.position.set(500, 1500, 1000);
light.shadow.camera.far = 2500;
// DirectionalLight only; not necessary for PointLight
light.shadow.camera.left = -1000;
light.shadow.camera.right = 1000;
light.shadow.camera.top = 1000;
light.shadow.camera.bottom = -1000;


clock = new THREE.Clock();
controls = new THREE.FirstPersonControls( camera );
controls.movementSpeed = 100;
controls.lookSpeed = 0.05;


projector = new THREE.Projector();

renderer.domElement.addEventListener('mousedown',function(event){
    let vector = new THREE.Vector3(renderer.devicePixelRatio * (event.pageX - this.offsetLeft)/this.width *2 -1, -renderer.devicePixelRatio * (event.pageY - this.offsetTop)/0);
   
    projector.unprojectVector(vector, camera);

    let raycaster = new THREE.Raycaster(camera.position,vector.sub(camera.position).normalize())
    // let intersects = raycaster.intersectObjects(OBJECTS);
    // if(intersects.length){
    //     console.log("yo!");
    // }
    }, false)


}
// Run it!
setup();