import { RolesGuard } from 'src/auth/roles.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  @Get('viewer')
  @UseGuards(RolesGuard('viewer'))
  @ApiBearerAuth()
  viewer() {
    return 'If you can see this, you are a viewer!';
  }

  @Get('editor')
  @UseGuards(RolesGuard('editor'))
  @ApiBearerAuth()
  editor() {
    return 'If you can see this, you are a editor!';
  }

  @Get('admin')
  @UseGuards(RolesGuard('admin'))
  @ApiBearerAuth()
  admin() {
    return 'If you can see this, you are a admin!';
  }
}
