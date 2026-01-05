import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const Hero = () => {
    const socialLinks = [
        {
            href: '#contact',
            label: 'Kontakt',
            download: false,
        },
        {
            href: 'https://www.linkedin.com/in/przemysław-abramowicz-11408b245/',
            icon: faLinkedinIn,
            external: true,
        },
        {
            href: 'https://github.com/PrzemekAbramowicz',
            icon: faGithub,
            external: true,
        },
    ];

    return (
        <section className='hero'>
            <div className='hero__wrapper container'>
                <div className='hero__content-box'>
                    <p className='hero__pretitle'>Cześć jestem Przemek</p>
                    <h1 className='hero__title text-gradient'>Frontend Developer</h1>
                    <div className='hero__img hero__img--mobile'>
                        <img src='img/portfolio_img2.png' alt='Przemek Abramowicz' />
                    </div>
                    <p className='hero__subtitle'>
                        Jestem zapalonym i pełnym pasji frontendowcem. Posiadam solidną wiedzę w&nbsp;zakresie budowania
                        responsywnych stron internetowych oraz doświadczenie w pracy z&nbsp;różnymi bibliotekami i
                        frameworkami.
                    </p>
                    <ul className='hero__icons'>
                        {socialLinks.map(({ href, label, icon, download, external }, index) => (
                            <li key={index} className={`hero__icons-icon ${label ? 'hero__icons-icon--cv' : ''}`}>
                                <a
                                    href={href}
                                    download={download}
                                    target={external ? '_blank' : '_self'}
                                    rel='noopener noreferrer'
                                >
                                    {label && `${label} `}
                                    <FontAwesomeIcon icon={icon} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='hero__img hero__img--desktop'>
                    <img src='img/portfolio_img2.png' alt='Przemek Abramowicz' />
                </div>
            </div>
        </section>
    );
};

export default Hero;
