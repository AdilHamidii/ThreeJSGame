
// WELCOME PAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE


function showWelcomebv() {
  const bv = document.getElementById('bvpagee');
  bv.style.display = 'flex';
}

function hideWelcomebv() {
  const bv = document.getElementById('bvpagee');
  bv.style.display = 'none'; 
}


window.onload = function() {
  showWelcomebv(); 

  const FacileButton = document.getElementById('facile-button');
  const expertButton = document.getElementById('difficile-button');

  FacileButton.addEventListener('click', function() {
    hideWelcomebv();
  });

  expertButton.addEventListener('click', function() {
    hideWelcomebv();
  });
};


// BASE THREEJS + BASE SETTINGSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff);
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x =1;
camera.position.y =12;
camera.position.z =18;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const axis3D = new THREE.AxesHelper(5);
scene.add(axis3D);
const light = new THREE.DirectionalLight(0xffffff, 0.8); 
light.position.set(0, 10, 0);
scene.add(light);


// GUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII



const gui = new dat.GUI();
const cameraParams = {
  positionX: camera.position.x,
  positionY: camera.position.y,
  positionZ: camera.position.z,
  lookAtX: 0,
  lookAtY: 0,
  lookAtZ: 0,
  fov: camera.fov
};
gui.add(cameraParams, 'positionX', -100, 100).name('Camera X').onChange(function(value) {
  camera.position.x = value;
  camera.lookAt(cameraParams.lookAtX, cameraParams.lookAtY, cameraParams.lookAtZ);
});
gui.add(cameraParams, 'positionY', -100, 100).name('Camera Y').onChange(function(value) {
  camera.position.y = value;
  camera.lookAt(cameraParams.lookAtX, cameraParams.lookAtY, cameraParams.lookAtZ);
});
gui.add(cameraParams, 'positionZ', -180, 180).name('Camera Z').onChange(function(value) {
  camera.position.z = value;
  camera.lookAt(cameraParams.lookAtX, cameraParams.lookAtY, cameraParams.lookAtZ);
});
gui.add(cameraParams, 'lookAtX', -180, 180).name('Look At X').onChange(function(value) {
  cameraParams.lookAtX = value;
  camera.lookAt(cameraParams.lookAtX, cameraParams.lookAtY, cameraParams.lookAtZ);
});
gui.add(cameraParams, 'lookAtY', -180, 180).name('Look At Y').onChange(function(value) {
  cameraParams.lookAtY = value;
  camera.lookAt(cameraParams.lookAtX, cameraParams.lookAtY, cameraParams.lookAtZ);
});
gui.add(cameraParams, 'fov', 10, 170).name('Field of View').onChange(function(value) {
  camera.fov = value;
  camera.updateProjectionMatrix();
});
camera.lookAt(cameraParams.lookAtX, cameraParams.lookAtY, cameraParams.lookAtZ);

// OBJECTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS


// Floor

const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// STRUCT 3
const structure = new THREE.Group();
const material = new THREE.MeshStandardMaterial({ color: 0x000000}); 
const verticalGeometry = new THREE.CylinderGeometry(0.3, 0.3, 5, 32);
const leftCylinder = new THREE.Mesh(verticalGeometry, material);
const rightCylinder = new THREE.Mesh(verticalGeometry, material);
leftCylinder.position.set(-2, 2.5, 0);
rightCylinder.position.set(2, 2.5, 0);
const horizontalGeometry = new THREE.CylinderGeometry(0.3, 0.3, 4, 32);
const horizontalCylinder = new THREE.Mesh(horizontalGeometry, material);
horizontalCylinder.rotation.z = Math.PI / 2;
horizontalCylinder.position.set(0, 5, 0);
const jointGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const leftJoint = new THREE.Mesh(jointGeometry, material);
const rightJoint = new THREE.Mesh(jointGeometry, material);
leftJoint.position.set(-2, 5, 0); 
rightJoint.position.set(2, 5, 0);
structure.add(leftCylinder);
structure.add(rightCylinder);
structure.add(horizontalCylinder);
structure.add(leftJoint);
structure.add(rightJoint);
structure.position.y = 0;

const structure1 = structure.clone();
scene.add(structure1);
structure1.position.set(0, 0, 0);

const structure2 = structure.clone();
scene.add(structure2);
structure2.position.set(3, 0, -8);

const structure3 = structure.clone();
scene.add(structure3);
structure3.position.set(-3, 0, -15);


// BALL
const ballgeometry = new THREE.SphereGeometry(0.5, 16, 16); 
const ballmaterial = new THREE.MeshBasicMaterial({ color: 0xFFA500 }); 
const sphere = new THREE.Mesh(ballgeometry, ballmaterial);
scene.add(sphere);
sphere.position.y = 0.5;
sphere.position.z = 5;
sphere.position.x = -0.35;


// Robot Creation
const robot = new THREE.Group();
const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 1;
robot.add(body);
const headGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const headMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.set(0, 2.5, 0);
robot.add(head);
const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32);
const armMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const leftArm = new THREE.Mesh(armGeometry, armMaterial);
const rightArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.position.set(-0.8, 1.5, 0); 
rightArm.position.set(0.8, 1.5, 0);
leftArm.rotation.z = Math.PI / 4;
rightArm.rotation.z = -Math.PI / 4;
robot.add(leftArm);
robot.add(rightArm);
const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
const legMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
leftLeg.position.set(-0.5, -0.5, 0); 
rightLeg.position.set(0.5, -0.5, 0); 
robot.add(leftLeg);
robot.add(rightLeg);
scene.add(robot);
robot.position.set(1, 1, 6);


// HAMMER 


const malletGroup = new THREE.Group();
const malletHeadGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
const malletHeadMaterial = new THREE.MeshBasicMaterial({ color: 0x2BFAFA }); 
const malletHead = new THREE.Mesh(malletHeadGeometry, malletHeadMaterial);
malletHead.position.set(0, 1.5, 0); 
malletGroup.add(malletHead);
malletHead.rotation.y = Math.PI/2;
const malletHandleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.5, 32); 
const malletHandleMaterial = new THREE.MeshBasicMaterial({ color: 0x2BFAFA }); 
const malletHandle = new THREE.Mesh(malletHandleGeometry, malletHandleMaterial);
malletHandle.position.set(0, 0.5, 0); 
malletGroup.add(malletHandle);
scene.add(malletGroup);
malletGroup.position.set(-0.3, 2.1, 6); 
malletGroup.rotation.x = Math.PI; 




const radius = 5;
const height = 10; 
const radialSegments = 64; // Pour un objet sans gap on peut faire une valeur de 128 
const geometry = new THREE.ConeGeometry(radius, height, radialSegments, 1, true, Math.PI / 2, Math.PI);
const material3 = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
const halfCone = new THREE.Mesh(geometry, material3);
scene.add(halfCone);

halfCone.position.z = -25;












// ANIMATIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


let isKicking = false;
let kickProgress = 0;
let t1 = 0;
let t2 = 0;
let t3 = 0;

let isBallMoving = false;
let currentCurve = 1;  


const curve1ControlPoints = [
  new THREE.Vector3(-0.35, 0.5, 5),          // Start at (0, 0, 0)
  new THREE.Vector3(1.5, 1.5, -4),       // Control point to guide the curve
  new THREE.Vector3(2.5, 1.5, -7),       // Control point to approach (3, 0, -8)
  new THREE.Vector3(3, 0.5, -8)          // End at (3, 0, -8)
];

const curve2ControlPoints = [
  new THREE.Vector3(3, 0.5, -8),         // Start at (3, 0, -8)
  new THREE.Vector3(2, 1, -10),        // Control point to smooth the curve
  new THREE.Vector3(-1, 1, -12),       // Control point to steer towards (-3, 0, -15)
  new THREE.Vector3(-3, 0.5, -15)        // End at (-3, 0, -15)
];

const curve3ControlPoints = [
  new THREE.Vector3(-3, 0.5, -15),       // Start at (-3, 0, -15)
  new THREE.Vector3(-2, 1, -19),       // Control point for smooth continuation
  new THREE.Vector3(-1, 1, -23),     // Another control point to steer the path
  new THREE.Vector3(0, 0.5, -25)        // End point for further travel (adjustable)
];

function getCubicBezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const p = p0.clone().multiplyScalar(uuu);
  p.add(p1.clone().multiplyScalar(3 * uu * t));
  p.add(p2.clone().multiplyScalar(3 * u * tt));
  p.add(p3.clone().multiplyScalar(ttt));

  return p;
}


function updateBallPosition() {
  if (isBallMoving) {
    let newPos;

    if (currentCurve === 1 && t1 <= 1) {
      
      newPos = getCubicBezierPoint(t1, ...curve1ControlPoints);
      t1 += 0.01;  
      sphere.position.set(newPos.x, newPos.y, newPos.z);
      if (t1 > 1) currentCurve = 2;  
    } else if (currentCurve === 2 && t2 <= 1) {
      
      newPos = getCubicBezierPoint(t2, ...curve2ControlPoints);
      t2 += 0.01;  
      sphere.position.set(newPos.x, newPos.y, newPos.z);
      if (t2 > 1) currentCurve = 3;  
    } else if (currentCurve === 3 && t3 <= 1) {
    
      newPos = getCubicBezierPoint(t3, ...curve3ControlPoints);
      t3 += 0.01;  
      sphere.position.set(newPos.x, newPos.y, newPos.z);
      if (t3 > 1) {
        isBallMoving = false;  
        t3 = 1; 
      }
    }
  }
}


function onKeyDown(event) {
  if (event.code === 'Space' && !isKicking) {
    isKicking = true;
    kickProgress = 0; 
    isBallMoving = true;
    currentCurve = 1;  
    t1 = 0;  
    t2 = 0; 
    t3 = 0;  
  }
}

function update() {
  
  updateBallPosition();

 
  if (isKicking) {
    if (kickProgress < 0.4) {
      kickProgress += 0.01; 
      malletGroup.rotation.x = malletGroup.rotation.x + 0.01;
      if (kickProgress >= 0.4) {
        isKicking = false;
        malletGroup.rotation.x = Math.PI;  
      }
    }
  }


  renderer.render(scene, camera);
  requestAnimationFrame(update); 
}

window.addEventListener('keydown', onKeyDown);

update();
