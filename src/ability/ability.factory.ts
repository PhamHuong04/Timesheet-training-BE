import { Injectable } from '@nestjs/common';
import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Project } from '../project/entities/project.entity';
import { User as UserEntity } from '../user/entities/user.entity';

export enum Action {
  MANAGE_USER = 'manage user',
  MANAGE_PROJECT = 'manage project',
  READ = 'read',
}

export type Subjects = InferSubjects<
  typeof UserEntity | typeof Project | 'all'
>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.isAdmin) {
      can(Action.MANAGE_PROJECT, Project);
      can(Action.MANAGE_USER, UserEntity);
    } else if (user.isProjectManager) {
      cannot(Action.MANAGE_USER, UserEntity).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_PROJECT, Project).because(
        'You are not authorized to do this',
      );
    } else {
      can(Action.READ, UserEntity);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
