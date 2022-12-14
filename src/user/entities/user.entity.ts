import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // select: false
  @Column({ nullable: false })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isProjectManager: boolean;
}
