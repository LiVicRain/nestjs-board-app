import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardsRepository } from './boards.repository';
import { AuthModule } from 'src/auth/auth.module';
// import { BoardRepository } from './repositories/board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository],
})
export class BoardsModule {}
