import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { map, switchMap } from 'rxjs'
import * as CategoriesActions from './categories.actions'
import { CategoriesService } from '@services/categories.service'
import { OPERATION_TYPES } from '@shared/enums/OperationTypes.enum'

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
  ) {
  }

  getUserCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.GetUserCategories),
      switchMap(({ payload }) =>
        this.categoriesService.getUserCategories(payload.type).pipe(
          map(data => CategoriesActions.GetUserCategoriesSuccess({ payload: data.data })),
        ),
      ),
    )
  })

  addCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.AddCategory),
      switchMap(({ payload }) =>
        this.categoriesService.addCategory(payload).pipe(
          map(data => CategoriesActions.GetUserCategories({ payload: { type: OPERATION_TYPES.ALL } })),
        ),
      ),
    )
  })

  editCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.EditCategory),
      switchMap(({ payload }) =>
        this.categoriesService.editCategory(payload.categoryId, payload.category).pipe(
          map(data => CategoriesActions.GetUserCategories({ payload: { type: OPERATION_TYPES.ALL } })),
        ),
      ),
    )
  })

  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.DeleteCategory),
      switchMap(({ payload }) =>
        this.categoriesService.deleteCategory(payload.categoryId).pipe(
          map(data => CategoriesActions.GetUserCategories({ payload: { type: OPERATION_TYPES.ALL } })),
        ),
      ),
    )
  })
}

