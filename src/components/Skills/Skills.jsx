import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faSass } from '@fortawesome/free-brands-svg-icons';

const skillsData = [
    { name: 'React', image: 'react.svg', category: 'Interfejsy', description: 'Komponenty, które składają się na interaktywne aplikacje.', color: '#70dcf6', featured: true },
    { name: 'JavaScript', image: 'js.svg', category: 'Logika', description: 'Interakcje i funkcjonalności, które ożywiają strony.', color: '#f4d76a', featured: true },
    { name: 'Tailwind CSS', image: 'tailwindcss-icon.svg', category: 'Styling', description: 'Responsywne widoki i spójny wygląd interfejsu.', color: '#6ae3d1', featured: true },
    { name: 'HTML & CSS', icon: faHtml5, category: 'Fundamenty', description: 'Struktura strony i układy na każdy ekran.', color: '#ffad84' },
    { name: 'Sass / SCSS', icon: faSass, category: 'Styling', description: 'Modułowe style i łatwiejsza praca z CSS.', color: '#f1a0ca' },
    { name: 'Alpine.js', image: 'alpinejs.svg', category: 'Interakcje', description: 'Lekkie, dynamiczne elementy stron.', color: '#a4c8ef' },
    { name: 'Node.js', image: 'node-js.svg', category: 'Backend', description: 'JavaScript także po stronie serwera.', color: '#a9db8b' },
    { name: 'Express', image: 'express-original.svg', category: 'Backend', description: 'Routing i obsługa żądań w aplikacjach Node.js.', color: '#d4baff', lightIcon: true },
    { name: 'WordPress', image: 'wp.svg', category: 'CMS', description: 'Strony z wygodnym zarządzaniem treścią.', color: '#8ecbf4' },
];

const Skills = () => (
    <section className='skills' id='skills' aria-labelledby='skills-title'>
        <div className='skills__wrapper container'>
            <div className='skills__eyebrow'><span>UMIEJĘTNOŚCI / TECH STACK</span><span>OD POMYSŁU DO INTERFEJSU</span></div>
            <div className='skills__heading'>
                <h2 id='skills-title' className='skills__title'>Technologie,<br /><span>które znam.</span><span className='skills__spark' aria-hidden='true'>✳</span></h2>
                <p className='skills__intro'>Łączę kod z wyczuciem designu. Z tych narzędzi buduję responsywne strony i interaktywne aplikacje.</p>
            </div>
            <ul className='skills__list'>
                {skillsData.map((skill, index) => (
                    <li className={`skills__card${skill.featured ? ' skills__card--featured' : ''}`} key={skill.name} style={{ '--skill-color': skill.color, '--skill-delay': `${index * 65}ms` }}>
                        <div className='skills__card-top'>
                            <span className='skills__category'>{skill.category}</span>
                            <span className='skills__index' aria-hidden='true'>{String(index + 1).padStart(2, '0')}</span>
                        </div>
                        <div className='skills__identity'>
                            <div className={`skills__icon${skill.lightIcon ? ' skills__icon--light' : ''}`} aria-hidden='true'>
                                {skill.image ? <img src={`${import.meta.env.BASE_URL}img/${skill.image}`} alt='' width='56' height='56' /> : <FontAwesomeIcon icon={skill.icon} />}
                            </div>
                            <h3 className='skills__name'>{skill.name}</h3>
                        </div>
                        <p className='skills__description'>{skill.description}</p>
                        <span className='skills__accent' aria-hidden='true' />
                    </li>
                ))}
            </ul>
            <div className='skills__footer'><p>Technologie w praktyce</p><a href='#portfolio'>Zobacz moje projekty <span aria-hidden='true'>↗</span></a></div>
        </div>
    </section>
);

export default Skills;
