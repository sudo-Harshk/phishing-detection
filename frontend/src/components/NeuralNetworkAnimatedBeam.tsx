'use client';
import { cn } from '@/lib/utils';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { AnimatedBeam } from '@/components/ui/animated-beam';

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'z-10 flex h-12 w-12 items-center justify-center rounded-full border p-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg',
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = 'Circle';

export default function NeuralNetworkAnimatedBeam() {
    const containerRef = useRef<HTMLDivElement>(null);

    const inRef1 = useRef<HTMLDivElement>(null);
    const inRef2 = useRef<HTMLDivElement>(null);
    const inRef3 = useRef<HTMLDivElement>(null);

    const h1Ref1 = useRef<HTMLDivElement>(null);
    const h1Ref2 = useRef<HTMLDivElement>(null);
    const h1Ref3 = useRef<HTMLDivElement>(null);
    const h1Ref4 = useRef<HTMLDivElement>(null);
    const h1Ref5 = useRef<HTMLDivElement>(null);

    const h2Ref1 = useRef<HTMLDivElement>(null);
    const h2Ref2 = useRef<HTMLDivElement>(null);
    const h2Ref3 = useRef<HTMLDivElement>(null);
    const h2Ref4 = useRef<HTMLDivElement>(null);
    const h2Ref5 = useRef<HTMLDivElement>(null);

    const outRef1 = useRef<HTMLDivElement>(null);

    const inputRefs = [inRef1, inRef2, inRef3];
    const hidden1Refs = [h1Ref1, h1Ref2, h1Ref3, h1Ref4, h1Ref5];
    const hidden2Refs = [h2Ref1, h2Ref2, h2Ref3, h2Ref4, h2Ref5];
    const outputRefs = [outRef1];

    const inputGradient = { start: '#60a5fa', stop: '#818cf8' };
    const hiddenGradient = { start: '#a78bfa', stop: '#d948ae' };
    const outputGradient = { start: '#fb923c', stop: '#f43f5e' };

    const duration = 1.2;
    const neuronGap = 0.15;
    const layerGap = 0.3;
    const cycleEndPause = 1.5;      
    const neuronCycle = duration + neuronGap;
    const wave1End = 2 * neuronCycle + duration + layerGap;
    const wave2End = wave1End + 4 * neuronCycle + duration + layerGap;
    const totalCycleDurationSec = wave2End + 4 * neuronCycle + duration + cycleEndPause;

    const [cycle, setCycle] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCycle((c) => c + 1);
        }, totalCycleDurationSec * 1000);
        return () => clearInterval(interval);
    }, [totalCycleDurationSec]);

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-visible rounded-xl bg-gradient-to-b from-slate-50/80 to-white" ref={containerRef}>
            <div className='flex h-full w-full flex-row items-stretch justify-center md:justify-end gap-8 md:gap-16 lg:gap-24 mb-16'>
                <div className='flex flex-col items-center justify-center gap-12 relative'>
                    {inputRefs.map((ref, i) => (
                        <Circle ref={ref} key={`in-${i}`} className='bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'>
                            <span className='text-sm text-blue-900 font-mono'>X<sub>{i + 1}</sub></span>
                        </Circle>
                    ))}
                    <div className="absolute -bottom-16 w-32 text-center">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Input Layer</p>
                        <p className="text-[10px] font-medium text-slate-500 leading-tight mt-1">Raw Email<br />Characters</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-6 relative'>
                    {hidden1Refs.map((ref, i) => (
                        <Circle ref={ref} key={`h1-${i}`} className='bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200'>
                            <span className='text-sm text-indigo-900 font-mono'>H1<sub>{i + 1}</sub></span>
                        </Circle>
                    ))}
                    <div className="absolute -bottom-16 w-32 text-center">
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Attention</p>
                        <p className="text-[10px] font-medium text-slate-500 leading-tight mt-1">Contextual<br />Analysis</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-6 relative'>
                    {hidden2Refs.map((ref, i) => (
                        <Circle ref={ref} key={`h2-${i}`} className='bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200'>
                            <span className='text-sm text-pink-900 font-mono'>H2<sub>{i + 1}</sub></span>
                        </Circle>
                    ))}
                    <div className="absolute -bottom-16 w-32 text-center">
                        <p className="text-xs font-bold text-pink-600 uppercase tracking-wider">Dense</p>
                        <p className="text-[10px] font-medium text-slate-500 leading-tight mt-1">Feature<br />Extraction</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-12 relative'>
                    {outputRefs.map((ref, i) => (
                        <Circle ref={ref} key={`out-${i}`} className='bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200 h-16 w-16'>
                            <span className='text-base font-bold text-rose-900 font-mono'>Y</span>
                        </Circle>
                    ))}
                    <div className="absolute -bottom-16 w-32 text-center">
                        <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">Output</p>
                        <p className="text-[10px] font-medium text-slate-500 leading-tight mt-1">Phishing<br />Probability</p>
                    </div>
                </div>
            </div>
            {inputRefs.map((fromRef, i) =>
                hidden1Refs.map((toRef, j) => (
                    <AnimatedBeam
                        key={`in-to-h1-${i}-${j}-${cycle}`}
                        containerRef={containerRef}
                        fromRef={fromRef}
                        toRef={toRef}
                        dotted
                        duration={duration}
                        delay={i * neuronCycle}
                        runOnce
                        pathColor={inputGradient.start}
                        curvature={Math.max(-20, Math.min(20, (i - 1) * 10 - (j - 2) * 4))}
                        gradientStartColor={inputGradient.start}
                        gradientStopColor={inputGradient.stop}
                    />
                ))
            )}
            {hidden1Refs.map((fromRef, i) =>
                hidden2Refs.map((toRef, j) => {
                        const baseCurvature = (i - 2) * 8 - (j - 2) * 8;
                    const curvature = (i === j && (i === 0 || i === 4))
                        ? (i === 0 ? 12 : -12)
                        : Math.max(-25, Math.min(25, baseCurvature));
                    return (
                        <AnimatedBeam
                            key={`h1-to-h2-${i}-${j}-${cycle}`}
                            containerRef={containerRef}
                            fromRef={fromRef}
                            toRef={toRef}
                            dotted
                            duration={duration}
                            delay={wave1End + i * neuronCycle}
                            runOnce
                            pathColor={hiddenGradient.start}
                            curvature={curvature}
                            gradientStartColor={hiddenGradient.start}
                            gradientStopColor={hiddenGradient.stop}
                        />
                    );
                })
            )}
            {hidden2Refs.map((fromRef, i) => {
                const baseCurvature = (-30 + i * 15) * 1.5;
                const curvature = i === 2 ? 10 : baseCurvature;
                return (
                    <AnimatedBeam
                        key={`h2-to-out-${i}-${cycle}`}
                        containerRef={containerRef}
                        fromRef={fromRef}
                        toRef={outRef1}
                        dotted
                        duration={duration}
                        delay={wave2End + i * neuronCycle}
                        runOnce
                        pathColor={outputGradient.start}
                        curvature={curvature}
                        endYOffset={i * -15 + 30}
                        gradientStartColor={outputGradient.start}
                        gradientStopColor={outputGradient.stop}
                    />
                );
            })}
        </div>
    );
}
