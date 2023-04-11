import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board, BoardStatus } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`board 에서 ${id}를 찾을 수 없습니다`);
    }
    return found;
  }
}
