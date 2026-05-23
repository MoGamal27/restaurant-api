import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('follows')
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  @ApiOperation({ summary: 'Follow a restaurant' })
  follow(@Body() dto: CreateFollowDto) {
    return this.followsService.follow(dto);
  }
}