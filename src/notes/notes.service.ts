import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import { DB } from '../db/drizzle.db.module';
import type { Database } from '../db';
import { notes } from '../db/schema';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@Inject(DB) private readonly db: Database) {}

  findAll(userId: string) {
    return this.db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(desc(notes.createdAt));
  }

  async findOne(userId: string, id: number) {
    const [note] = await this.db
      .select()
      .from(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, userId)));

    if (!note) throw new NotFoundException('Note not found');

    return note;
  }

  async create(userId: string, dto: CreateNoteDTO) {
    const [note] = await this.db
      .insert(notes)
      .values({ ...dto, userId })
      .returning();

    return note;
  }

  async update(userId: string, id: number, dto: UpdateNoteDTO) {
    if (Object.values(dto).every((value) => value === undefined)) {
      throw new BadRequestException('Nothing to update');
    }

    const [note] = await this.db
      .update(notes)
      .set(dto)
      .where(and(eq(notes.id, id), eq(notes.userId, userId)))
      .returning();

    if (!note) throw new NotFoundException('Note not found');

    return note;
  }

  async remove(userId: string, id: number) {
    const [note] = await this.db
      .delete(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, userId)))
      .returning();

    if (!note) throw new NotFoundException('Note not found');

    return {
      deleted: true,
    };
  }
}
