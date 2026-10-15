import { useState, useEffect, useRef } from 'react';
import Logo from '../Logo/Logo';

const items = [
    { label: 'Portfolio', href: 'portfolio' },
    { label: 'Umiejętności', href: 'skills' },
    { label: 'Kontakt', href: 'contact' },
];

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const burgerRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        const update = () => {
            setScrolled(window.scrollY > 20);
            let current = '';
            for (const item of items) {
                if (document.getElementById(item.href)?.getBoundingClientRect().top <= 140) current = item.href;
            }
            setActiveSection(current);
        };
        const desktop = window.matchMedia('(min-width: 1024px)');
        const closeOnDesktop = () => { if (desktop.matches) setMenuActive(false); };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        desktop.addEventListener('change', closeOnDesktop);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
            desktop.removeEventListener('change', closeOnDesktop);
        };
    }, []);

    useEffect(() => {
        if (!menuActive) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const background = [...document.getElementById('root').children].filter(element => element.tagName !== 'HEADER');
        const previousInert = background.map(element => element.inert);
        background.forEach(element => { element.inert = true; });
        navRef.current.querySelector('a')?.focus();
        const handleKey = (event) => {
            if (event.key === 'Escape') {
                setMenuActive(false);
                burgerRef.current.focus();
            }
            if (event.key === 'Tab') {
                const controls = [burgerRef.current, ...navRef.current.querySelectorAll('a')];
                const index = controls.indexOf(document.activeElement);
                if (event.shiftKey && index <= 0) {
                    event.preventDefault();
                    controls.at(-1).focus();
                } else if (!event.shiftKey && (index === controls.length - 1 || index === -1)) {
                    event.preventDefault();
                    controls[0].focus();
                }
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            background.forEach((element, index) => { element.inert = previousInert[index]; });
            document.removeEventListener('keydown', handleKey);
        };
    }, [menuActive]);

    const closeMenu = () => {
        if (menuActive) burgerRef.current.focus();
        setMenuActive(false);
    };

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuActive ? 'header--menu-open' : ''}`}>
            <div className='header__wrapper container'>
                <a className='header__logo' href='#' aria-label='Abramowicz.dev — strona główna'>
                    <Logo />
                </a>
                <a className='header__hireme' href='#contact'>Porozmawiajmy</a>
                <button ref={burgerRef} className={`hamburger ${menuActive ? 'is-active' : ''}`} type='button'
                    aria-label={menuActive ? 'Zamknij menu' : 'Otwórz menu'} aria-expanded={menuActive}
                    aria-controls='main-menu' onClick={() => setMenuActive(value => !value)}>
                    <span className='hamburger-box' aria-hidden='true'><span className='hamburger-inner' /></span>
                </button>
                <nav ref={navRef} id='main-menu' aria-label='Nawigacja główna' className={`menu ${menuActive ? 'menu-show' : ''}`}>
                    <ul className='menu__list'>
                        {items.map(item => (
                            <li key={item.href} className='menu__item'>
                                <a className='menu__item-link' href={`#${item.href}`}
                                    aria-current={activeSection === item.href ? 'location' : undefined} onClick={closeMenu}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
export default Header;
