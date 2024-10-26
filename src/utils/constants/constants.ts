export const monthNames: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 
    'Maio', 'Junho', 'Julho', 'Agosto', 
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const dayNames: string[] = [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 
    'Quinta', 'Sexta', 'Sábado'
];

type PageTitles = {
    [key: string]: string
}
export const pagesTitle: PageTitles = {
    '/panel': 'Calendario',
    '/panel/clients': 'Clientes',
};