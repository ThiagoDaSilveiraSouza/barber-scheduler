/**
 * Formata uma data para o padrão brasileiro (dd/mm/aaaa)
 * @param date Data a ser formatada (string ou objeto Date)
 * @returns String formatada no padrão brasileiro
 */
export const formatDateToBrazilian = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Obtém dia, mês e ano
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
  const year = dateObj.getFullYear();
  
  // Retorna no formato dd/mm/aaaa
  return `${day}/${month}/${year}`;
};

/**
 * Converte uma data no formato brasileiro (dd/mm/aaaa) para o formato ISO (aaaa-mm-dd)
 * @param brDate Data no formato brasileiro
 * @returns Data no formato ISO
 */
export const convertBrazilianDateToISO = (brDate: string): string => {
  const [day, month, year] = brDate.split('/');
  return `${year}-${month}-${day}`;
};