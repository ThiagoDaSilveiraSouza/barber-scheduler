export const formatPhoneNumber = (value: string) => {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  
  // Aplica a máscara (XX) XXXXX-XXXX
  return numbers.replace(
    /^(\d{0,2})(\d{0,5})(\d{0,4})/,
    (_, g1, g2, g3) => {
      let result = '';
      if (g1) result += `(${g1}`;
      if (g2) result += `) ${g2}`;
      if (g3) result += `-${g3}`;
      return result;
    }
  );
};

export const formatPrice = (value: string) => {
  // Remove todos os caracteres não numéricos exceto ponto
  const cleanValue = value.replace(/[^\d.]/g, '');
  
  // Garante que só existe um ponto decimal
  const parts = cleanValue.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts[1];
  }
  
  // Limita a duas casas decimais
  if (parts.length === 2 && parts[1].length > 2) {
    return parts[0] + '.' + parts[1].slice(0, 2);
  }
  
  return cleanValue;
};