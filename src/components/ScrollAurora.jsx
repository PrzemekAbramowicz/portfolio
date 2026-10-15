import { useEffect, useRef } from 'react';

export default function ScrollAurora() {
    const ringRef = useRef(null);

    useEffect(() => {
        const ring = ringRef.current;
        const area = ring.parentElement;
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;
        const update = () => {
            frame = 0;
            if (motion.matches) {
                ring.style.removeProperty('transform');
                ring.style.removeProperty('--aurora-turn');
                return;
            }
            const bounds = area.getBoundingClientRect();
            const travel = Math.max(0, Math.min(bounds.height - ring.offsetHeight, -bounds.top + window.innerHeight * .05));
            const phase = travel / 1100;
            ring.style.transform = `translate3d(${Math.sin(phase) * 12}%, ${travel}px, 0)`;
            ring.style.setProperty('--aurora-turn', `${Math.sin(phase * .8) * 18}deg`);
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
        const observer = new ResizeObserver(schedule);
        observer.observe(area);
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        motion.addEventListener('change', schedule);
        schedule();
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            motion.removeEventListener('change', schedule);
        };
    }, []);

    return (
        <div ref={ringRef} className='scroll-aurora' aria-hidden='true'>
            <div className='scroll-aurora__light scroll-aurora__light--violet' />
            <div className='scroll-aurora__light scroll-aurora__light--blue' />
            <svg className='scroll-aurora__ribbons' viewBox='0 0 1000 800' fill='none'>
                <defs>
                    <linearGradient id='aurora-ribbon' x1='100' y1='700' x2='900' y2='100' gradientUnits='userSpaceOnUse'>
                        <stop stopColor='#8750f7' stopOpacity='0' />
                        <stop offset='.4' stopColor='#b08aff' stopOpacity='.65' />
                        <stop offset='.65' stopColor='#8fe4ed' stopOpacity='.5' />
                        <stop offset='1' stopColor='#8750f7' stopOpacity='0' />
                    </linearGradient>
                </defs>
                {Array.from({ length: 7 }, (_, index) => (
                    <path key={index} d={`M -100 ${640 + index * 16} C 180 ${760 - index * 20}, 170 ${120 + index * 22}, 480 ${300 + index * 12} S 780 ${530 - index * 22}, 1100 ${30 + index * 26}`} stroke='url(#aurora-ribbon)' strokeWidth={index === 3 ? 1.5 : .65} />
                ))}
            </svg>
        </div>
    );
}
