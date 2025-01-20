export function slugfy(text: string): string {
  return text
    .toLowerCase() // Converte para minúsculas
    .normalize("NFD") // Normaliza para decompor acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .trim() // Remove espaços extras no início/fim
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-"); // Remove múltiplos hífens consecutivos
}
