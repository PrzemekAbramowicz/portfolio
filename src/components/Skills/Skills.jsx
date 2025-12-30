const skillsData = [
    { name: 'Tailwindcss', imgSrc: 'img/tailwindcss-icon.svg' },
    { name: 'JavaScript', imgSrc: 'img/js.svg' },
    { name: 'Alpine.js', imgSrc: 'img/alpinejs.svg' },
    { name: 'Node.js', imgSrc: 'img/node-js.svg' },
    { name: 'Express', imgSrc: 'img/express-original.svg' },
    { name: 'Wordpress', imgSrc: 'img/wp.svg' },
];

const Skills = () => (
    <section className='skills' id='skills'>
        <h2 className='skills__title text-gradient'>Umiejętności</h2>
        <div className='skills__list'>
            {skillsData.map(skill => (
                <div className='skills__item' key={skill.name}>
                    <div className='skills__image-wrapper'>
                        <img className='skills__image' src={skill.imgSrc} alt={skill.name} />
                    </div>
                    <p className='skills__name'>{skill.name}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Skills;
