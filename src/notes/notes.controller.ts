import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';
import { NoteIdParam } from './dto/note-id.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll(@Session() session: UserSession) {
    return this.notesService.findAll(session.user.id);
  }

  @Get(':id')
  findOne(@Session() session: UserSession, @Param() { id }: NoteIdParam) {
    return this.notesService.findOne(session.user.id, id);
  }

  @Post()
  create(@Session() session: UserSession, @Body() dto: CreateNoteDTO) {
    return this.notesService.create(session.user.id, dto);
  }

  @Patch(':id')
  update(
    @Session() session: UserSession,
    @Param() { id }: NoteIdParam,
    @Body() dto: UpdateNoteDTO,
  ) {
    return this.notesService.update(session.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Session() session: UserSession, @Param() { id }: NoteIdParam) {
    return this.notesService.remove(session.user.id, id);
  }
}
