import { useState, useEffect } from 'react';

const Header = ({ isSticky }) => {
    const [menuActive, setMenuActive] = useState(false);
    const [sticky, setSticky] = useState(false);

    const handleBurgerClick = () => {
        setMenuActive(!menuActive);
    };

    const handleMenuItemClick = () => {
        setMenuActive(false);
    };

    const checkScroll = () => {
        const halfway = window.innerHeight / 2;
        if (window.scrollY > halfway) {
            if (!sticky) {
                setSticky(true);
            }
        } else {
            if (sticky) {
                setSticky(false);
            }
        }
    };

    useEffect(() => {
        if (isSticky) {
            window.addEventListener('scroll', checkScroll);
        }
        return () => {
            if (isSticky) {
                window.removeEventListener('scroll', checkScroll);
            }
        };
    }, [sticky, isSticky]);

    return (
        <header className={`header ${isSticky ? 'header--sticky' : ''} ${sticky ? 'sticky' : ''}`}>
            <div className='header__wrapper container'>
                <a className='header__logo' href='#'>
                    <span className='logo-name'>ABRAMOWICZ.DEV</span>
                    <span className='logo-name--mobile'>&lt;/&gt;</span>
                </a>
                <a className='header__hireme' href='#contact'>
                    Hire me!
                </a>
                <button
                    className={`hamburger hamburger--spin ${menuActive ? 'is-active' : ''}`}
                    type='button'
                    onClick={handleBurgerClick}
                >
                    <span className='hamburger-box'>
                        <span className='hamburger-inner'></span>
                    </span>
                </button>
                <nav className={`menu ${menuActive ? 'menu-show' : ''}`}>
                    <ul className='menu__list'>
                        {[
                            { label: 'Portfolio', href: 'portfolio' },
                            { label: 'Umiejętności', href: 'skills' },
                            { label: 'Kontakt', href: 'contact' },
                        ].map((item, index) => (
                            <li key={index} className='menu__item'>
                                <a className='menu__item-link' href={`#${item.href}`} onClick={handleMenuItemClick}>
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
