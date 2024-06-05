/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../http";

export class CreditAplicationService {
  baseUrl: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_BASE_URL}`;
  }

  getCreditApplications() {
    return http.get(`${this.baseUrl}/creditPayroll/admon-allcreditrequests`);
  }
}
