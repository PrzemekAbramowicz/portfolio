export const validateContactField = (name, rawValue) => {
    const value = rawValue.trim();
    if (name === 'name') {
        if (!value) return 'Podaj swoje imię.';
        if (value.length > 100) return 'Imię może mieć maksymalnie 100 znaków.';
    }
    if (name === 'email') {
        if (!value) return 'Podaj adres e-mail, żebym mógł odpowiedzieć.';
        if (value.length > 254 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value)) {
            return 'Wpisz poprawny adres e-mail, np. anna@example.com.';
        }
    }
    if (name === 'phone' && value) {
        const digits = value.replace(/\D/g, '');
        if (!/^\+?[\d\s().-]+$/.test(value) || digits.length < 7 || digits.length > 15 || value.length > 30) {
            return 'Podaj poprawny numer telefonu, np. +48 511 003 345, lub zostaw pole puste.';
        }
    }
    if (name === 'message') {
        if (!value) return 'Napisz kilka słów o swoim pomyśle lub pytaniu.';
        if (value.length > 5000) return 'Wiadomość może mieć maksymalnie 5000 znaków.';
    }
    return '';
};
