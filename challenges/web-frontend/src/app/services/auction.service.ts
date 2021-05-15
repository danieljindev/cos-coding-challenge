import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAuctionsDTO } from '../dtos/auction.dto';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  constructor(private httpClient: HttpClient) {}

  getActiveAuctions() {
    return this.httpClient.get<GetAuctionsDTO>(
      `${environment.api_url}/api/v2/auction/buyer/`
    );
  }
}
