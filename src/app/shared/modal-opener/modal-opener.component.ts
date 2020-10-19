import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalInfo } from '../types';

@Component({
  selector: 'app-modal-opener',
  template: '',
  styleUrls: ['./modal-opener.component.scss'],
})
export class ModalOpenerComponent<TComp, TData> implements OnInit {
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    const modalInfo = this.route.snapshot.data.modalInfo as ModalInfo<
      TComp,
      TData
    >;
    this.dialog.open(modalInfo.component, { data: modalInfo.data });
  }
}
