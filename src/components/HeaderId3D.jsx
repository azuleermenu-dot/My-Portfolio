import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CARD_WIDTH = 2.08;
const CARD_HEIGHT = 2.9;
const CARD_DEPTH = 0.12;

function roundedShape(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function createPortraitTextures() {
  const width = 640;
  const height = 880;
  const frontCanvas = document.createElement('canvas');
  const backCanvas = document.createElement('canvas');
  frontCanvas.width = backCanvas.width = width;
  frontCanvas.height = backCanvas.height = height;

  const front = frontCanvas.getContext('2d');
  const back = backCanvas.getContext('2d');

  const drawFront = (portrait) => {
    const gradient = front.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#343027');
    gradient.addColorStop(.48, '#151512');
    gradient.addColorStop(1, '#090909');
    front.fillStyle = gradient;
    front.fillRect(0, 0, width, height);

    front.strokeStyle = 'rgba(221,178,112,.85)';
    front.lineWidth = 5;
    roundRect(front, 14, 14, width - 28, height - 28, 25);
    front.stroke();

    front.fillStyle = '#d5ad72';
    front.beginPath();
    front.roundRect(34, 34, 66, 66, 18);
    front.fill();
    front.fillStyle = '#21180f';
    front.font = 'bold 31px Arial';
    front.textAlign = 'center';
    front.fillText('AA', 67, 77);

    front.textAlign = 'left';
    front.fillStyle = '#eee6d8';
    front.font = 'bold 23px Arial';
    front.fillText('CREATOR IDENTIFICATION', 121, 59);
    front.fillStyle = '#b6a58b';
    front.font = '15px Arial';
    front.fillText('INDEPENDENT DIGITAL PRACTICE', 121, 84);

    const px = 34, py = 126, pw = 572, ph = 505;
    front.fillStyle = '#28231b';
    roundRect(front, px, py, pw, ph, 18);
    front.fill();

    if (portrait && portrait.complete && portrait.naturalWidth) {
      const scale = Math.max(pw / portrait.naturalWidth, ph / portrait.naturalHeight);
      const sw = pw / scale;
      const sh = ph / scale;
      const sx = (portrait.naturalWidth - sw) / 2;
      const sy = Math.max(0, (portrait.naturalHeight - sh) * .18);
      front.save();
      roundRect(front, px, py, pw, ph, 18);
      front.clip();
      front.drawImage(portrait, sx, sy, sw, sh, px, py, pw, ph);
      const photoShade = front.createLinearGradient(0, py, 0, py + ph);
      photoShade.addColorStop(.55, 'rgba(0,0,0,0)');
      photoShade.addColorStop(1, 'rgba(0,0,0,.55)');
      front.fillStyle = photoShade;
      front.fillRect(px, py, pw, ph);
      front.restore();
    } else {
      front.fillStyle = '#b99a6a';
      front.font = 'bold 40px Arial';
      front.textAlign = 'center';
      front.fillText('PORTRAIT', width / 2, py + ph / 2);
      front.textAlign = 'left';
    }

    front.fillStyle = '#f4ecdf';
    front.font = 'bold 48px Arial';
    front.fillText('ASNOR ALI', 38, 704);
    front.fillStyle = '#d7b47d';
    front.font = 'bold 20px Arial';
    front.fillText('FREELANCE WEB DEVELOPER', 40, 740);

    front.strokeStyle = 'rgba(220,178,112,.7)';
    front.lineWidth = 2;
    front.beginPath();
    front.moveTo(40, 772);
    front.lineTo(600, 772);
    front.stroke();

    front.fillStyle = '#b8ad9c';
    front.font = '15px Arial';
    front.fillText('INDEPENDENT  /  SELF-EMPLOYED', 40, 811);
    front.textAlign = 'right';
    front.fillStyle = '#e5c58f';
    front.fillText('PH  ·  2026', 600, 811);
    front.textAlign = 'left';

    if (frontTexture) frontTexture.needsUpdate = true;
  };

  const backGradient = back.createLinearGradient(0, 0, width, height);
  backGradient.addColorStop(0, '#32291d');
  backGradient.addColorStop(.5, '#171613');
  backGradient.addColorStop(1, '#0c0c0a');
  back.fillStyle = backGradient;
  back.fillRect(0, 0, width, height);
  back.strokeStyle = 'rgba(221,178,112,.85)';
  back.lineWidth = 5;
  roundRect(back, 14, 14, width - 28, height - 28, 25);
  back.stroke();

  back.fillStyle = '#d5ad72';
  back.font = 'bold 29px Arial';
  back.fillText('AA  /  ASNOR ALI', 42, 79);
  back.strokeStyle = 'rgba(220,178,112,.55)';
  back.beginPath();
  back.moveTo(42, 112);
  back.lineTo(598, 112);
  back.stroke();

  back.fillStyle = '#f1e9dc';
  back.font = 'bold 75px Arial';
  back.fillText('DESIGN.', 40, 300);
  back.fillText('DEVELOP.', 40, 397);
  back.fillStyle = '#d7b47d';
  back.font = 'normal 75px Arial';
  back.fillText('DELIVER.', 40, 494);

  back.fillStyle = '#b8ad9c';
  back.font = '19px Arial';
  back.fillText('DIGITAL EXPERIENCES / WEB DEVELOPMENT', 42, 558);
  back.strokeStyle = 'rgba(220,178,112,.55)';
  back.beginPath();
  back.moveTo(42, 594);
  back.lineTo(598, 594);
  back.stroke();

  back.fillStyle = '#e2c28e';
  back.font = 'bold 22px Arial';
  back.fillText('ASNORALI.VERCEL.APP', 42, 646);

  for (let x = 42; x < 598; x += 8) {
    back.fillStyle = '#e9dfcc';
    back.fillRect(x, 694, (x % 3) + 2, 64);
  }

  back.fillStyle = '#9e9588';
  back.font = '14px Arial';
  back.fillText('PERSONAL BRAND OBJECT  ·  NOT AN OFFICIAL ID', 42, 813);

  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.anisotropy = 4;
  drawFront(null);

  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.anisotropy = 4;

  const portrait = new Image();
  portrait.decoding = 'async';
  portrait.onload = () => drawFront(portrait);
  portrait.onerror = () => drawFront(null);
  portrait.src = '/asnor-ali.webp';

  return { frontTexture, backTexture };
}
function makeRoundedBody() {
  const shape = roundedShape(CARD_WIDTH, CARD_HEIGHT, .14);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: CARD_DEPTH,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: .035,
    bevelThickness: .025,
    curveSegments: 16,
  });
  geometry.computeVertexNormals();
  return geometry;
}

function createRibbon(scene, anchorX, anchorY, endpoint) {
  const count = 15;
  const points = [];
  const previous = [];
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const point = new THREE.Vector3(
      THREE.MathUtils.lerp(anchorX, endpoint.x, t),
      THREE.MathUtils.lerp(anchorY, endpoint.y, t) - Math.sin(Math.PI * t) * .12,
      .05 + Math.sin(Math.PI * t) * .055
    );
    points.push(point);
    previous.push(point.clone());
  }

  const positions = new Float32Array(count * 2 * 3);
  const indices = [];
  for (let i = 0; i < count - 1; i += 1) {
    const a = i * 2;
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setIndex(indices);

  const material = new THREE.MeshStandardMaterial({
    color: 0xb58a53,
    metalness: .26,
    roughness: .72,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  return { points, previous, geometry, material, count, anchorX, anchorY };
}

function updateRibbon(ribbon, endPoint, dt) {
  const { points, previous, count, anchorX, anchorY } = ribbon;
  const anchor = new THREE.Vector3(anchorX, anchorY, .05);
  points[0].copy(anchor);
  points[count - 1].copy(endPoint);

  const gravity = -3.8;
  const dtSquared = dt * dt;
  for (let i = 1; i < count - 1; i += 1) {
    const current = points[i];
    const old = previous[i];
    const velocity = current.clone().sub(old).multiplyScalar(.986);
    previous[i].copy(current);
    current.add(velocity);
    current.y += gravity * dtSquared;
    current.z += (0 - current.z) * dtSquared * 1.8;
  }

  const restLength = anchor.distanceTo(endPoint) / (count - 1) * 1.015;
  for (let pass = 0; pass < 7; pass += 1) {
    points[0].copy(anchor);
    points[count - 1].copy(endPoint);
    for (let i = 0; i < count - 1; i += 1) {
      const a = points[i];
      const b = points[i + 1];
      const delta = b.clone().sub(a);
      const distance = Math.max(delta.length(), .0001);
      const correction = delta.multiplyScalar((distance - restLength) / distance);
      if (i === 0) b.sub(correction);
      else if (i + 1 === count - 1) a.add(correction);
      else {
        a.addScaledVector(correction, .5);
        b.addScaledVector(correction, -.5);
      }
    }
  }

  const position = ribbon.geometry.getAttribute('position');
  const forward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < count; i += 1) {
    const tangent = points[Math.min(count - 1, i + 1)]
      .clone()
      .sub(points[Math.max(0, i - 1)])
      .normalize();
    const side = tangent.clone().cross(forward).normalize().multiplyScalar(.085);
    const p = points[i];
    position.setXYZ(i * 2, p.x - side.x, p.y - side.y, p.z - side.z);
    position.setXYZ(i * 2 + 1, p.x + side.x, p.y + side.y, p.z + side.z);
  }
  position.needsUpdate = true;
  ribbon.geometry.computeVertexNormals();
}

export default function HeaderId3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    let animationId = 0;
    let resizeObserver;
    let disposed = false;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        premultipliedAlpha: false,
      });
    } catch (error) {
      mount.classList.add('header-id3d-stage--fallback');
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvas = renderer.domElement;
    canvas.className = 'header-id3d-canvas';
    canvas.setAttribute('role', 'button');
    canvas.setAttribute('tabindex', '0');
    canvas.setAttribute('aria-label', 'Interactive 3D hanging portfolio ID badge. Move to swing and tilt; tap or press Enter to flip.');
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, mount.clientWidth / mount.clientHeight, .1, 40);
    camera.position.set(0, -.22, 7.4);
    camera.lookAt(0, -.22, 0);

    scene.add(new THREE.HemisphereLight(0xf8ead4, 0x171411, 1.6));
    const keyLight = new THREE.DirectionalLight(0xffe3b7, 3.1);
    keyLight.position.set(-3.5, 4.5, 6);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xa7c2d0, 1.05);
    fillLight.position.set(4, 1.5, 3);
    scene.add(fillLight);
    const rimLight = new THREE.PointLight(0xd9a65e, 1.8, 10);
    rimLight.position.set(1.6, -1.3, 2.5);
    scene.add(rimLight);

    // Small metal mount seated against the underside of the website header.
    const mountPlate = new THREE.Mesh(
      new THREE.BoxGeometry(.72, .13, .14),
      new THREE.MeshStandardMaterial({ color: 0x9a794d, metalness: .88, roughness: .24 })
    );
    mountPlate.position.set(0, 1.68, .02);
    scene.add(mountPlate);

    const anchorRings = [];
    for (const x of [-.2, .2]) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(.075, .018, 12, 24),
        new THREE.MeshStandardMaterial({ color: 0xd7c8a8, metalness: .95, roughness: .19 })
      );
      ring.position.set(x, 1.59, .06);
      scene.add(ring);
      anchorRings.push(ring);
    }

    const badgePivot = new THREE.Group();
    badgePivot.position.set(0, .66, 0);
    scene.add(badgePivot);

    const card = new THREE.Group();
    card.position.set(0, -CARD_HEIGHT / 2 - .17, 0);
    badgePivot.add(card);

    const core = new THREE.Mesh(
      makeRoundedBody(),
      new THREE.MeshPhysicalMaterial({
        color: 0x29241b,
        metalness: .72,
        roughness: .28,
        clearcoat: 1,
        clearcoatRoughness: .22,
      })
    );
    core.position.z = -CARD_DEPTH / 2;
    core.castShadow = true;
    core.receiveShadow = true;
    card.add(core);

    const textures = createPortraitTextures();

    const faceGeometry = new THREE.PlaneGeometry(CARD_WIDTH - .13, CARD_HEIGHT - .13);
    const frontFace = new THREE.Mesh(
      faceGeometry,
      new THREE.MeshPhysicalMaterial({
        map: textures.frontTexture,
        color: 0xffffff,
        roughness: .36,
        metalness: .08,
        clearcoat: .85,
        clearcoatRoughness: .2,
      })
    );
    frontFace.position.z = CARD_DEPTH / 2 + .033;
    card.add(frontFace);

    const backFace = new THREE.Mesh(
      faceGeometry,
      new THREE.MeshPhysicalMaterial({
        map: textures.backTexture,
        roughness: .42,
        metalness: .12,
        clearcoat: .8,
      })
    );
    backFace.position.z = -CARD_DEPTH / 2 - .033;
    backFace.rotation.y = Math.PI;
    card.add(backFace);

    // Machined alloy trim and eyelets give the badge visible physical thickness.
    const rimMaterial = new THREE.MeshStandardMaterial({ color: 0xc6a16b, metalness: .95, roughness: .2 });
    const topLoop = new THREE.Mesh(new THREE.TorusGeometry(.16, .027, 12, 36), rimMaterial);
    topLoop.position.set(0, CARD_HEIGHT / 2 + .045, .02);
    card.add(topLoop);

    for (const x of [-.43, .43]) {
      const eyelet = new THREE.Mesh(new THREE.TorusGeometry(.095, .022, 10, 28), rimMaterial);
      eyelet.position.set(x, CARD_HEIGHT / 2 - .035, .03);
      card.add(eyelet);

      const rivet = new THREE.Mesh(
        new THREE.SphereGeometry(.035, 16, 12),
        new THREE.MeshStandardMaterial({ color: 0xe0d2b6, metalness: .95, roughness: .16 })
      );
      rivet.position.set(x, -CARD_HEIGHT / 2 + .12, .07);
      card.add(rivet);
    }

    // A small steel swivel and spring clip attach the lanyard to the card hardware.
    const swivel = new THREE.Mesh(
      new THREE.TorusGeometry(.095, .025, 10, 22),
      new THREE.MeshStandardMaterial({ color: 0xaeb5b5, metalness: .98, roughness: .17 })
    );
    swivel.position.set(0, CARD_HEIGHT / 2 + .19, .025);
    card.add(swivel);

    const strapLeft = createRibbon(scene, -.2, 1.59, new THREE.Vector3(-.43, .46, .02));
    const strapRight = createRibbon(scene, .2, 1.59, new THREE.Vector3(.43, .46, .02));

    const physics = { x: 0, z: 0, vx: 0, vz: 0, flip: 0, flipTarget: 0, pointerX: 0, pointerY: 0, pointerActive: false };
    const onPointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      physics.pointerX = THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width - .5) * 2, -1, 1);
      physics.pointerY = THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height - .5) * 2, -1, 1);
      physics.pointerActive = true;
    };
    const onPointerLeave = () => {
      physics.pointerActive = false;
    };
    const onPointerDown = (event) => {
      const direction = physics.pointerX < 0 ? -1 : 1;
      physics.vz += direction * .8;
      physics.vx += (physics.pointerY || 0) * .65;
    };
    const onClick = () => {
      physics.flipTarget = physics.flipTarget > Math.PI / 2 ? 0 : Math.PI;
    };
    const onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('keydown', onKeyDown);

    const updateSize = () => {
      if (disposed) return;
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(mount);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastTime = 0;
    const animate = (time) => {
      if (disposed) return;
      const dt = Math.min((time - (lastTime || time)) / 1000, .032);
      lastTime = time;

      if (!reducedMotion && dt > 0) {
        // A gentle idle breeze keeps the badge visibly suspended even
        // before the visitor touches it; pointer input adds a stronger impulse.
        const targetX = physics.pointerActive
          ? physics.pointerY * -.13
          : Math.sin(time * .00072) * .035;
        const targetZ = physics.pointerActive
          ? physics.pointerX * .2
          : Math.sin(time * .00054) * .06;

        // Damped pendulum dynamics: gravity pulls the tag down, spring tension
        // restores its rest position, and pointer impulses add natural swing.
        physics.vx += (-5.1 * Math.sin(physics.x) - 1.65 * physics.vx + (targetX - physics.x) * 3.6) * dt;
        physics.vz += (-4.1 * Math.sin(physics.z) - 1.35 * physics.vz + (targetZ - physics.z) * 3.4) * dt;
        physics.x += physics.vx * dt;
        physics.z += physics.vz * dt;
        physics.x = THREE.MathUtils.clamp(physics.x, -.42, .42);
        physics.z = THREE.MathUtils.clamp(physics.z, -.55, .55);

        physics.flip += (physics.flipTarget - physics.flip) * Math.min(1, dt * 7);
        badgePivot.rotation.x = physics.x;
        badgePivot.rotation.z = physics.z;
        card.rotation.y = physics.flip;
      } else {
        physics.flip = physics.flipTarget;
        card.rotation.y = physics.flip;
      }

      const leftEnd = badgePivot.localToWorld(new THREE.Vector3(-.43, -.20, .03));
      const rightEnd = badgePivot.localToWorld(new THREE.Vector3(.43, -.20, .03));
      updateRibbon(strapLeft, leftEnd, dt);
      updateRibbon(strapRight, rightEnd, dt);

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };
    animationId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationId);
      resizeObserver?.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('keydown', onKeyDown);

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, []);

  return (
    <div className="header-id3d-stage" ref={mountRef}>
      <span className="header-id3d-hint" aria-hidden="true">MOVE TO SWING · TAP TO FLIP</span>
      <span className="sr-only">Interactive three-dimensional hanging creator ID badge.</span>
    </div>
  );
}
