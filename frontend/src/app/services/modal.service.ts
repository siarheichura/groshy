import { MODAL_WIDTH } from './../shared/constants/constants';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Injectable, TemplateRef, Component } from '@angular/core';
import { ModalConfig } from 'ng-zorro-antd/core/config';

@Injectable({ providedIn: 'root' })
export class ModalService {
  modal: NzModalRef;

  constructor(private modalService: NzModalService) {}

  printModal(title: string, content: TemplateRef<any>, params: unknown): void {
    this.modal = this.modalService.create({
      nzTitle: title,
      nzWidth: MODAL_WIDTH,
      nzContent: content,
      nzComponentParams: params,
      nzFooter: null,
    });
  }

  onOk() {}

  onCancel() {}

  closeModal(): any {} //return some data
}
