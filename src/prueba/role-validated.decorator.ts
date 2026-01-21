import { SetMetadata } from '@nestjs/common';

export const RoleValidated = (...args: string[]) => SetMetadata('role-validated', args);
