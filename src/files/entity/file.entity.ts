import {Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('files')
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    key: string;

    @Column()
    path: string;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
    updated_at: Date;

    // TypeORM позволяет пользоваться softDelete, для этого создаем колонку
    @DeleteDateColumn({ select: false })
    deleted_at: Date;
}