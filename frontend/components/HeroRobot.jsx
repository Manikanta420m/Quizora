"use client";

import React, { useRef, useState, useEffect } from "react";
import { Zap } from "lucide-react";

export default function HeroRobot() {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Smoothly damp the rotation values for ultra-realistic physics feel
  const [currentRot, setCurrentRot] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;
    
    const render = () => {
      setCurrentRot(prev => {
        // Easing factor (lower = smoother/slower, higher = snappier)
        const ease = 0.15;
        const dx = rotation.x - prev.x;
        const dy = rotation.y - prev.y;
        
        // Stop animating if difference is tiny
        if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
            return { x: rotation.x, y: rotation.y };
        }
        
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease
        };
      });
      animationFrameId = requestAnimationFrame(requestAnimationFrame ? render : () => {});
    };
    
    render();
    
    return () => {
      if(animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [rotation]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Increased max rotation to 18 degrees for dramatic effect
    const rotateX = ((y - centerY) / centerY) * -18; 
    const rotateY = ((x - centerX) / centerX) * 18;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-[420px] perspective-1000 mt-8 lg:mt-0 lg:ml-auto">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full transform-style-3d cursor-crosshair"
        style={{
          transform: isHovered
            ? `rotateX(${currentRot.x}deg) rotateY(${currentRot.y}deg) scale(1.03)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transition: isHovered ? "none" : "transform 1000ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Ambient Glow */}
        <div 
          className="absolute -inset-6 bg-gradient-to-tr from-[#2563EB]/40 via-[#38BDF8]/30 to-[#2563EB]/20 rounded-[3rem] blur-3xl -z-10 pointer-events-none" 
          style={{
             opacity: isHovered ? 1 : 0.6,
             transform: isHovered ? "translateZ(-80px)" : "translateZ(0px)",
             transition: "all 700ms ease-out"
          }}
        />

        {/* Premium Glassmorphic Card Container (The Slab) */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-white/95 to-white/70 backdrop-blur-3xl border-2 border-white/90 border-b-white/40 border-r-white/40 p-6 sm:p-8 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.4),inset_0_2px_15px_rgba(255,255,255,1)] overflow-hidden">
          
          {/* Realistic Dynamic Glare Overlay */}
          <div 
             className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/70 to-transparent pointer-events-none z-50 mix-blend-overlay"
             style={{
                opacity: isHovered ? 0.8 : 0,
                transform: isHovered 
                    ? `translateX(${currentRot.y * 15}px) translateY(${currentRot.x * 15}px) scale(1.5)` 
                    : "translateX(-150%) scale(1.5)",
             }}
          />

          {/* Robot Artwork */}
          <div 
            className="relative flex items-center justify-center p-2 mt-4"
            style={{
               transform: isHovered ? "translateZ(120px) translateY(-20px)" : "translateZ(0px)",
               transition: "transform 800ms cubic-bezier(0.23, 1, 0.32, 1)"
            }}
          >
            {/* Orb behind robot */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-[#38BDF8]/30 to-[#2563EB]/10 rounded-full blur-2xl" 
              style={{
                 transform: isHovered ? "scale(1.2)" : "scale(0.75)",
                 transition: "transform 800ms ease-out"
              }}
            />
            
            <img
              src="/images/quizora-robot.png"
              alt="Quizora AI Robot"
              className="w-full h-auto max-h-[340px] object-contain mix-blend-multiply drop-shadow-[0_35px_45px_rgba(15,23,42,0.5)] relative z-20 pointer-events-none"
            />
          </div>

          {/* Bottom Status Bar */}
          <div 
            className="mt-6 pt-5 flex items-center justify-between gap-2 border-t border-[#E2E8F0] relative z-30"
            style={{
               transform: isHovered ? "translateZ(60px)" : "translateZ(0px)",
               transition: "transform 800ms cubic-bezier(0.23, 1, 0.32, 1)"
            }}
          >
            <div className="flex items-center gap-2.5 text-xs font-extrabold text-[#0F172A] bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,1)] border border-slate-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="tracking-tight">AI Engine Online</span>
            </div>
            <div className="text-[10px] font-black tracking-widest text-white bg-gradient-to-b from-slate-800 to-slate-900 px-4 py-2 rounded-xl border border-slate-700 uppercase shadow-[0_12px_25px_rgba(15,23,42,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
              Quizora
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
