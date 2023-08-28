import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 15, nullable: true })
  celular: string;

  @Column('simple-array', { nullable: true })
  conhecimentos: string[];

  @Column()
  validado: boolean;

  @Column({ default: 'Não validado' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  dataValidacao: Date;
}
