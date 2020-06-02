import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private nonActionSnackBar: MatSnackBar) { }

  public alertSanckBar(snackType: SnackBarType) {
    if (snackType === SnackBarType.RFPDicFinish) {
      this.openSnackBar('조합에 문제가 없습니다.', `종료`, 3000);
    } else if (snackType === SnackBarType.RFPDicFail) {
      return this.openSnackBarAction('조합에 문제가있습니다\n 형태소를 추가해주세요!', `확인하기`, 5000);
    }
  }
  private openSnackBar(command, actionStr: string, duration) {
    this.nonActionSnackBar.open(command, actionStr, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
  private openSnackBarAction(command, actionStr: string, duration) {
    return this.nonActionSnackBar.open(command, actionStr, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}

export enum SnackBarType {
  RFPDicFinish,
  RFPDicFail
}



