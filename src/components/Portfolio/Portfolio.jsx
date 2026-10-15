import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { projects, projectCategories } from './projects';

const publishedProjects = projects;
const publishedCategories = projectCategories;

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const sectionRef = useRef(null);
    const visibleProjects = publishedProjects.filter(project => activeCategory === 'all' || project.category === activeCategory);
    const intro = activeCategory === 'client'
        ? 'Strony i sklepy internetowe, przy których tworzeniu pracowałem. Wybrane realizacje dla klientów, do których dołożyłem swój kod i doświadczenie.'
        : activeCategory === 'personal'
            ? 'Moje autorskie projekty — aplikacje i strony, w których rozwijam pomysły, testuję rozwiązania i doskonalę warsztat.'
            : 'Autorskie projekty oraz strony i sklepy klientów, przy których tworzeniu pracowałem. Zobacz wybrane efekty mojej pracy.';

    useEffect(() => {
        const section = sectionRef.current;
        const cards = [...section.querySelectorAll('.portfolio__item')];
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const desktop = window.matchMedia('(min-width: 701px)');
        let frame = 0;
        const update = () => {
            frame = 0;
            const bounds = section.getBoundingClientRect();
            if (motion.matches || bounds.bottom < 0 || bounds.top > window.innerHeight) return;
            section.style.setProperty('--scroll-glow', `${Math.max(-180, Math.min(180, -bounds.top * .09))}px`);
            section.style.setProperty('--scroll-turn', `${-bounds.top * .12}deg`);
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) return;
                const progress = (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight;
                card.style.setProperty('--image-drift', `${desktop.matches ? Math.max(-16, Math.min(16, progress * 36)) : 0}px`);
            });
        };
        const schedule = () => { if (!frame && !motion.matches) frame = requestAnimationFrame(update); };
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: .08 });
        cards.forEach(card => {
            card.classList.add('is-animated');
            observer.observe(card);
        });
        const resetMotion = () => {
            cards.forEach(card => card.style.removeProperty('--image-drift'));
            section.style.removeProperty('--scroll-glow');
            section.style.removeProperty('--scroll-turn');
            schedule();
        };
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        motion.addEventListener('change', resetMotion);
        schedule();
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            motion.removeEventListener('change', resetMotion);
        };
    }, [activeCategory]);

    return (
        <section ref={sectionRef} className='portfolio' id='portfolio' aria-labelledby='portfolio-title'>
            <div className='portfolio__atmosphere' aria-hidden='true'><span /><span /></div>
            <div className='portfolio__wrapper container'>
                <header className='portfolio__header'>
                    <div className='portfolio__eyebrow'><span>PORTFOLIO / WYBRANE REALIZACJE</span><span>PROJEKTY WŁASNE I WSPÓŁPRACA</span></div>
                    <div className='portfolio__heading-row'>
                        <h2 id='portfolio-title' className='portfolio__title'>Wybrane<br /><span>realizacje.</span><span className='portfolio__asterisk' aria-hidden='true'>✳</span></h2>
                        <div className='portfolio__intro'><span className='portfolio__intro-line' /><p>{intro}</p><a href='#portfolio-projects'>Poznaj realizacje <span aria-hidden='true'>↘</span></a></div>
                    </div>
                </header>
                <div className='portfolio__toolbar'>
                    <div className='portfolio__filters' role='group' aria-label='Filtruj projekty'>
                        {publishedCategories.map(category => (
                            <button key={category.id} type='button' className='portfolio__filter' aria-pressed={activeCategory === category.id} aria-controls='portfolio-projects' onClick={() => setActiveCategory(category.id)}>
                                {category.label}<sup>{String(category.id === 'all' ? publishedProjects.length : publishedProjects.filter(project => project.category === category.id).length).padStart(2, '0')}</sup>
                            </button>
                        ))}
                    </div>
                    <span className='portfolio__status' role='status'>{visibleProjects.length} projektów do odkrycia</span>
                </div>
                <div className='portfolio__list' id='portfolio-projects' key={activeCategory}>
                    {visibleProjects.map(project => (
                        <article className={`portfolio__item${project.id === projects[0].id ? ' portfolio__item--featured' : ''}`} key={project.id}>
                            <a className='portfolio__visual' href={project.live || project.github} target='_blank' rel='noopener noreferrer' aria-label={`Otwórz projekt ${project.name} (nowa karta)`}>
                                <div className='portfolio__visual-top'><span className='portfolio__number'>{String(projects.indexOf(project) + 1).padStart(2, '0')}</span>{project.id === projects[0].id && <span className='portfolio__featured-label'>✦ WYRÓŻNIONY PROJEKT</span>}<span className='portfolio__category'>{project.category === 'client' ? 'DLA KLIENTA' : 'PROJEKT WŁASNY'}</span></div>
                                <span className='portfolio__backdrop' aria-hidden='true'>{project.name}</span>
                                <div className='portfolio__screen'>
                                    <div className='portfolio__browser' aria-hidden='true'><span>● ● ●</span><span>{project.name.toLowerCase()}</span><span>↗</span></div>
                                    <img className='portfolio__img' src={`${import.meta.env.BASE_URL}${project.imgSrc}`} alt={`Podgląd projektu ${project.name}`} loading='lazy' decoding='async' />
                                </div>
                                <span className='portfolio__visit' aria-hidden='true'><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></span>
                            </a>
                            <div className='portfolio__info'>
                                <h3 className='portfolio__name'>{project.name}</h3>
                                {project.github && <div className='portfolio__links'>
                                    <a className='portfolio__github' href={project.github} target='_blank' rel='noopener noreferrer' aria-label={`Kod projektu ${project.name} na GitHub (nowa karta)`}><FontAwesomeIcon icon={faGithub} /><span>GitHub</span></a>
                                </div>}
                            </div>
                        </article>
                    ))}
                </div>
                <a className='portfolio__footer' href='#contact'><div><span>MASZ POMYSŁ?</span><p>Zróbmy coś <em>dobrego.</em></p></div><span className='portfolio__footer-arrow' aria-hidden='true'><FontAwesomeIcon icon={faArrowRight} /></span></a>
            </div>
        </section>
    );
};

export default Portfolio;
