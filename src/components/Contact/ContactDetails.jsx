import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const ContactDetails = () => (
    <div className='contact'>
        <p className='contact__eyebrow'>KONTAKT</p>
        <h2 id='contact-title' className='contact__title'>Dobry projekt zaczyna się od <span className='text-gradient'>rozmowy.</span></h2>
        <p className='contact__intro'>Potrzebujesz strony internetowej lub wsparcia przy projekcie? Opowiedz mi, co planujesz — porozmawiajmy o współpracy.</p>
        <div className='contact__links'>
            <a className='contact__item' href='mailto:abramowicz.dev@gmail.com'>
                <span className='contact__icon'><FontAwesomeIcon icon={faEnvelope} /></span>
                <span><span className='contact__label'>Napisz do mnie</span><span className='contact__value'>abramowicz.dev@gmail.com</span></span>
            </a>
            <a className='contact__item' href='tel:+485780602656'>
                <span className='contact__icon'><FontAwesomeIcon icon={faPhone} /></span>
                <span><span className='contact__label'>Porozmawiajmy</span><span className='contact__value'>+48 780 602 656</span></span>
            </a>
            <div className='contact__item'>
                <span className='contact__icon'><FontAwesomeIcon icon={faLocationDot} /></span>
                <span><span className='contact__label'>Lokalizacja</span><span className='contact__value'>Warszawa · współpraca zdalna</span></span>
            </div>
        </div>
    </div>
);

export default ContactDetails;
