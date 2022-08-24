import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { user } from '@prisma/client'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard, RolesGuard } from 'src/auth/guard'
import { Role } from 'src/auth/enums'
import { Roles } from 'src/auth/decorator'

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('restaurant/:restaurantId')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  findAll(@Param('restaurantId') id: string) {
    return this.usersService.findAll(+id)
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
