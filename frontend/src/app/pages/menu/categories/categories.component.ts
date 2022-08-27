import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { NzModalService } from 'ng-zorro-antd/modal'

import {
  CategoriesFormModalComponent,
} from '@pages/menu/categories-form-modal/categories-form-modal.component'
import { expenseCategoriesSelector, incomeCategoriesSelector } from '@store/categories/categories.selectors'
import { AddCategory, DeleteCategory, EditCategory, GetUserCategories } from '@store/categories/categories.actions'
import { Category } from '@shared/interfaces/Category.interface'
import { MODAL_WIDTH } from '@shared/constants/constants'
import { OPERATION_TYPES } from '@shared/enums/OperationTypes.enum'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  expenseCategories$: Observable<Category[]> = this.store.select(expenseCategoriesSelector)
  incomeCategories$: Observable<Category[]> = this.store.select(incomeCategoriesSelector)

  constructor(
    private store: Store,
    private modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(GetUserCategories({ payload: { type: OPERATION_TYPES.ALL } }))
  }

  addCategory(category: Category): void {
    this.store.dispatch(AddCategory({ payload: category }))
  }

  editCategory(categoryId: string, category: Category): void {
    this.store.dispatch(EditCategory({ payload: { categoryId, category } }))
  }

  deleteCategory(categoryId: string): void {
    this.store.dispatch(DeleteCategory({ payload: { categoryId } }))
  }

  printAddCategoryModal(type: string): void {
    const modal = this.modal.create({
      nzTitle: 'Add category',
      nzWidth: MODAL_WIDTH,
      nzContent: CategoriesFormModalComponent,
    })

    modal.afterClose.subscribe(res => {
      if (res) {
        this.addCategory({ ...res, type })
      }
    })
  }

  printEditCategoryModal(category: Category): void {
    const modal = this.modal.create({
      nzTitle: 'Edit category',
      nzWidth: MODAL_WIDTH,
      nzContent: CategoriesFormModalComponent,
      nzComponentParams: { category },
    })

    modal.afterClose.subscribe(res => {
      const updatedCategory = { ...category, emoji: res.emoji, name: res.name }
      if (res) {
        this.editCategory(category.id, updatedCategory)
      }
    })
  }

  printDeleteCategoryConfirmModal(event: Event, id: string): void {
    event.preventDefault()
    event.stopPropagation()
    this.modal.confirm({
      nzTitle: 'Are you sure?',
      nzOnOk: () => this.deleteCategory(id),
    })
  }
}
