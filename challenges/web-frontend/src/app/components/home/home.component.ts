import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';
import { Auction } from 'src/app/dtos/auction.dto';
import { AuctionService } from 'src/app/services/auction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  auctions$: BehaviorSubject<Auction[]> = new BehaviorSubject([]);
  polling: any;
  loading: boolean = false;

  constructor(private auctionService: AuctionService) {
    setInterval(() => {}, 1000);
  }

  ngOnInit() {
    this.getAuctions();
    this.pollData();
  }

  trackById(auction: Auction) {
    return auction.id;
  }

  ngOnDestroy() {
    if (this.polling) {
      clearInterval(this.polling);
    }
  }

  pollData() {
    this.polling = setInterval(() => {
      this.getAuctions();
    },                         20 * 1000);
  }

  private getAuctions() {
    this.loading = true;
    this.auctionService
      .getActiveAuctions()
      .pipe(
        first(),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res) => {
        if (!!res) {
          this.auctions$.next(res.items);
        }
      });
  }
}
