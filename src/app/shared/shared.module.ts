import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ApiService } from './api/api.service';
import { FormsModule } from '@angular/forms';
import { ModalOpenerComponent } from './modal-opener/modal-opener.component';
import { UiKitModule } from 'projects/ui-kit/src/public-api';

@NgModule({
  declarations: [ModalOpenerComponent],
  imports: [CommonModule, FormsModule, UiKitModule],
  exports: [MaterialModule, FormsModule, UiKitModule],
  providers: [ApiService],
})
export class SharedModule {}
