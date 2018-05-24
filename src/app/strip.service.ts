import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {


private actionUrl: string;
private headers: Headers;
private options: RequestOptions;
constructor(private http: Http) { }

result: any;

testingMethod(data: any) {
const params: URLSearchParams = new URLSearchParams();
params.set('data', data);
const requestOptions = new RequestOptions();
requestOptions.search = params;

console.log('=======================service method called==================');
return this.http.post('http://localhost:5000/sendMailReceipt', data).map(results => this.result = results);
}

getStripeData(id: any) {
const params: URLSearchParams = new URLSearchParams();
params.set('data', id);
const requestOptions = new RequestOptions();
requestOptions.search = params;

console.log('=======================service stripe method called==================');
return this.http.get('https://stripepaymentdonation.herokuapp.com/stripe'
, requestOptions).map(function(result) {
return (result.json());
});
}

getallcharges() {
    console.log('=======================service stripe method called==================');
    return this.http.get('http://localhost:5000/allCharges').map(function(result) {
        console.log('HIII THERE');
        return (result.json());
    });
    }
}
