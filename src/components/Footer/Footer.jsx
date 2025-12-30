const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__wrapper container'>
                <a href='#' className='footer__logo'>
                    <span className='logo-name'>ABRAMOWICZ.DEV</span>
                </a>
                <ul className='footer__list'>
                    <li className='footer__item'>
                        <a className='footer__item-link' href='#portfolio'>
                            Portfolio
                        </a>
                    </li>
                    <li className='footer__item'>
                        <a className='footer__item-link' href='#skills'>
                            Umiejętności
                        </a>
                    </li>
                    {/* <li className='footer__item'>
						<a className='footer__item-link' href='#testimonials'>
							Opinie
						</a>
					</li> */}
                    <li className='footer__item'>
                        <a className='footer__item-link' href='#contact'>
                            Kontakt
                        </a>
                    </li>
                </ul>
                <p className='footer__copyright'>
                    &copy; 2025 Wszelkie prawa zastrzeżone przez <b>ABRAMOWICZ.DEV</b>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
