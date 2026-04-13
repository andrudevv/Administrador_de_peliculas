import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "../dtos/genre-enum";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 30,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    description: string;

    @Column('int')
    year: number;

    @Column({
        type: 'varchar',
        length: 20,
    })
    director: string;

    @Column({
        type: 'enum',
        enum: Genre
    })
    genre: string;

    @Column('boolean', {
        default: false,
        nullable: true

    })
    favorite: boolean;



    @BeforeInsert()
    checkNameInsert() {

        this.name = this.name
            .toLowerCase()
            .replaceAll("'", '')

    }

    @BeforeUpdate()
    checkNameUpdate() {
        this.name = this.name
            .toLowerCase()
            .replaceAll("'", '')
    }

    @BeforeInsert()
    checkDescriptionInsert() {

        this.description = this.description
            .toLowerCase()
            .replaceAll("'", '')

    }

    @BeforeUpdate()
    checkDescriptionUpdate() {
        this.description = this.description
            .toLowerCase()
            .replaceAll("'", '')
    }

  
}