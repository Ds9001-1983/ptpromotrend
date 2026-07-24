"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { isLowEndDevice, prefersReducedMotion } from "@/lib/device";

/**
 * WebGL-Pflicht-Element (Signature-Move SM-09), bewusst als schlanker
 * Raw-WebGL-Fullscreen-Shader statt Three.js-Stack (~4 KB statt ~500 KB):
 * heller Gradient-Mesh — träge treibende Grün/Gelb-Farbwolken auf Off-White,
 * mouse-reaktiv, mit feinem Grain gegen Banding.
 * Fallback (Low-End/reduced-motion/Context-Loss): statischer CSS-Gradient.
 */

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec2 mod289(vec2 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.04;
  vec2 m = uMouse;
  m.x *= uRes.x / uRes.y;
  float mouseInfluence = exp(-2.4 * distance(p, m));

  float n1 = snoise(p * 0.9 + vec2(t, -t * 0.6));
  float n2 = snoise(p * 1.4 - vec2(t * 0.8, t * 0.4) + 3.7);

  vec3 base = vec3(0.980, 0.980, 0.968);            /* #FAFAF7 */
  vec3 green = vec3(0.0, 0.424, 0.329);              /* #006C54 */
  vec3 yellow = vec3(0.984, 0.729, 0.0);             /* #FBBA00 */

  float gAmt = smoothstep(0.25, 0.95, n1) * 0.075 + mouseInfluence * 0.05;
  float yAmt = smoothstep(0.45, 1.0, n2) * 0.05;

  vec3 col = base;
  col = mix(col, green, gAmt);
  col = mix(col, yellow, yAmt);

  /* Grain gegen Banding auf hellen Verläufen */
  float grain = (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.012;
  col += grain;

  fragColor = vec4(col, 1.0);
}`;

const VERT = `#version 300 es
in vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

export function ShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (prefersReducedMotion() || isLowEndDevice()) return; // CSS-Fallback bleibt

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    let raf = 0;
    let visible = true;
    let mx = 0.5;
    let my = 0.5;
    let smx = 0.5;
    let smy = 0.5;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const start = performance.now();
    const frame = () => {
      if (visible && !document.hidden) {
        smx += (mx - smx) * 0.04;
        smy += (my - smy) * 0.04;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, (performance.now() - start) / 1000);
        gl.uniform2f(uMouse, smx, 1 - smy);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      canvas.style.display = "none"; // CSS-Fallback übernimmt
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {/* CSS-Fallback: liegt unter dem Canvas, übernimmt wenn WebGL fehlt */}
      <div
        ref={fallbackRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 44% at 78% 22%, rgba(0,108,84,0.07), transparent 70%), radial-gradient(40% 36% at 18% 78%, rgba(251,186,0,0.05), transparent 70%), #fafaf7",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
