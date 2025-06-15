import React, { useEffect, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';
import gsap from 'gsap';

const LoadingScreen: React.FC = () => {
  const { isLoading, setIsLoading } = useLoading();
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgLeftRef = useRef<HTMLDivElement>(null);
  const bgRightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) return;

    const tl = gsap.timeline();

    // Initial setup - curtains start transparent, backgrounds visible
    tl.set([curtainLeftRef.current, curtainRightRef.current], { 
      scaleX: 0,
      transformOrigin: 'left center'
    })
      .set(curtainRightRef.current, { 
        transformOrigin: 'right center'
      })
      .set([bgLeftRef.current, bgRightRef.current], { 
        opacity: 1,
        x: 0
      })
      .set(textRef.current, { opacity: 0 })
      
      // Fade in text
      .to(textRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.2)

    const timer = setTimeout(() => {
      const openCurtain = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsLoading(false), 100);
        }
      });

      openCurtain
        // Fade out text first
        .to(textRef.current, { 
          opacity: 0, 
          duration: 0.6, 
          ease: 'power2.out' 
        })
        
        // Move backgrounds out (curtain opening effect)
        .to(bgLeftRef.current, { 
          x: '-100%', 
          duration: 1.5, 
          ease: 'power2.inOut' 
        }, '-=0.2')
        .to(bgRightRef.current, { 
          x: '100%', 
          duration: 1.5, 
          ease: 'power2.inOut' 
        }, '-=1.5')
        
        // Scale curtains to 0 (final reveal)
        .to(curtainLeftRef.current, { 
          scaleX: 0, 
          duration: 1.2, 
          ease: 'power3.inOut' 
        }, '-=0.8')
        .to(curtainRightRef.current, { 
          scaleX: 0, 
          duration: 1.2, 
          ease: 'power3.inOut' 
        }, '-=1.2')
        
        // Final fade out
        .to([bgLeftRef.current, bgRightRef.current], { 
          opacity: 0, 
          duration: 0.4, 
          ease: 'power2.out' 
        }, '-=0.4');
    }, 1500);

    return () => {
      clearTimeout(timer);
      tl.kill();
    };
  }, [isLoading, setIsLoading]);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Left Curtain */}
      <div
        ref={curtainLeftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-black z-[10002]"
        style={{ 
          transformOrigin: 'left center',
          willChange: 'transform'
        }}
      />
      
      {/* Right Curtain */}
      <div
        ref={curtainRightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-black z-[10002]"
        style={{ 
          transformOrigin: 'right center',
          willChange: 'transform'
        }}
      />

      {/* Curtain Content Container */}
      <div className="absolute inset-0 z-[10001]">
        {/* Left Background */}
        <div
          ref={bgLeftRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
            willChange: 'transform, opacity'
          }}
        >
          <img
            src="/red curtain with welcome .jpg"
            alt="Red Curtain Left"
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: 'center',
              minHeight: '100%',
              minWidth: '100%'
            }}
          />
        </div>

        {/* Right Background */}
        <div
          ref={bgRightRef}
          className="absolute top-0 right-0 w-full h-full"
          style={{
            clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
            willChange: 'transform, opacity'
          }}
        >
          <img
            src="/red curtain with welcome .jpg"
            alt="Red Curtain Right"
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: 'center',
              minHeight: '100%',
              minWidth: '100%'
            }}
          />
        </div>

        {/* Welcome Text */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 pointer-events-none"
        >
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;