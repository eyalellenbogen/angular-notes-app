import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalOpenerComponent } from '../shared/modal-opener/modal-opener.component';
import { NoteGuard } from './note-guard.service';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteResolver } from './note-resolver.service';
const routes: Routes = [
  {
    path: '',
    component: NoteListComponent,
    children: [
      {
        path: 'edit/:noteId',
        canActivate: [NoteGuard],
        resolve: { modalInfo: NoteResolver },
        component: ModalOpenerComponent,
      },
      {
        path: 'new',
        component: ModalOpenerComponent,
        resolve: { modalInfo: NoteResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class NotesRoutingModule {}
