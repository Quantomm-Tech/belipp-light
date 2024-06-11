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

  getCreditApplicationDetail(requestId: string) {
    return http.get(
      `${this.baseUrl}/creditPayroll/admon-creditinformation?requestId=${requestId}`
    );
  }

  updateCreditApplication(body: any) {
    return http.post(
      `${this.baseUrl}/creditPayroll/admon-creditinformation/disbursement`,
      body
    );
  }
}
