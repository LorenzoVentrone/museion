export function validateField(field, value) {
  switch(field) {
    case 'country':
      if (!value || value.trim() === '') return 'Il paese è richiesto';
      return '';
    case 'zipcode':
      if (!value || value.trim() === '') return 'Il CAP è richiesto';
      // Esempio di validazione CAP (5 cifre)
      if (!/^\d{5}$/.test(value)) return 'CAP non valido';
      return '';
    case 'creditCard':
      if (!value || value.trim() === '') return 'Il numero della carta è richiesto';
      // Rimuove gli spazi e controlla che ci siano 16 cifre
      if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) return 'Numero carta non valido';
      return '';
    case 'expiry':
      if (!value || value.trim() === '') return 'La scadenza è richiesta';
      // Controlla il formato MM/AA
      if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) return 'Formato MM/AA richiesto';
      const [monthStr, yearStr] = value.split('/');
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = parseInt(String(now.getFullYear()).slice(-2), 10);
      if (year < currentYear || (year === currentYear && month < currentMonth)) return 'Carta scaduta';
      return '';
    case 'cvv':
      if (!value || value.trim() === '') return 'Il CVV è richiesto';
      if (!/^\d{3,4}$/.test(value)) return 'CVV non valido';
      return '';
    default:
      return '';
  }
}