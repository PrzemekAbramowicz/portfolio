import ContactForm from './ContactFrom';
import ContactDetails from './ContactDetails';

const Contact = () => (
    <section className='contact-form' id='contact' aria-labelledby='contact-title'>
        <div className='contact-form__wrapper container'>
            <ContactDetails />
            <ContactForm />
        </div>
    </section>
);

export default Contact;
