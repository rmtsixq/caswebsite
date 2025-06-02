// Sayfa yüklendiğinde çalışacak kod
window.addEventListener('load', () => {
    // Globe container'ı
    const container = document.getElementById('globe');
    
    // Three.js scene oluşturma
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    const bumpTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
    const specularTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');

    // Earth sphere
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.1,
        specularMap: specularTexture,
        specular: new THREE.Color('grey'),
        shininess: 5
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(5.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a1a,
        transparent: true,
        opacity: 0.2
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Lights
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x404040));

    // Camera position
    camera.position.z = 15;

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.minDistance = 15;
    controls.maxDistance = 15;
    controls.enablePan = false;

    // Diyarbakır, Private Ruzgar Anatolian Lisesi (tam koordinat)
    const school = { name: "Private Ruzgar Anatolian Lisesi", lat: 37.9283761496872, lng: 41.181072227719696 };

    // Convert lat/lng to 3D coordinates
    function latLngToVector3(lat, lng, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.sin(phi) * Math.sin(theta));
        const y = (radius * Math.cos(phi));
        return new THREE.Vector3(x, y, z);
    }

    // Create a group for markers and labels
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);

    // Add school marker
    const position = latLngToVector3(school.lat, school.lng, 5.1);
    const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xe63946 });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.copy(position);
    markersGroup.add(marker);

    // Add label
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 96;
    context.fillStyle = '#ffffff';
    context.font = 'bold 32px Arial';
    context.fillText(school.name, 10, 60);
    
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.SpriteMaterial({ map: texture });
    const label = new THREE.Sprite(labelMaterial);
    label.position.copy(position);
    label.position.multiplyScalar(1.12);
    label.scale.set(4, 0.8, 1);
    markersGroup.add(label);

    // Globe'u Diyarbakır'a odakla
    let initialY = -((school.lng + 90) * Math.PI / 180);
    let initialX = (school.lat - 0) * Math.PI / 180 * 0.2;
    earth.rotation.y = initialY;
    earth.rotation.x = initialX;
    atmosphere.rotation.y = initialY;
    atmosphere.rotation.x = initialX;
    markersGroup.rotation.y = initialY;
    markersGroup.rotation.x = initialX;

    // Otomatik döndürme için değişken
    let autoRotate = true;

    // Globe otomatik dönsün
    function animate() {
        requestAnimationFrame(animate);
        if (autoRotate) {
            earth.rotation.y += 0.001;
            atmosphere.rotation.y += 0.001;
            markersGroup.rotation.y += 0.001;
        }
        controls.update();
        renderer.render(scene, camera);
    }

    // Kullanıcı mouse ile döndürmeye başlarsa otomatik döndürmeyi durdur
    controls.addEventListener('start', () => { autoRotate = false; });

    // Pencere boyutu değiştiğinde yeniden boyutlandırma
    window.addEventListener('resize', () => {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Animasyonu başlat
    animate();
}); 