import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorator'
import { Role } from '../enums'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }

    // console.log({ requiredRoles })


    const { user } = context.switchToHttp().getRequest()
    // console.log({ user })
    // console.log(requiredRoles.some(role => user.role[0] === role))
    // console.log(user.role)

    return requiredRoles.some(role => user.role[0] === role)
  }
}