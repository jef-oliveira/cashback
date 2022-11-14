export function toMonetaryString(number) {
  if (number !== null && number !== undefined)
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
}