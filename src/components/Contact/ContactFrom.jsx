import { useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import ContactDetails from './ContactDetails';
import Input from './Input';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        company: '',
    });

    const [isSending, setIsSending] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (formData.company) return;

        if (!formData.email.includes('@')) {
            Swal.fire('Błąd', 'Podaj poprawny adres email', 'error');
            return;
        }

        setIsSending(true);

        try {
            await emailjs.send(
                'service_hnv35s9',
                'template_czggzf5',
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                },
                '9QGJufcb49ROSXZPM'
            );

            Swal.fire({
                title: 'Wysłano!',
                text: 'Dziękuję za wiadomość. Odezwę się wkrótce 👋',
                icon: 'success',
            });

            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                company: '',
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Błąd',
                text: 'Nie udało się wysłać formularza. Spróbuj ponownie później.',
                icon: 'error',
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className='contact-form__wrapper container'>
            <form className='form' onSubmit={handleSubmit} noValidate>
                <h2 className='form__title text-gradient'>Pracujmy razem!</h2>
                <p className='form__subtitle'>
                    Masz projekt lub pytanie? Napisz do mnie 👇
                </p>

                <input
                    type='text'
                    name='company'
                    value={formData.company}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex='-1'
                    autoComplete='off'
                />

                <Input
                    type='text'
                    name='name'
                    id='name'
                    label='Imię'
                    value={formData.name}
                    onChange={handleChange}
                />

                <Input
                    type='email'
                    name='email'
                    id='email'
                    label='Email'
                    value={formData.email}
                    onChange={handleChange}
                />

                <Input
                    type='tel'
                    name='phone'
                    id='phone'
                    label='Telefon'
                    value={formData.phone}
                    onChange={handleChange}
                />

                <Input
                    type='textarea'
                    name='message'
                    id='message'
                    label='Wiadomość'
                    value={formData.message}
                    onChange={handleChange}
                />

                <button className='form__btn' disabled={isSending}>
                    {isSending ? 'Wysyłanie...' : 'Wyślij'}
                </button>
            </form>

            <ContactDetails />
        </div>
    );
};

export default ContactForm;
