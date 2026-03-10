'use client';
import { cn } from '@/lib/utils';
import React, { forwardRef, useRef } from 'react';

import { AnimatedBeam } from '@/components/ui/animated-beam';

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm',
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

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-visible" ref={containerRef}>
            <div className='flex h-full w-full flex-row items-stretch justify-center md:justify-end gap-8 md:gap-16 lg:gap-24 mb-16'>
                <div className='flex flex-col items-center justify-center gap-12 relative'>
                    {inputRefs.map((ref, i) => (
                        <Circle ref={ref} key={`in-${i}`} className='bg-blue-50 border-blue-200'>
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
                        <Circle ref={ref} key={`h1-${i}`} className='bg-indigo-50 border-indigo-200'>
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
                        <Circle ref={ref} key={`h2-${i}`} className='bg-pink-50 border-pink-200'>
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
                        <Circle ref={ref} key={`out-${i}`} className='bg-rose-50 border-rose-200 h-16 w-16'>
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
                        key={`in-to-h1-${i}-${j}`}
                        containerRef={containerRef}
                        fromRef={fromRef}
                        toRef={toRef}
                        dotted
                        duration={0.2}
                        delay={(i * 5 + j) * 0.2}
                        repeatDelay={9.8}
                        curvature={(i - 1) * 15 - (j - 2) * 5}
                        gradientStartColor={inputGradient.start}
                        gradientStopColor={inputGradient.stop}
                    />
                ))
            )}
            {hidden1Refs.map((fromRef, i) =>
                hidden2Refs.map((toRef, j) => (
                    <AnimatedBeam
                        key={`h1-to-h2-${i}-${j}`}
                        containerRef={containerRef}
                        fromRef={fromRef}
                        toRef={toRef}
                        dotted
                        duration={0.2}
                        delay={3.0 + (i * 5 + j) * 0.2} // Starts completely after wave 1
                        repeatDelay={9.8} // Constant 10s master cycle
                        curvature={(i - 2) * 10 - (j - 2) * 10}
                        gradientStartColor={hiddenGradient.start}
                        gradientStopColor={hiddenGradient.stop}
                    />
                ))
            )}
            {hidden2Refs.map((fromRef, i) => (
                <AnimatedBeam
                    key={`h2-to-out-${i}`}
                    containerRef={containerRef}
                    fromRef={fromRef}
                    toRef={outRef1}
                    dotted
                    duration={0.5}
                    delay={8.2} // Starts completely after wave 2 is finished, equally simultaneously
                    repeatDelay={9.5} // Constant 10s master cycle
                    curvature={(-30 + i * 15) * 1.5}
                    endYOffset={i * -15 + 30}
                    gradientStartColor={outputGradient.start}
                    gradientStopColor={outputGradient.stop}
                />
            ))}
        </div>
    );
}
