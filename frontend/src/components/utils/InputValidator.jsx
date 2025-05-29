export function validateField(field, value) {
  switch(field) {
    case 'country':
      if (!value || value.trim() === '') return 'Country is required';
      return '';
    case 'name':
      if (!value || value.trim() === '') return 'First/Last name required';
      return '';
    case 'city':
      if (!value || value.trim() === '') return 'City is required';
      return '';
    case 'address':
      if (!value || value.trim() === '') return 'Address is required';
      if (value.trim().length < 5) return 'Insert a valid address';
      return '';
    case 'province':
      if (!value || value.trim() === '') return 'Province is required';
      if (value.length < 2 || value.length > 3) return 'Invalid province (e.g. RM)';
      return '';
    case 'zipcode':
      if (!value || value.trim() === '') return 'Zip code is required';
      if (!/^\d{5}$/.test(value)) return 'Invalid zip code';
      return '';
    case 'creditCard':
      if (!value || value.trim() === '') return ' Credit card number is required';
      if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) return 'Invalid card number';
      return '';
    case 'expiry':
      if (!value || value.trim() === '') return 'Expire date is required';
      if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) return 'Required format MM/AA ';
      const [monthStr, yearStr] = value.split('/');
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = parseInt(String(now.getFullYear()).slice(-2), 10);
      if (year < currentYear || (year === currentYear && month < currentMonth)) return 'Credit card expired';
      return '';
    case 'cvv':
      if (!value || value.trim() === '') return 'CVV is required';
      if (!/^\d{3,4}$/.test(value)) return 'Invalid CVV';
      return '';
    default:
      return '';
  }
}
