(function () {
    // Set our main variables
    let scene,
        renderer,
        camera,
        model, // Our character
        possibleAnims, // Animations found in our file
        mixer, // THREE.js animations mixer
        idle, // Idle, the default state our character returns to
        clock = new THREE.Clock(), // Used for anims, which run to a clock instead of frame rate 
        loaderAnim = document.getElementById('js-loader');


    scene = new THREE.Scene();

    const MODEL_PATH = 'new-model-no-lines.glb';
    // const MODEL_PATH = 'new-model-compressed.glb';
    const canvasContainer = document.querySelector('.canvas-container')
    const canvas = document.querySelector('#spheres_canvas');
    const backgroundColor = null;



    //var ambientlight = new THREE.AmbientLight(0xffffff, 1500)
    //scene.add(ambientlight);
    //var ambientlight2 = new THREE.AmbientLight(0xffffff, 200)
    //scene.add(ambientlight2);
    const sizes = {
        width: canvasContainer.offsetWidth,
        height: canvasContainer.offsetHeight
    }

    init();

    function init() {

        // Init the scene
        scene.background = null;


        // Init the renderer
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.shadowMap.enabled = true;
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.receiveShadow = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.physicallyCorrectLights = true;
        var max = renderer.capabilities.getMaxAnisotropy();
        // document.body.appendChild(renderer.domElement);

        // Add a camera
        camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            1000);


        var loader = new THREE.GLTFLoader();

        loader.load(
            MODEL_PATH,
            function (gltf) {
                camera = gltf.cameras['0'];
                mixer = new THREE.AnimationMixer(gltf.scene);
                var action = mixer.clipAction(gltf.animations[0]);
                action.setLoop(THREE.LoopOnce);
                action.startAt(1);
                action.clampWhenFinished = true;
                action.play();
                model = gltf.scene;
                let fileAnimations = gltf.animations;

                model.traverse(o => {

                    if (o.isMesh) {
                        o.castShadow = true;
                        o.receiveShadow = true;
                        if (o.material.map) o.material.map.anisotropy = 32;
                    }
                    // Reference the neck and waist bones

                });

                scene.add(model);
                loaderAnim.remove();



                var spotLight = new THREE.SpotLight(0xf5f5f5, 15);
                spotLight.position.set(12, 5, 12);
                spotLight.angle = 1;
                spotLight.penumbra = 0.8;
                spotLight.decay = 0.1;
                spotLight.distance = 65;
                spotLight.castShadow = true;
                //spotLight.power = 200;
                //spotLight.shadow.mapSize.width = window.innerWidth;
                //spotLight.shadow.mapSize.height = window.innerHeight;
                spotLight.shadow.camera.near = 0.1;
                spotLight.shadow.camera.far = 5;
                spotLight.shadow.bias = -0.5;
                //spotLight.shadow.radius = 5;

                //const axesHelper = new THREE.AxesHelper( 10);
                //scene.add( axesHelper );


                //spotLight.target.position = new THREE.Object3D( 0, 0, 0 );
                //scene.add( spotLight.target );
                scene.add(spotLight);

                var spotLight2 = new THREE.SpotLight(0xF8F0E3, 150);
                spotLight2.position.set(12, 6, 12);
                spotLight2.angle = 1;
                spotLight2.penumbra = 1;
                spotLight2.decay = 0.1;
                spotLight2.distance = 35;
                spotLight2.castShadow = true;
                //spotLight.power = 200;
                spotLight2.shadow.mapSize.width = 3096;
                spotLight2.shadow.mapSize.height = 3096;
                spotLight2.shadow.camera.near = 1;
                spotLight2.shadow.camera.far = 5;
                //spotLight2.shadow.bias = -0.5;
                scene.add(spotLight2);

                var ambientlight = new THREE.AmbientLight(0x696969, 15)
                scene.add(ambientlight);

                var light = new THREE.HemisphereLight(0xffffff, 0xd3d3d3, 15)
                light.position.set(15, 15, 4)
                //scene.add(light);


                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset;

                mixer.addEventListener('finished', () => {
                    animateText()
                })

            },
            undefined, // We don't need this function
            function (error) {
                console.error(error);
            });


    }



    function animate() {
        requestAnimationFrame(animate);

        var delta = clock.getDelta();

        if (mixer) mixer.update(delta);

        if (resizeRendererToDisplaySize(renderer)) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

    }
    animate();

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        let width = canvasContainer.offsetWidth;
        let height = canvasContainer.offsetHeight;
        let canvasPixelWidth = canvas.width / window.devicePixelRatio;
        let canvasPixelHeight = canvas.height / window.devicePixelRatio;

        const needResize =
            canvasPixelWidth !== width || canvasPixelHeight !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = canvasContainer.offsetWidth
        sizes.height = canvasContainer.offsetHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })


    function animateText() {
        var tl = gsap.timeline();
        tl.to(".stat-group.__visit", { opacity: 1, x: 0, duration: 1 });
        tl.to(".stat-group.__completion", { opacity: 1, x: 0, duration: 1 }, "-=0.75");
        tl.to(".stat-group.__initiation", { opacity: 1, x: 0, duration: 1 }, "-=0.75");
        // tl.to("#id", { y: 50, duration: 1 });
        // tl.to("#id", { opacity: 0, duration: 1 });
    }

})();