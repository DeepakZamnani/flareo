// // 'use client';

// // import { useRef, Suspense } from 'react';
// // import { Canvas, useFrame } from '@react-three/fiber';
// // import { OrbitControls, Environment, PerspectiveCamera, useGLTF } from '@react-three/drei';
// // import * as THREE from 'three';

// // function FurnitureModel({ modelPath }: { modelPath: string }) {
// //   const meshRef = useRef<THREE.Group>(null);
// //   const { scene } = useGLTF(modelPath);
// //   useFrame((state) => {
// //     if (meshRef.current) {
// //       meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
// //     }
// //   });
// //   return <primitive ref={meshRef} object={scene} scale={1.5} position={[0, -1, 0]} />;
// // }

// // function LoadingBox() {
// //   const meshRef = useRef<THREE.Mesh>(null);
// //   useFrame((state) => {
// //     if (meshRef.current) meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
// //   });
// //   return (
// //     <mesh ref={meshRef}>
// //       <boxGeometry args={[1, 1, 1]} />
// //       <meshStandardMaterial color="#D97706" metalness={0.7} roughness={0.3} />
// //     </mesh>
// //   );
// // }

// // export default function ThreeDViewer() {
// //   return (
// //     <>
// //       <style jsx>{`
// //         /* ─── SECTION ─────────────────────────────────────────── */
// //         .section {
// //           position: relative;
// //           width: 100%;
// //           min-height: 100vh;
// //           background: #111112;
// //           display: flex;
// //           flex-direction: column;
// //           overflow: hidden;
// //         }

// //         /* ─── TOP BAR ─────────────────────────────────────────── */
// //         .topbar {
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           padding: 32px 56px;
// //           border-bottom: 1px solid rgba(245, 245, 245, 0.08);
// //         }
// //         .topbar-label {
// //           font-size: 11px;
// //           font-weight: 500;
// //           letter-spacing: 0.18em;
// //           text-transform: uppercase;
// //           color: rgba(245, 245, 245, 0.4);
// //         }
// //         .topbar-center {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //         }
// //         .live-dot {
// //           width: 6px;
// //           height: 6px;
// //           border-radius: 50%;
// //           background: #D97706;
// //           animation: blink 2s ease-in-out infinite;
// //         }
// //         @keyframes blink {
// //           0%, 100% { opacity: 1; }
// //           50% { opacity: 0.3; }
// //         }
// //         .live-text {
// //           font-size: 11px;
// //           font-weight: 600;
// //           letter-spacing: 0.18em;
// //           text-transform: uppercase;
// //           color: #D97706;
// //         }

// //         /* ─── MAIN BODY ───────────────────────────────────────── */
// //         .body {
// //           flex: 1;
// //           display: grid;
// //           grid-template-columns: 280px 1fr 280px;
// //           min-height: calc(100vh - 80px);
// //         }

// //         /* ─── LEFT PANEL ──────────────────────────────────────── */
// //         .panel-left {
// //           display: flex;
// //           flex-direction: column;
// //           justify-content: space-between;
// //           padding: 56px 40px;
// //           border-right: 1px solid rgba(245, 245, 245, 0.08);
// //         }
// //         .product-category {
// //           font-size: 11px;
// //           font-weight: 500;
// //           letter-spacing: 0.18em;
// //           text-transform: uppercase;
// //           color: rgba(245, 245, 245, 0.35);
// //           margin-bottom: 16px;
// //         }
// //         .product-name {
// //           font-size: 28px;
// //           font-weight: 300;
// //           line-height: 1.2;
// //           color: #F5F5F5;
// //           margin: 0 0 40px 0;
// //           letter-spacing: -0.01em;
// //         }
// //         .spec-list {
// //           list-style: none;
// //           margin: 0;
// //           padding: 0;
// //         }
// //         .spec-item {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 4px;
// //           padding: 20px 0;
// //           border-top: 1px solid rgba(245, 245, 245, 0.08);
// //         }
// //         .spec-item:last-child {
// //           border-bottom: 1px solid rgba(245, 245, 245, 0.08);
// //         }
// //         .spec-key {
// //           font-size: 10px;
// //           font-weight: 600;
// //           letter-spacing: 0.15em;
// //           text-transform: uppercase;
// //           color: rgba(245, 245, 245, 0.3);
// //         }
// //         .spec-val {
// //           font-size: 14px;
// //           font-weight: 400;
// //           color: #F5F5F5;
// //           letter-spacing: 0.01em;
// //         }
// //         .controls-hint {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 12px;
// //         }
// //         .hint-item {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //         }
// //         .hint-icon {
// //           width: 28px;
// //           height: 28px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           border: 1px solid rgba(245, 245, 245, 0.12);
// //           border-radius: 6px;
// //         }
// //         .hint-text {
// //           font-size: 12px;
// //           color: rgba(245, 245, 245, 0.4);
// //           letter-spacing: 0.03em;
// //         }

// //         /* ─── CENTER (3D) ─────────────────────────────────────── */
// //         .canvas-wrap {
// //           position: relative;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           background: #111112;
// //         }
// //         .canvas-inner {
// //           width: 100%;
// //           height: 100%;
// //           position: relative;
// //         }
// //         /* Subtle amber floor glow */
// //         .canvas-inner::after {
// //           content: '';
// //           position: absolute;
// //           bottom: 0;
// //           left: 10%;
// //           right: 10%;
// //           height: 200px;
// //           background: radial-gradient(ellipse, rgba(217, 119, 6, 0.12), transparent 70%);
// //           pointer-events: none;
// //         }

// //         /* ─── RIGHT PANEL ─────────────────────────────────────── */
// //         .panel-right {
// //           display: flex;
// //           flex-direction: column;
// //           justify-content: space-between;
// //           padding: 56px 40px;
// //           border-left: 1px solid rgba(245, 245, 245, 0.08);
// //         }
// //         .section-number {
// //           font-size: 11px;
// //           font-weight: 500;
// //           letter-spacing: 0.18em;
// //           color: rgba(245, 245, 245, 0.25);
// //         }
// //         .feature-list {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 32px;
// //         }
// //         .feature-item {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 8px;
// //           padding-bottom: 32px;
// //           border-bottom: 1px solid rgba(245, 245, 245, 0.08);
// //         }
// //         .feature-item:last-child {
// //           border-bottom: none;
// //           padding-bottom: 0;
// //         }
// //         .feature-num {
// //           font-size: 10px;
// //           font-weight: 600;
// //           letter-spacing: 0.15em;
// //           text-transform: uppercase;
// //           color: #D97706;
// //         }
// //         .feature-title {
// //           font-size: 15px;
// //           font-weight: 400;
// //           color: #F5F5F5;
// //           margin: 0;
// //           letter-spacing: 0.01em;
// //         }
// //         .feature-desc {
// //           font-size: 12px;
// //           line-height: 1.6;
// //           color: rgba(245, 245, 245, 0.4);
// //           margin: 0;
// //         }

// //         /* ─── AR BUTTON ───────────────────────────────────────── */
// //         .ar-btn {
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           width: 100%;
// //           padding: 20px 24px;
// //           background: #D97706;
// //           border: none;
// //           border-radius: 4px;
// //           cursor: pointer;
// //           transition: background 0.25s, transform 0.2s;
// //         }
// //         .ar-btn:hover {
// //           background: #B45309;
// //           transform: translateY(-1px);
// //         }
// //         .ar-btn:active {
// //           transform: translateY(0);
// //         }
// //         .ar-btn-text {
// //           font-size: 13px;
// //           font-weight: 600;
// //           letter-spacing: 0.1em;
// //           text-transform: uppercase;
// //           color: #ffffff;
// //         }
// //         .ar-btn-icon {
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           width: 32px;
// //           height: 32px;
// //           background: rgba(255, 255, 255, 0.15);
// //           border-radius: 50%;
// //         }

// //         /* ─── BOTTOM BAR ──────────────────────────────────────── */
// //         .bottombar {
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           padding: 20px 56px;
// //           border-top: 1px solid rgba(245, 245, 245, 0.08);
// //         }
// //         .bottombar-text {
// //           font-size: 11px;
// //           letter-spacing: 0.08em;
// //           color: rgba(245, 245, 245, 0.25);
// //         }
// //         .bottombar-badge {
// //           display: flex;
// //           align-items: center;
// //           gap: 6px;
// //           padding: 6px 14px;
// //           border: 1px solid rgba(217, 119, 6, 0.3);
// //           border-radius: 999px;
// //         }
// //         .bottombar-badge-text {
// //           font-size: 10px;
// //           font-weight: 600;
// //           letter-spacing: 0.12em;
// //           text-transform: uppercase;
// //           color: #D97706;
// //         }
// //       `}</style>

// //       <section className="section">

// //         {/* TOP BAR */}
// //         <div className="topbar">
// //           <span className="topbar-label">flAReo — 3D Viewer</span>
// //           <div className="topbar-center">
// //             <div className="live-dot" />
// //             <span className="live-text">Live Preview</span>
// //           </div>
// //           <span className="topbar-label">Drag to explore</span>
// //         </div>

// //         {/* MAIN BODY */}
// //         <div className="body">

// //           {/* LEFT */}
// //           <div className="panel-left">
// //             <div>
// //               <p className="product-category">Seating Collection</p>
// //               <h2 className="product-name">Modern<br />Lounge Chair</h2>
// //               <ul className="spec-list">
// //                 <li className="spec-item">
// //                   <span className="spec-key">Material</span>
// //                   <span className="spec-val">Premium Full-Grain Leather</span>
// //                 </li>
// //                 <li className="spec-item">
// //                   <span className="spec-key">Frame</span>
// //                   <span className="spec-val">Solid White Oak</span>
// //                 </li>
// //                 <li className="spec-item">
// //                   <span className="spec-key">Dimensions</span>
// //                   <span className="spec-val">85W × 80D × 75H cm</span>
// //                 </li>
// //                 <li className="spec-item">
// //                   <span className="spec-key">Weight</span>
// //                   <span className="spec-val">18 kg</span>
// //                 </li>
// //               </ul>
// //             </div>

// //             <div className="controls-hint">
// //               <div className="hint-item">
// //                 <div className="hint-icon">
// //                   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="rgba(245,245,245,0.5)" strokeWidth={2}>
// //                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
// //                   </svg>
// //                 </div>
// //                 <span className="hint-text">Drag to rotate</span>
// //               </div>
// //               <div className="hint-item">
// //                 <div className="hint-icon">
// //                   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="rgba(245,245,245,0.5)" strokeWidth={2}>
// //                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
// //                   </svg>
// //                 </div>
// //                 <span className="hint-text">Scroll to zoom</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* CENTER — 3D CANVAS */}
// //           <div className="canvas-wrap">
// //             <div className="canvas-inner">
// //               <Canvas>
// //                 <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={38} />
// //                 <ambientLight intensity={0.5} />
// //                 <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
// //                 <directionalLight position={[-4, 3, -4]} intensity={0.4} color="#FFF8F0" />
// //                 <pointLight position={[0, 3, 0]} intensity={0.3} color="#D97706" />
// //                 <Suspense fallback={<LoadingBox />}>
// //                   <FurnitureModel modelPath="/models/chair2.glb" />
// //                 </Suspense>
// //                 <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
// //                   <planeGeometry args={[20, 20]} />
// //                   <shadowMaterial opacity={0.4} />
// //                 </mesh>
// //                 <Environment preset="city" />
// //                 <OrbitControls
// //                   enablePan={false}
// //                   enableZoom={true}
// //                   minDistance={2.5}
// //                   maxDistance={6}
// //                   minPolarAngle={Math.PI / 6}
// //                   maxPolarAngle={Math.PI / 2.2}
// //                   enableDamping
// //                   dampingFactor={0.05}
// //                 />
// //               </Canvas>
// //             </div>
// //           </div>

// //           {/* RIGHT */}
// //           <div className="panel-right">
// //             <span className="section-number">03 / 06</span>

// //             <div className="feature-list">
// //               <div className="feature-item">
// //                 <span className="feature-num">01</span>
// //                 <h4 className="feature-title">360° Inspection</h4>
// //                 <p className="feature-desc">Examine every angle, every seam, every detail before purchase.</p>
// //               </div>
// //               <div className="feature-item">
// //                 <span className="feature-num">02</span>
// //                 <h4 className="feature-title">True Scale AR</h4>
// //                 <p className="feature-desc">See this chair at actual size inside your own room instantly.</p>
// //               </div>
// //               <div className="feature-item">
// //                 <span className="feature-num">03</span>
// //                 <h4 className="feature-title">Instant Deploy</h4>
// //                 <p className="feature-desc">Live in your catalog in under 24 hours. No technical setup.</p>
// //               </div>
// //             </div>

// //             <button className="ar-btn" onClick={() => console.log('AR view')}>
// //               <span className="ar-btn-text">View in Your Space</span>
// //               <div className="ar-btn-icon">
// //                 <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2.5}>
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
// //                 </svg>
// //               </div>
// //             </button>
// //           </div>

// //         </div>

// //         {/* BOTTOM BAR */}
// //         <div className="bottombar">
// //           <span className="bottombar-text">Augmented Reality · Powered by flAReo</span>
// //           <div className="bottombar-badge">
// //             <div className="live-dot" />
// //             <span className="bottombar-badge-text">AR Ready</span>
// //           </div>
// //           <span className="bottombar-text">Image to 3D in 2 minutes</span>
// //         </div>

// //       </section>
// //     </>
// //   );
// // }


// 'use client';

// import { useRef, Suspense } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Environment, PerspectiveCamera, useGLTF } from '@react-three/drei';
// import * as THREE from 'three';

// function FurnitureModel({ modelPath }: { modelPath: string }) {
//   const meshRef = useRef<THREE.Group>(null);
//   const { scene } = useGLTF(modelPath);
//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
//     }
//   });
//   return <primitive ref={meshRef} object={scene} scale={2} position={[0, -1.5, 0]} />;
// }

// function LoadingMesh() {
//   const meshRef = useRef<THREE.Mesh>(null);
//   useFrame((state) => {
//     if (meshRef.current) meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
//   });
//   return (
//     <mesh ref={meshRef}>
//       <torusGeometry args={[1, 0.3, 16, 60]} />
//       <meshStandardMaterial color="#2c2c2c" metalness={0.9} roughness={0.1} />
//     </mesh>
//   );
// }

// export default function ThreeDViewer() {
//   return (
//     <>
//       <style jsx>{`
//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         .section {
//           width: 100%;
//           min-height: 100vh;
//           background: #ffffff;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0;
//           position: relative;
//           overflow: hidden;
//         }

//         /* Frosted background effect */
//         .section::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: radial-gradient(circle at 30% 40%, rgba(0,0,0,0.01) 0%, transparent 50%);
//           pointer-events: none;
//         }

//         .content-card {
//           position: relative;
//           width: 100%;
//           max-width: 100%;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%);
//           border-radius: 0;
//           overflow: hidden;
//           box-shadow: none;
//         }

//         .inner-content {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           min-height: 100vh;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           align-items: center;
//         }

//         /* Left side - Typography */
//         .text-side {
//           position: relative;
//           z-index: 10;
//           padding: 80px 60px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//         }

//         .eyebrow {
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.25em;
//           text-transform: uppercase;
//           color: #666;
//           margin-bottom: 32px;
//         }

//         .main-title {
//           font-size: 88px;
//           font-weight: 400;
//           line-height: 0.95;
//           letter-spacing: -0.02em;
//           color: #1a1a1a;
//           margin-bottom: 20px;
//           font-family: Georgia, 'Times New Roman', serif;
//         }

//         .subtitle {
//           font-size: 88px;
//           font-weight: 400;
//           line-height: 0.95;
//           letter-spacing: -0.02em;
//           color: #1a1a1a;
//           margin-bottom: 48px;
//           font-family: Georgia, 'Times New Roman', serif;
//         }

//         .description {
//           font-size: 15px;
//           line-height: 1.7;
//           color: #666;
//           max-width: 480px;
//           margin-bottom: 48px;
//         }

//         .cta-row {
//           display: flex;
//           align-items: center;
//           gap: 24px;
//         }

//         .ar-button {
//           padding: 18px 40px;
//           background: #1a1a1a;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: inline-flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .ar-button:hover {
//           background: #000;
//           transform: translateX(4px);
//         }

//         .ar-button-text {
//           font-size: 12px;
//           font-weight: 600;
//           letter-spacing: 0.15em;
//           text-transform: uppercase;
//           color: #fff;
//         }

//         .arrow {
//           width: 20px;
//           height: 1px;
//           background: #fff;
//           position: relative;
//         }

//         .arrow::after {
//           content: '';
//           position: absolute;
//           right: -6px;
//           top: -3px;
//           width: 8px;
//           height: 8px;
//           border-top: 1px solid #fff;
//           border-right: 1px solid #fff;
//           transform: rotate(45deg);
//         }

//         .specs-link {
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.15em;
//           text-transform: uppercase;
//           color: #999;
//           text-decoration: none;
//           border-bottom: 1px solid transparent;
//           transition: all 0.3s;
//           cursor: pointer;
//         }

//         .specs-link:hover {
//           color: #1a1a1a;
//           border-bottom-color: #1a1a1a;
//         }

//         /* Right side - 3D Model */
//         .model-side {
//           position: relative;
//           height: 100%;
//           min-height: 100vh;
//         }

//         .canvas-container {
//           position: absolute;
//           inset: 0;
//         }

//         /* Specs panel - overlay */
//         .specs-panel {
//           position: absolute;
//           bottom: 60px;
//           right: 60px;
//           z-index: 20;
//           background: rgba(255,255,255,0.95);
//           backdrop-filter: blur(20px);
//           padding: 32px 40px;
//           min-width: 280px;
//           border: 1px solid rgba(0,0,0,0.06);
//         }

//         .specs-title {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: #999;
//           margin-bottom: 24px;
//         }

//         .spec-item {
//           display: flex;
//           justify-content: space-between;
//           padding: 12px 0;
//           border-bottom: 1px solid rgba(0,0,0,0.06);
//         }

//         .spec-item:last-child {
//           border-bottom: none;
//         }

//         .spec-label {
//           font-size: 13px;
//           color: #666;
//         }

//         .spec-value {
//           font-size: 13px;
//           font-weight: 500;
//           color: #1a1a1a;
//         }

//         /* Controls hint */
//         .controls {
//           position: absolute;
//           bottom: 60px;
//           left: 60px;
//           z-index: 20;
//           font-size: 10px;
//           letter-spacing: 0.15em;
//           text-transform: uppercase;
//           color: rgba(26,26,26,0.3);
//         }

//         /* Number badge */
//         .number-badge {
//           position: absolute;
//           top: 60px;
//           right: 60px;
//           z-index: 20;
//           font-size: 48px;
//           font-weight: 300;
//           color: rgba(26,26,26,0.1);
//           font-family: Georgia, serif;
//         }

//         @media (max-width: 1024px) {
//           .inner-content {
//             grid-template-columns: 1fr;
//           }
//           .text-side {
//             padding: 60px 40px;
//           }
//           .model-side {
//             min-height: 600px;
//           }
//           .main-title, .subtitle {
//             font-size: 56px;
//           }
//           .specs-panel {
//             position: static;
//             margin: 40px 40px 0;
//           }
//         }
//       `}</style>

//       <section className="section">
//         <div className="content-card">
//           <div className="inner-content">
            
//             {/* Left - Typography */}
//             <div className="text-side">
//               <p className="eyebrow">Interactive 3D Experience</p>
//               <h1 className="main-title">Modern</h1>
//               <h2 className="subtitle">Lounge Chair</h2>
//               <p className="description">
//                 From pixels to presence — our AI transforms product photos into photorealistic 3D models. 
//                 Experience furniture in your space before you buy, with true-to-life scale and detail.
//               </p>
//               <div className="cta-row">
//                 <button className="ar-button" onClick={() => console.log('AR')}>
//                   <span className="ar-button-text">View in AR</span>
//                   <div className="arrow" />
//                 </button>
//                 <span className="specs-link">Specifications</span>
//               </div>
//             </div>

//             {/* Right - 3D Model */}
//             <div className="model-side">
//               <div className="number-badge">01</div>
              
//               <div className="canvas-container">
//                 <Canvas>
//                   <PerspectiveCamera makeDefault position={[2, 0.5, 4]} fov={35} />
//                   <ambientLight intensity={0.6} />
//                   <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
//                   <directionalLight position={[-3, 3, -3]} intensity={0.4} />
//                   <spotLight position={[0, 10, 0]} angle={0.3} intensity={0.5} />
                  
//                   <Suspense fallback={<LoadingMesh />}>
//                     <FurnitureModel modelPath="/models/chair2.glb" />
//                   </Suspense>

//                   <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
//                     <planeGeometry args={[50, 50]} />
//                     <shadowMaterial opacity={0.15} />
//                   </mesh>

//                   <Environment preset="apartment" />
                  
//                   <OrbitControls
//                     enablePan={false}
//                     enableZoom={true}
//                     minDistance={3}
//                     maxDistance={8}
//                     minPolarAngle={Math.PI / 6}
//                     maxPolarAngle={Math.PI / 2}
//                     enableDamping
//                     dampingFactor={0.05}
//                   />
//                 </Canvas>
//               </div>

//               <div className="controls">Drag • Zoom • Rotate</div>

//               <div className="specs-panel">
//                 <div className="specs-title">Specifications</div>
//                 <div className="spec-item">
//                   <span className="spec-label">Material</span>
//                   <span className="spec-value">Premium Leather</span>
//                 </div>
//                 <div className="spec-item">
//                   <span className="spec-label">Frame</span>
//                   <span className="spec-value">Solid Oak</span>
//                 </div>
//                 <div className="spec-item">
//                   <span className="spec-label">Dimensions</span>
//                   <span className="spec-value">85 × 80 × 75 cm</span>
//                 </div>
//                 <div className="spec-item">
//                   <span className="spec-label">Weight</span>
//                   <span className="spec-value">18 kg</span>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function FurnitureModel({ modelPath }: { modelPath: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });
  return <primitive ref={meshRef} object={scene} scale={2} position={[0, -1.5, 0]} />;
}

function LoadingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.2, 16, 60]} />
      <meshStandardMaterial color="#D97706" metalness={0.8} roughness={0.15} />
    </mesh>
  );
}

export default function ThreeDViewer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .tdv * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── SHELL — dark ───────────────────────────────────────────── */
        .tdv {
          width: 100%;
          min-height: 100vh;
          background: #0e0e0f;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', system-ui, sans-serif;
          color: #f5f5f5;
          overflow: hidden;
        }

        /* subtle amber depth */
        .tdv::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 55%, rgba(217,119,6,0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── TOP BAR — dark ────────────────────────────────────────── */
        .tdv-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px clamp(1.5rem, 4vw, 3rem);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .tdv-top-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .tdv-live {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tdv-live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #D97706;
          box-shadow: 0 0 8px rgba(217,119,6,0.9);
          animation: tdvBlink 2s ease-in-out infinite;
        }
        @keyframes tdvBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.2; }
        }
        .tdv-live-text {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #D97706;
        }

        /* ── BODY GRID ─────────────────────────────────────────────── */
        .tdv-body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: grid;
          grid-template-columns: 300px 1fr 260px;
          min-height: calc(100vh - 56px - 48px);
        }

        /* ── LEFT PANEL — dark ─────────────────────────────────────── */
        .tdv-left {
          border-right: 1px solid rgba(255,255,255,0.06);
          padding: clamp(2rem,5vh,3.5rem) clamp(1.5rem,2.5vw,2.5rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
        }

        .tdv-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #D97706;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.4rem;
        }
        .tdv-eyebrow::before {
          content: '';
          display: block;
          width: 20px; height: 1px;
          background: #D97706;
          flex-shrink: 0;
        }

        .tdv-h1 {
          font-size: clamp(2.8rem, 3.6vw, 4.8rem);
          font-weight: 800;
          line-height: 0.96;
          letter-spacing: -0.04em;
          color: #ffffff;
        }
        .tdv-h1-amber {
          font-size: clamp(2.8rem, 3.6vw, 4.8rem);
          font-weight: 800;
          line-height: 0.96;
          letter-spacing: -0.04em;
          color: #D97706;
          display: block;
          margin-bottom: 2rem;
        }

        .tdv-rule {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 1.8rem;
        }

        .tdv-stat-wrap {
          display: flex;
          align-items: flex-end;
          gap: 0.8rem;
          margin-bottom: 0.5rem;
        }
        .tdv-stat-num {
          font-size: clamp(3.5rem, 5vw, 6.5rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 0.88;
          color: #ffffff;
        }
        .tdv-stat-unit {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          padding-bottom: 0.7rem;
          line-height: 1.5;
        }
        .tdv-stat-sub {
          font-size: 11px;
          font-weight: 400;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.02em;
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        /* AR button — amber on dark */
        .tdv-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 17px 20px;
          background: #D97706;
          border: none;
          cursor: pointer;
          border-radius: 3px;
          transition: background 0.2s, transform 0.15s;
        }
        .tdv-btn:hover  { background: #B45309; transform: translateY(-1px); }
        .tdv-btn:active { transform: translateY(0); }
        .tdv-btn-text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
        }
        .tdv-btn-icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tdv-controls { display: flex; flex-direction: column; gap: 8px; }
        .tdv-ctrl-row { display: flex; align-items: center; gap: 10px; }
        .tdv-ctrl-key {
          width: 26px; height: 26px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tdv-ctrl-label {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.3);
        }

        /* ── CENTER CANVAS — LIGHT WINDOW punching through dark ──────── */
        .tdv-canvas-wrap {
          position: relative;
          /* warm off-white — stark contrast against dark panels */
          background: #f5f2ee;
          overflow: hidden;
        }

        /* soft inner shadow on the canvas edges — makes it feel recessed */
        .tdv-canvas-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 60px rgba(0,0,0,0.08);
          pointer-events: none;
          z-index: 3;
        }

        /* floor glow */
        .tdv-canvas-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 15%; right: 15%;
          height: 160px;
          background: radial-gradient(ellipse at 50% 100%, rgba(80,60,30,0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 2;
        }

        /* corner brackets — dark on the light canvas */
        .tdv-brk {
          position: absolute;
          width: 18px; height: 18px;
          z-index: 5;
          pointer-events: none;
        }
        .tdv-brk-tl { top: 18px; left: 18px; }
        .tdv-brk-tr { top: 18px; right: 18px; }
        .tdv-brk-bl { bottom: 18px; left: 18px; }
        .tdv-brk-br { bottom: 18px; right: 18px; }

        .tdv-brk::before, .tdv-brk::after {
          content: '';
          position: absolute;
          background: rgba(0,0,0,0.18);
        }
        .tdv-brk-tl::before { top:0; left:0; width:18px; height:1px; }
        .tdv-brk-tl::after  { top:0; left:0; width:1px; height:18px; }
        .tdv-brk-tr::before { top:0; right:0; width:18px; height:1px; }
        .tdv-brk-tr::after  { top:0; right:0; width:1px; height:18px; }
        .tdv-brk-bl::before { bottom:0; left:0; width:18px; height:1px; }
        .tdv-brk-bl::after  { bottom:0; left:0; width:1px; height:18px; }
        .tdv-brk-br::before { bottom:0; right:0; width:18px; height:1px; }
        .tdv-brk-br::after  { bottom:0; right:0; width:1px; height:18px; }

        /* AR ghost watermark on light canvas */
        .tdv-ghost-num {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          font-size: clamp(8rem, 16vw, 20rem);
          letter-spacing: -0.08em;
          color: rgba(0,0,0,0.012);
          pointer-events: none;
          user-select: none;
          z-index: 1;
          line-height: 1;
        }

        /* drag label — dark text on light canvas */
        .tdv-drag {
          position: absolute;
          bottom: 22px; left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.22);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tdv-drag::before, .tdv-drag::after {
          content: '';
          display: block;
          width: 18px; height: 1px;
          background: rgba(0,0,0,0.12);
        }

        /* ── RIGHT PANEL — dark ────────────────────────────────────── */
        .tdv-right {
          border-left: 1px solid rgba(255,255,255,0.06);
          padding: clamp(2rem,5vh,3.5rem) clamp(1.5rem,2.5vw,2.5rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .tdv-section-tag {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.2);
          align-self: flex-end;
          text-transform: uppercase;
        }

        .tdv-features {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          padding: 1.5rem 0;
        }
        .tdv-feat {
          padding: 1.6rem 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .tdv-feat:last-child {
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .tdv-feat-num {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #D97706;
          margin-bottom: 0.6rem;
        }
        .tdv-feat-title {
          font-size: clamp(0.9rem, 1.1vw, 1.05rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 0.45rem;
          line-height: 1.2;
        }
        .tdv-feat-desc {
          font-size: 11px;
          font-weight: 400;
          line-height: 1.75;
          color: rgba(255,255,255,0.38);
        }

        /* badge */
        .tdv-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          border: 1px solid rgba(217,119,6,0.25);
          border-radius: 2px;
        }
        .tdv-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #D97706;
          flex-shrink: 0;
          animation: tdvBlink 2s ease-in-out infinite;
        }
        .tdv-badge-text {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(217,119,6,0.75);
        }

        /* ── BOTTOM BAR — dark ─────────────────────────────────────── */
        .tdv-bottom {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px clamp(1.5rem, 4vw, 3rem);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .tdv-bottom-text {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
        .tdv-bottom-center {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .tdv-bottom-divider {
          width: 1px; height: 10px;
          background: rgba(255,255,255,0.08);
        }

        /* ── MOBILE ────────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .tdv-body {
            grid-template-columns: 1fr;
            grid-template-rows: auto 65vw auto;
          }
          .tdv-left {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .tdv-right {
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.06);
          }
          .tdv-canvas-wrap { min-height: 65vw; }
          .tdv-section-tag { align-self: flex-start; }
          .tdv-bottom-center { display: none; }
          .tdv-ghost-num { font-size: 30vw; }
        }
      `}</style>

      <section id="demo" className="tdv">

        {/* TOP BAR */}
        <div className="tdv-top">
          <span className="tdv-top-label">flAReo — 3D Viewer</span>
          <div className="tdv-live">
            <div className="tdv-live-dot" />
            <span className="tdv-live-text">Live Preview</span>
          </div>
          <span className="tdv-top-label">Drag to Explore</span>
        </div>

        <div className="tdv-body">

          {/* LEFT — dark */}
          <div className="tdv-left">
            <div>
              <p className="tdv-eyebrow">Augmented Reality</p>
              <h2 className="tdv-h1">Place It.</h2>
              <span className="tdv-h1-amber">Before You<br />Own It.</span>
              <div className="tdv-rule" />
              <div className="tdv-stat-wrap">
                <span className="tdv-stat-num">2</span>
                <span className="tdv-stat-unit">Min<br />to AR</span>
              </div>
              <p className="tdv-stat-sub">
                One product photo.<br />
                A live AR experience — deployed instantly.
              </p>
              <button className="tdv-btn">
                <span className="tdv-btn-text">View in Your Space</span>
                <div className="tdv-btn-icon">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 7l9-4 9 4M3 7v10l9 4m-9-14l9 4m9-4v10l-9 4m0-10V21" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="tdv-controls">
              <div className="tdv-ctrl-row">
                <div className="tdv-ctrl-key">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.4)" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                  </svg>
                </div>
                <span className="tdv-ctrl-label">Drag to rotate</span>
              </div>
              <div className="tdv-ctrl-row">
                <div className="tdv-ctrl-key">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.4)" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <span className="tdv-ctrl-label">Scroll to zoom</span>
              </div>
            </div>
          </div>

          {/* CENTER — light canvas window */}
          <div className="tdv-canvas-wrap">
            <span className="tdv-ghost-num">AR</span>

            <div className="tdv-brk tdv-brk-tl" />
            <div className="tdv-brk tdv-brk-tr" />
            <div className="tdv-brk tdv-brk-bl" />
            <div className="tdv-brk tdv-brk-br" />

            <Canvas style={{ position: 'absolute', inset: 0 }}>
              <PerspectiveCamera makeDefault position={[0, 1.2, 4.5]} fov={36} />
              <ambientLight intensity={1.4} />
              <directionalLight position={[5, 8, 5]} intensity={2.2} castShadow />
              <directionalLight position={[-4, 4, -3]} intensity={0.9} color="#fff8f0" />
              <directionalLight position={[0, -2, 4]} intensity={0.4} />

              <Suspense fallback={<LoadingMesh />}>
                <FurnitureModel modelPath="/models/chair2.glb" />
              </Suspense>

              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.07} />
              </mesh>

              <Environment preset="apartment" />

              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={2.5}
                maxDistance={7}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.1}
                enableDamping
                dampingFactor={0.05}
              />
            </Canvas>

            <div className="tdv-drag">Drag · Zoom · Rotate</div>
          </div>

          {/* RIGHT — dark */}
          <div className="tdv-right">
            <span className="tdv-section-tag">03 / 06</span>

            <div className="tdv-features">
              <div className="tdv-feat">
                <p className="tdv-feat-num">01</p>
                <h4 className="tdv-feat-title">Photo to 3D</h4>
                <p className="tdv-feat-desc">
                  Upload any product photo. Our pipeline generates a photorealistic 3D model — AR-ready in minutes, not months.
                </p>
              </div>
              <div className="tdv-feat">
                <p className="tdv-feat-num">02</p>
                <h4 className="tdv-feat-title">True-Scale Placement</h4>
                <p className="tdv-feat-desc">
                  Customers see your furniture at exact real-world scale inside their own room. No guessing. No returns.
                </p>
              </div>
              <div className="tdv-feat">
                <p className="tdv-feat-num">03</p>
                <h4 className="tdv-feat-title">Zero Setup. Instant Live.</h4>
                <p className="tdv-feat-desc">
                  One link. Works on iOS and Android with no app required. Drop it in your catalog and you're done.
                </p>
              </div>
            </div>

            <div className="tdv-badge">
              <div className="tdv-badge-dot" />
              <span className="tdv-badge-text">±2 cm accuracy · iOS & Android</span>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="tdv-bottom">
          <span className="tdv-bottom-text">Augmented Reality · Powered by flAReo</span>
          <div className="tdv-bottom-center">
            <span className="tdv-bottom-text">Image to 3D in 2 minutes</span>
            <div className="tdv-bottom-divider" />
            <span className="tdv-bottom-text">No technical setup</span>
            <div className="tdv-bottom-divider" />
            <span className="tdv-bottom-text">Works on any device</span>
          </div>
          <span className="tdv-bottom-text">flAReo.com</span>
        </div>

      </section>
    </>
  );
}