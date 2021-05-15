import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "remainTime",
})
export class RemainTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const now = new Date();
    const then = new Date(value);

    const ms = moment(then, "DD/MM/YYYY HH:mm:ss").diff(
      moment(now, "DD/MM/YYYY HH:mm:ss")
    );
    const duration = moment.duration(ms);
    const remainTime =
      Math.floor(duration.asHours()) + moment.utc(ms).format("[h]:mm[m]:ss[s]");
    return remainTime;
  }
}
