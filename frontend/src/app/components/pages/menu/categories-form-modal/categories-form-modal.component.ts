import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzModalRef } from 'ng-zorro-antd/modal'
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji'

import { markFormControlsDirty } from '@shared/helpers/form.helper'
import { Category } from '@shared/interfaces/Category.interface'

enum FormControlsEnum {
  EMOJI = 'emoji',
  NAME = 'name',
}

@Component({
  selector: 'app-categories-form-modal',
  templateUrl: './categories-form-modal.component.html',
  styleUrls: ['./categories-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesFormModalComponent implements OnInit {
  FORM_CONTROLS = FormControlsEnum

  @Input() category: Category
  categoryForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.initCategoryForm()
    this.updateModalConfig()
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      [this.FORM_CONTROLS.EMOJI]: [this.category ? this.category.emoji : '💰'],
      [this.FORM_CONTROLS.NAME]: [this.category ? this.category.name : '', Validators.required],
    })
  }

  onEmojiSelect(event: EmojiEvent): void {
    this.categoryForm.patchValue({emoji: event.emoji.native})
  }

  updateModalConfig(): void {
    this.modal.updateConfig({
      nzOnOk: () => {
        if (this.categoryForm.valid) {
          return this.categoryForm.value
        } else {
          markFormControlsDirty(this.categoryForm)
          return false
        }
      }
    })
  }
}
