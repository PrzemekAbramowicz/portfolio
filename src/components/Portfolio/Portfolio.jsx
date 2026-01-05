import { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('all');
    const gliderRef = useRef(null);

    const handleTabClick = tab => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const glider = gliderRef.current;
        const tabs = document.querySelectorAll('.tab-button');
        const index = Array.from(tabs).findIndex(tab => tab.dataset.tab === activeTab);

        if (glider) {
            glider.style.transform =
                window.innerWidth > 768 ? `translateX(${index * 100}%)` : `translateY(${index * 100}%)`;
        }
    }, [activeTab]);

    const portfolioItems = {
        all: [
            {
                name: 'Tropical paradise',
                imgSrc: 'img/tropical_paradise.png',
                github: 'https://github.com/PrzemekAbramowicz/Tropical-paradise',
                live: 'https://przemekabramowicz.github.io/Tropical-paradise/',
            },
            {
                name: 'Great Evening',
                imgSrc: 'img/great-evening.png',
                github: 'https://github.com/PrzemekAbramowicz/great-evening/ ',
                live: 'https://przemekabramowicz.github.io/great-evening/',
            },
            {
                name: 'Client CRM',
                imgSrc: 'img/clients-crm.png',
                github: 'https://github.com/PrzemekAbramowicz/Clients-CRM',
            },
            // {
            //     name: 'Planet Pay',
            //     imgSrc: 'img/planetpay.png',
            //     live: 'https://planetpay.pl/',
            // },
            // {
            //     name: 'ITCARD',
            //     imgSrc: 'img/itcard.png',
            //     live: 'https://itcard.pl/',
            // },
            // {
            //     name: 'Safety Cloud Hub',
            //     imgSrc: 'img/safetycloudhub.png',
            //     live: 'https://safetycloudhub.com/',
            // },
            // {
            //     name: 'Animalactin',
            //     imgSrc: 'img/animalactin.png',
            //     live: 'https://animalactin.eu/',
            // },
            {
                name: 'Stopwatch',
                imgSrc: 'img/stopwatch-project.png',
                github: 'https://github.com/PrzemekAbramowicz/Frontowcy-project2-stopwatch',
                live: 'https://przemekabramowicz.github.io/Frontowcy-project2-stopwatch/',
            },
        ],
        // 'client-projects': [
        //     {
        //         name: 'Planet Pay',
        //         imgSrc: 'img/planetpay.png',
        //         live: 'https://planetpay.pl/',
        //     },
        //     {
        //         name: 'ITCARD',
        //         imgSrc: 'img/itcard.png',
        //         live: 'https://itcard.pl/',
        //     },
        //     {
        //         name: 'Safety Cloud Hub',
        //         imgSrc: 'img/safetycloudhub.png',
        //         live: 'https://safetycloudhub.com/',
        //     },
        //     {
        //         name: 'Animalactin',
        //         imgSrc: 'img/animalactin.png',
        //         live: 'https://animalactin.eu/',
        //     },
        // ],
        'my-projects': [
            {
                name: 'Tropical paradise',
                imgSrc: 'img/tropical_paradise.png',
                github: 'https://github.com/PrzemekAbramowicz/Tropical-paradise',
                live: 'https://przemekabramowicz.github.io/Tropical-paradise/',
            },
            {
                name: 'Client CRM',
                imgSrc: 'img/clients-crm.png',
                github: 'https://github.com/PrzemekAbramowicz/Clients-CRM',
            },
            {
                name: 'Great Evening',
                imgSrc: 'img/great-evening.png',
                github: 'https://github.com/PrzemekAbramowicz/great-evening/',
                live: 'https://przemekabramowicz.github.io/great-evening/',
            },
            {
                name: 'Stopwatch',
                imgSrc: 'img/stopwatch-project.png',
                github: 'https://github.com/PrzemekAbramowicz/Frontowcy-project2-stopwatch',
                live: 'https://przemekabramowicz.github.io/Frontowcy-project2-stopwatch/',
            },
        ],
    };

    return (
        <section className='portfolio' id='portfolio'>
            <div className='portfolio__wrapper container'>
                <h2 className='portfolio__title text-gradient'>Portfolio</h2>
                {/* <div className='tabs'>
                    <button
                        className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                        data-tab='all'
                        onClick={() => handleTabClick('all')}
                    >
                        Wszystkie
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'client-projects' ? 'active' : ''}`}
                        data-tab='client-projects'
                        onClick={() => handleTabClick('client-projects')}
                    >
                        Projekty klientów
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'my-projects' ? 'active' : ''}`}
                        data-tab='my-projects'
                        onClick={() => handleTabClick('my-projects')}
                    >
                        Moje projekty
                    </button>
                    <span className='glider' ref={gliderRef}></span>
                </div> */}
                {Object.keys(portfolioItems).map(tab => (
                    <div
                        key={tab}
                        className='portfolio__list tab-content'
                        id={tab}
                        style={{ display: activeTab === tab ? 'flex' : 'none' }}
                    >
                        {portfolioItems[tab].map((item, index) => (
                            <div className='portfolio__item' key={index}>
                                <div className='portfolio__item-wrapper'>
                                    <img className='portfolio__img' src={item.imgSrc} alt={item.name} />
                                    <div className='portfolio__corner' href='#'>
                                        <div className='portfolio__arrow'>
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </div>
                                    </div>
                                    <div className='portfolio__info'>
                                        <h3 className='portfolio__name'>{item.name}</h3>
                                        <div className='portfolio__info-buttons'>
                                            {item.github && (
                                                <a
                                                    href={item.github}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='portfolio__info-button'
                                                >
                                                    <FontAwesomeIcon icon={faGithub} />
                                                </a>
                                            )}
                                            {item.live && (
                                                <a
                                                    href={item.live}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='portfolio__info-button'
                                                >
                                                    <FontAwesomeIcon icon={faGlobe} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
