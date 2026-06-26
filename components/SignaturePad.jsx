"use client";

import { useEffect, useRef, useState } from "react";
import { PenTool, Type, Upload, Eraser } from "lucide-react";

/**
 * SignaturePad — capture a real e-signature.
 *
 * Modes:
 *  - draw: free-hand on an HTML5 canvas (mouse + touch)
 *  - type: typed name rendered in a cursive font, rasterized to canvas
 *  - upload: user uploads a PNG/JPG of their signature
 *
 * Always emits a PNG data URL via `onChange(dataUrl, method)` whenever the
 * signature changes. Parent decides when to submit.
 */
export default function SignaturePad({ defaultName = "", onChange }) {
  const [mode, setMode] = useState("draw");
  const [typed, setTyped] = useState(defaultName);
  const [hasDrawing, setHasDrawing] = useState(false);
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPtRef = useRef(null);

  // --- helpers ----------------------------------------------------------
  const emit = (dataUrl, method) => {
    if (onChange) onChange(dataUrl, method);
  };

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    setHasDrawing(false);
    if (mode === "draw") emit(null, "draw");
  };

  const resizeCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = Math.floor(rect.width * ratio);
    c.height = Math.floor(rect.height * ratio);
    const ctx = c.getContext("2d");
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0f172a";
  };

  // Re-init draw canvas when entering Draw mode
  useEffect(() => {
    if (mode !== "draw") return;
    resizeCanvas();
    setHasDrawing(false);
    emit(null, "draw");
    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // --- draw handlers ----------------------------------------------------
  const ptFromEvent = (e) => {
    const c = canvasRef.current;
    const rect = c.getBoundingClientRect();
    const touch = e.touches && e.touches[0];
    const x = (touch ? touch.clientX : e.clientX) - rect.left;
    const y = (touch ? touch.clientY : e.clientY) - rect.top;
    return { x, y };
  };

  const startDraw = (e) => {
    e.preventDefault();
    drawingRef.current = true;
    lastPtRef.current = ptFromEvent(e);
  };

  const moveDraw = (e) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const pt = ptFromEvent(e);
    ctx.beginPath();
    ctx.moveTo(lastPtRef.current.x, lastPtRef.current.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    lastPtRef.current = pt;
    setHasDrawing(true);
  };

  const endDraw = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const c = canvasRef.current;
    if (!c) return;
    // Composite onto white background so PDF / preview reads clean
    const out = document.createElement("canvas");
    out.width = c.width;
    out.height = c.height;
    const octx = out.getContext("2d");
    octx.fillStyle = "#ffffff";
    octx.fillRect(0, 0, out.width, out.height);
    octx.drawImage(c, 0, 0);
    emit(out.toDataURL("image/png"), "draw");
  };

  // --- typed rasterizer -------------------------------------------------
  useEffect(() => {
    if (mode !== "type") return;
    const text = (typed || "").trim();
    if (!text) {
      emit(null, "type");
      return;
    }
    const w = 600;
    const h = 160;
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#0f172a";
    ctx.font =
      "italic 72px 'Brush Script MT', 'Lucida Handwriting', cursive";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, w / 2, h / 2);
    emit(cv.toDataURL("image/png"), "type");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, mode]);

  // --- upload handler ---------------------------------------------------
  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Re-render at sensible size on white background
        const maxW = 600;
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const cv = document.createElement("canvas");
        cv.width = w;
        cv.height = h;
        const ctx = cv.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        emit(cv.toDataURL("image/png"), "upload");
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  // --- UI ---------------------------------------------------------------
  const Tab = ({ id, icon: Icon, label }) => (
    <button
      data-testid={`signature-mode-${id}`}
      type="button"
      onClick={() => setMode(id)}
      className={`px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1.5 border transition ${
        mode === id
          ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-100"
          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );

  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-4">
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Tab id="draw" icon={PenTool} label="Draw" />
          <Tab id="type" icon={Type} label="Type" />
          <Tab id="upload" icon={Upload} label="Upload" />
        </div>
        {mode === "draw" && (
          <button
            type="button"
            onClick={clearCanvas}
            className="text-xs text-slate-300 hover:text-rose-300 inline-flex items-center gap-1"
          >
            <Eraser className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {mode === "draw" && (
        <div>
          <div className="bg-white rounded-md border border-white/10 relative overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-44 touch-none cursor-crosshair block"
              onMouseDown={startDraw}
              onMouseMove={moveDraw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={moveDraw}
              onTouchEnd={endDraw}
            />
            {!hasDrawing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-sm">
                Draw your signature here
              </div>
            )}
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Use your mouse, trackpad, or finger to sign. Click <em>Clear</em> to
            start over.
          </p>
        </div>
      )}

      {mode === "type" && (
        <div>
          <input
            data-testid="signature-typed-name"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Type your full legal name"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
          />
          <div className="mt-3 bg-white rounded-md border border-white/10 h-28 flex items-center justify-center px-4">
            <span
              className="text-4xl text-slate-900"
              style={{
                fontFamily:
                  "'Brush Script MT', 'Lucida Handwriting', cursive",
                fontStyle: "italic",
              }}
            >
              {typed || "Your signature"}
            </span>
          </div>
        </div>
      )}

      {mode === "upload" && (
        <div>
          <label className="block">
            <span className="text-xs text-slate-400">
              Upload a PNG or JPG of your signature
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={onFile}
              className="mt-2 block w-full text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-100 file:cursor-pointer"
            />
          </label>
          <p className="mt-2 text-[11px] text-slate-400">
            Best results: white background, transparent or solid, max ~600px
            wide.
          </p>
        </div>
      )}
    </div>
  );
}
