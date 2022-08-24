import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Dayjs } from "dayjs";

import { environment } from "environments/environment";
import { HTTP } from "@shared/interfaces/Http.interface";
import { DayOperations, Operation } from "@shared/interfaces/Operation.interface";
import { API_PATHS } from "@shared/enums/ApiPaths.enum";
import { OperationsStatistics } from "@shared/interfaces/OperationsStatistics.interface";

@Injectable({ providedIn: 'root' })
export class OperationsService {

  constructor(private http: HttpClient) {}

  getOperations(type: string, startDate: Dayjs, finishDate?: Dayjs): Observable<HTTP<DayOperations[]>> {
    return this.http.get<HTTP<DayOperations[]>>(`${environment.apiUrl}${API_PATHS.OPERATIONS}/${type}/${startDate}/${finishDate}`)
  }

  addOperation(operation: Operation): Observable<HTTP<Operation>> {
    return this.http.post<HTTP<Operation>>(`${environment.apiUrl}${API_PATHS.OPERATIONS}`, operation)
  }

  editOperation(id: string, operation: Operation): Observable<HTTP<Operation>> {
    return this.http.put<HTTP<Operation>>(`${environment.apiUrl}${API_PATHS.OPERATIONS}/${id}`, operation)
  }

  deleteOperation(id: string): Observable<HTTP<Operation>> {
    return this.http.delete<HTTP<Operation>>(`${environment.apiUrl}${API_PATHS.OPERATIONS}/${id}`)
  }

  getOperationsStatistics(type: string, startDate: Dayjs, finishDate?: Dayjs): Observable<HTTP<OperationsStatistics[]>> {
    return this.http.get<HTTP<OperationsStatistics[]>>(`${environment.apiUrl}${API_PATHS.STATISTICS}/${type}/${startDate}/${finishDate}`)
  }
}
