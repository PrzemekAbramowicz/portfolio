import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { validateContactField } from './validation';

const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
const isConfigured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint || '');

const ContactForm = () => {
    const sending = useRef(false);
    const [status, setStatus] = useState('idle');
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState({});

    const validateInput = event => {
        const { name, value } = event.target;
        setErrors(previous => ({ ...previous, [name]: validateContactField(name, value) }));
    };

    const fieldProps = name => ({
        'aria-invalid': Boolean(errors[name]),
        'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
        onBlur: validateInput,
        onChange: event => {
            if (errors[name]) validateInput(event);
        },
    });

    const fieldError = name => errors[name] && (
        <p className='form__field-error' id={`contact-${name}-error`} aria-live='polite'>{errors[name]}</p>
    );

    const handleSubmit = async event => {
        event.preventDefault();
        if (sending.current || !isConfigured) return;
        const form = event.currentTarget;
        const data = new FormData(form);
        if (data.get('_gotcha')) return;
        const nextErrors = {};
        for (const name of ['name', 'phone', 'email', 'message']) {
            const value = String(data.get(name) || '').trim();
            data.set(name, value);
            const error = validateContactField(name, value);
            if (error) nextErrors[name] = error;
        }
        setErrors(nextErrors);
        setFeedback('');
        if (Object.keys(nextErrors).length) {
            form.elements.namedItem(Object.keys(nextErrors)[0]).focus();
            return;
        }
        sending.current = true;
        setStatus('sending');
        setFeedback('');
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
                signal: controller.signal,
            });
            if (!response.ok) {
                setStatus('error');
                setFeedback(response.status === 429
                    ? 'Zbyt wiele prób. Poczekaj chwilę lub napisz bezpośrednio na e-mail.'
                    : 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na e-mail.');
                return;
            }
            form.reset();
            setErrors({});
            setStatus('success');
            void Swal.fire({
                icon: 'success',
                title: 'Dziękuję za wiadomość!',
                text: 'Odezwę się najszybciej, jak to możliwe, na podany adres e-mail.',
                confirmButtonText: 'Super, dziękuję!',
                background: '#1c1429',
                color: '#fff',
                confirmButtonColor: '#7540df',
                iconColor: '#b9a0f4',
                customClass: { popup: 'contact-success-popup' },
                heightAuto: false,
                scrollbarPadding: !CSS.supports('scrollbar-gutter', 'stable'),
                returnFocus: false,
                didClose: () => form.querySelector('button[type="submit"]')?.focus({ preventScroll: true }),
            });
        } catch (error) {
            setStatus('error');
            setFeedback(error.name === 'AbortError'
                ? 'Nie otrzymano potwierdzenia wysyłki. Wiadomość mogła dotrzeć — przed ponowną próbą poczekaj chwilę lub skontaktuj się e-mailem.'
                : 'Nie udało się potwierdzić wysyłki. Sprawdź połączenie lub napisz bezpośrednio na e-mail.');
        } finally {
            clearTimeout(timeout);
            sending.current = false;
        }
    };

    return (
        <form className='form' noValidate onSubmit={handleSubmit} aria-labelledby='contact-form-title' aria-busy={status === 'sending'}>
            <h3 id='contact-form-title' className='form__title'>Opowiedz mi o swoim pomyśle</h3>
            <p className='form__subtitle'>Napisz, czego potrzebujesz. Wspólnie ustalimy szczegóły.</p>
            {!isConfigured && <p className='form__notice'>Formularz jest chwilowo niedostępny. Napisz na <a href='mailto:abramowicz.dev@gmail.com'>abramowicz.dev@gmail.com</a>.</p>}
            <fieldset disabled={status === 'sending' || !isConfigured}>
                <div className='form__honeypot' aria-hidden='true'>
                    <label htmlFor='contact-company'>Zostaw to pole puste</label>
                    <input id='contact-company' name='_gotcha' tabIndex={-1} autoComplete='off' />
                </div>
                <div className='form__row'>
                    <div className='form__field'>
                        <label htmlFor='contact-name'>Imię <span>(wymagane)</span></label>
                        <input id='contact-name' name='name' autoComplete='given-name' required maxLength={100} {...fieldProps('name')} />
                        {fieldError('name')}
                    </div>
                    <div className='form__field'>
                        <label htmlFor='contact-phone'>Telefon <span>(opcjonalnie)</span></label>
                        <input id='contact-phone' name='phone' type='tel' autoComplete='tel' maxLength={30} {...fieldProps('phone')} />
                        {fieldError('phone')}
                    </div>
                </div>
                <div className='form__field'>
                    <label htmlFor='contact-email'>E-mail <span>(wymagany)</span></label>
                    <input id='contact-email' name='email' type='email' autoComplete='email' required maxLength={254} {...fieldProps('email')} />
                    {fieldError('email')}
                </div>
                <div className='form__field'>
                    <label htmlFor='contact-message'>Wiadomość <span>(wymagana)</span></label>
                    <textarea id='contact-message' name='message' rows={6} required maxLength={5000} placeholder='Co chcesz stworzyć? Jeśli znasz termin lub budżet, możesz je podać.' {...fieldProps('message')} />
                    {fieldError('message')}
                </div>
                <p className='form__privacy'>Wiadomość i podane dane zostaną przekazane przez Formspree w celu kontaktu w sprawie Twojego zapytania.</p>
                <button className='form__btn' type='submit' disabled={status === 'sending' || !isConfigured}>
                    <span>{status === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'}</span>
                    {status === 'sending' ? (
                        <span className='form__btn-spinner' aria-hidden='true' />
                    ) : (
                        <svg className='form__btn-arrow' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                            <path d='M5 12h14m-6-6 6 6-6 6' />
                        </svg>
                    )}
                </button>
            </fieldset>
            <div className={`form__feedback form__feedback--${status}`} role='status' aria-live='polite' aria-atomic='true'>{feedback}</div>
        </form>
    );
};

export default ContactForm;
