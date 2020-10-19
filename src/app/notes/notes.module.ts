import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { SharedModule } from '../shared/shared.module';
import { NotesRoutingModule } from './notes-routing.module';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { NotesDataService } from './notes-data.service';
import { RouterModule } from '@angular/router';
import { NoteResolver } from './note-resolver.service';

@NgModule({
  declarations: [NoteListComponent, NoteEditorComponent],
  imports: [CommonModule, SharedModule, NotesRoutingModule, RouterModule],
  providers: [NotesDataService, NoteResolver],
})
export class NotesModule {}
