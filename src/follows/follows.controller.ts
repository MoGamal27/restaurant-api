import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  follow(@Body() dto: CreateFollowDto) {
    return this.followsService.follow(dto);
  }
}