import { Injectable, NotFoundException } from '@nestjs/common';
// import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardStatus } from './entities/board.entity';
import { BoardsRepository } from './boards.repository';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async getAllBoardsByUserId(user: User): Promise<Board[]> {
    const query = this.boardsRepository.createQueryBuilder('board'); // board 테이블에서
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardsRepository.createBoard(createBoardDto, user);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardsRepository.getBoardById(id);
  }

  async deletBoardById(id: number): Promise<void> {
    const result = await this.boardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Boards 에서 삭제하려는 id = ${id} 를 찾을 수 없습니다`,
      );
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    await this.boardsRepository.save(board);

    return board;
  }

  /* 
  // 로컬
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);
    if (!found) {
      throw new NotFoundException(`해당 아이디를 찾을 수 없습니다 id = ${id}`);
    }
    return this.boards.find((board) => board.id === id);
  }

  deleteBoardById(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  } 
  */
}
