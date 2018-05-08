import { Injectable } from '@angular/core';

@Injectable()
export class PrintService {

  public print(printEl: HTMLElement) {

    let popupWinindow;
    popupWinindow = window.open('', '_blank', 'width=400,height=200,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head></head><body onload="window.print()">' + printEl + '</html>');
    popupWinindow.document.close();
  }
}
