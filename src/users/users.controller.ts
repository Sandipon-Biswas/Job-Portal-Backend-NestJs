import { Body, Controller, Get, Patch, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Profile of the logged-in user
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    return this.usersService.findById(req.user.sub);
  }

  // Update my profile
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(@Req() req: any, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(req.user.sub, dto);
  }

  // Admin-only list (preview for Step 5)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async listAll() {
    return this.usersService.listAll();
  }

  // Update photo
  @UseGuards(JwtAuthGuard)
  @Patch('photo')
  @UseInterceptors(FileInterceptor('file'))
  async updatePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
  ) {
    if (!file) throw new Error('No file uploaded');
    const url = file.path || file.filename || file.originalname; // placeholder if not using cloud
    return this.usersService.updatePhoto(userId, url);
  }

  // Update CV
  @UseGuards(JwtAuthGuard)
  @Patch('cv')
  @UseInterceptors(FileInterceptor('file'))
  async updateCv(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
  ) {
    if (!file) throw new Error('No file uploaded');
    const url = file.path || file.filename || file.originalname; // placeholder if not using cloud
    return this.usersService.updateCv(userId, url);
  }
}
