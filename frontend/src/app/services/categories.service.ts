import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "environments/environment";
import { HTTP } from "@shared/interfaces/Http.interface";
import { Category } from "@shared/interfaces/Category.interface";

const API_PATH_CATEGORIES = '/categories'
const API_PATH_BASIC_CATEGORIES = '/basiccategories'

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getBasicCategories(type: string): Observable<HTTP<Category[]>> {
    return this.http.get<HTTP<Category[]>>(`${environment.apiUrl}${API_PATH_BASIC_CATEGORIES}/${type}`)
  }

  getUserCategories(type: string): Observable<HTTP<Category[]>> {
    return this.http.get<HTTP<Category[]>>(`${environment.apiUrl}${API_PATH_CATEGORIES}/${type}`)
  }

  addCategory(category: Category): Observable<HTTP<Category>> {
    return this.http.post<HTTP<Category>>(`${environment.apiUrl}${API_PATH_CATEGORIES}`, category)
  }

  editCategory(categoryId: string, category: Category): Observable<HTTP<Category>> {
    return this.http.put<HTTP<Category>>(`${environment.apiUrl}${API_PATH_CATEGORIES}/${categoryId}`, category)
  }

  deleteCategory(categoryId: string): Observable<HTTP<Category>> {
    return this.http.delete<HTTP<Category>>(`${environment.apiUrl}${API_PATH_CATEGORIES}/${categoryId}`)
  }
}
