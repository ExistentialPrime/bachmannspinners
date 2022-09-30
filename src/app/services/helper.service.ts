import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/operators';
import { Cart } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient) { }


	// Send an email
	public async sendEmail(c: Cart): Promise<string> { 
		let result = 'Sending email...';
		let toAddresses = ['bachmanspinners@yahoo.com', c.contactEmail]; // bachmans + buyer
		let fromAddress = 'no-reply@bachmanspinners.com';
		let now = new Date();
		let datehour = '' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + now.getHours() + now.getMinutes();
		let subject = 'Bachman Spinners Order no. ' + datehour;
		let body = this.createEmailBody(c, datehour);
		// console.log('body string: ' + body);
		
		// await new Promise(resolve => setTimeout(resolve, 3000));
		// result = 'Success';

		let postdata = {'toAddresses': toAddresses, 'fromAddress': fromAddress, 'subject': subject, 'body': body};
		let postdatajson = JSON.stringify(postdata);
		// console.log(postdatajson);

		const url = `https://tlqaus4yoc2gosnwpcxhaitt4u0wdykx.lambda-url.us-east-2.on.aws/`;
		const header: HttpHeaders = new HttpHeaders();
    header.append('Accept', 'application/json');
		header.append('Content-Type', 'application/json');
		try {
			await this.http.post(url, postdatajson, { headers: header, responseType: 'json' })
			.toPromise()	
			.then(response => {
					console.log('response returned from lambda. response: ', response);
					result = this.handleSuccess(response);
					return result;
				}); // error caught in try block, otherwise could add .catch(error => {})
		}
		catch (error) { 
			console.log('error in sendemail: ', error);
			result = error;
		}
		finally {
			return result;
		}
	}


	/* Example success response 
	{
    "ResponseMetadata": {
        "RequestId": "77270d70-3da7-4e66-a038-5cee425794ad"
    },
    "MessageId": "010f018385e0b9ab-6159d14e-061f-4777-8f1c-444c5c4152aa-000000"
  }
  */
	private handleSuccess(response): string {
		let friendlyResponse = 'Generating friendly response';
		let jsonstring = JSON.stringify(response);
		console.log('response stringified ', jsonstring);
		if (jsonstring && jsonstring.includes('MessageId')) { friendlyResponse = 'Success'; }
		console.log('returning friendly response: ' + friendlyResponse);
		return friendlyResponse;
	}


	// Create email body from a cart object
	private createEmailBody(c: Cart, orderno: string): string {

		let itemsHtml: string = '';
		c.items.forEach(item => {
			itemsHtml += '<li>' + item.name + ' x' + item.qty + ' ($' + item.qtyPrice.toFixed(2) + ')</li>';
		});

		// <!-- Order Confirmation Email (sent to both the customer and the bachmans) -->
		// NOTE: Using base price, TAX NOT INCLUDED CURRENTLY! 
		let bodyEXAMPLE = `
			<h2 style="color: #2e6c80;">Bachman Spinners Order no. 12345678</h2>
			<p>Thank you for placing an order for Bachman Spinners. Because our spinners are hand made, orders may take some time to put together. 
			The Bachmans will be in contact with you to confirm the order and work out the next steps for payment and delivery. Please allow 1-2 business
			days for the response. If you have any concerns or issues, please contact bachmanspinners (at) yahoo (dot) com or reach out to them on Facebook. 
			Below are the details of your order.</p>
			<h2 style="color: #2e6c80;">Order Details:</h2>
			<ul>
			<li>Gold Hog Hunter x 2 ($11.00)</li>
			<li>Silver Hog Hunter x1 ($5.50)</li>
			<li>Total: $16.50</li>
			</ul>
			<h2 style="color: #2e6c80;">Contact Information:</h2>
			<ul>
			<li>Name:</li>
			<li>Email:</li>
			<li>Phone:</li>
			<li>Message:</li>
			<li>Delivery Type:</li>
			<li>Shipping Address:</li>
			<li>Payment Type:</li>
			<li>Payment Email:</li>
			</ul>`;

			let body = `<h2 style="color: #2e6c80;">Bachman Spinners Order no. ` + orderno + `</h2>
			<p>Thank you for placing an order for Bachman Spinners. Because our spinners are hand made, orders may take some time to put together. 
			A team member will be in contact with you to confirm the order and work out the next steps for payment and delivery. Please allow 1-2 business
			days for the response. If you have any concerns or issues, please contact bachmanspinners (at) yahoo (dot) com or reach out to them on Facebook. 
			Below are the details of your order.</p>
			<h2 style="color: #2e6c80;">Order Details:</h2>
			 <ul>` + itemsHtml + `
			  <li>Total: ` + c.totalBasePrice + `</li>
			 </ul>
			<h2 style="color: #2e6c80;">Contact Information:</h2>
			<ul>
			<li>Name: ` + c.contactName + `</li>
			<li>Email: ` + c.contactEmail + `</li>
			<li>Phone: ` + c.contactPhone + `</li>
			<li>Message: ` + c.message + `</li>
			<li>Delivery Type: ` + c.deliveryType + `</li>
			<li>Shipping Address: ` + c.shippingAddress + `</li>
			<li>Payment Type: ` + c.paymentType + `</li>
			<li>Payment Email: ` + c.paymentEmail + `</li>
			</ul>`;


		return body;
	}

  // Generate a random GUID (TODO: )
  public generateUUID() { // Public Domain/MIT
      let d = new Date().getTime();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
          d += performance.now(); // use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          // tslint:disable-next-line:no-bitwise
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          // tslint:disable-next-line:no-bitwise
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
          });
  }
}


/* Dev Reference Notes: 
 - how to create a lambda microservice or SES endpoint in aws that sends the email: https://aws.amazon.com/premiumsupport/knowledge-center/lambda-send-email-ses/
  - also https://stackoverflow.com/questions/64169956/invoke-aws-lambda-function-from-within-an-angular-application-using-http
 - angular in s3 connecting to lambda - https://towardsdatascience.com/full-stack-development-tutorial-integrate-aws-lambda-serverless-service-into-angular-spa-abb70bcf417f


*/
