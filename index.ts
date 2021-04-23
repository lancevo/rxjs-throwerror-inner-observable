import { interval, Observable, of, Subject, throwError } from 'rxjs'; 
import { catchError, finalize, map, mergeMap, take, takeUntil } from 'rxjs/operators';


const myLog = (prefix) => {
  return (...args) => {
    console.log(prefix, args.join(' '));
  }
}

const logA =  myLog('A - ')

interval(1000)
.pipe(
  mergeMap( (i) => {
    if (i===2) return throwError('stop at 2');
    return of(i);
  }),
  catchError((msg)=>{
    return throwError(' passed thru catchError - ' + msg)
  }),
  finalize(()=>{
    logA('finalize(): im completed or error');
  }),
  take(5),
).subscribe(msg => {
  // console.log('subscribe: '+ msg);
  logA('subscriber():', msg);
  },(err) => {
  console.error('A - subscriber\'s error(): ' + err)
});