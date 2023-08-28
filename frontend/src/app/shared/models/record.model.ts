export interface Record {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  celular: string;
  validado: boolean | null;
  conhecimentos: string[];
  status: 'Validado' | 'Não validado' | null;
  dataValidacao: Date | null;
}
