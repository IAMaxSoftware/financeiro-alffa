

export type keyBoardInputEvent = React.KeyboardEvent<HTMLInputElement>;
export const saidaGraficos: string = '#EB4D5C';
export const entradaGraficos: string = '#53B987';

export function getFirstDayOfCurrentMonth(): Date {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return firstDayOfMonth;
}

export function formatarNumeroVigula(numero: number) {
    console.log(numero);
    return numero.toFixed(2).replace('.', ',');
}
export function formatarNumeroMoedaReal(numero: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        numero,
    );
}
