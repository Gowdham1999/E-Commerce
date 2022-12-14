import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AddressBean, CartItemBean, CountriesBean, CustomerBean, OrderBean, OrderItemBean, PaymentInfoBean, PurchaseOrderBean, StatesBean } from 'src/app/beans/Beans';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { ProductsListService } from 'src/app/services/products-list.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {


  //! STRIPE CODE
  paymentInfo: PaymentInfoBean = new PaymentInfoBean();
  stripe = Stripe(environment.stripePublishableKey)
  cardElement: any
  displayError: any = ''

  constructor(private productsListService: ProductsListService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  orderid: string | any = ''

  creditCardMonth: number[] = [];
  creditCardYear: number[] = [];

  countries: CountriesBean[] = [];
  states: any = []
  selectedCountryCode: any
  cartItems: CartItemBean[] = [];

  totalPrice = 0.00;
  totalQuantity = 0

  submitButtonDisabled = false

  checkoutForm!: FormGroup;

  ngOnInit(): void {

    this.routeToProductsIfCartEmpty()

    this.stripePaymentForm()

    this.checkoutForm = this.formBuilder.group({
      customerDetails: this.formBuilder.group({
        firstName: new FormControl("", [Validators.required, Validators.minLength(4), CustomValidators.notOnlyWhitespace]),
        lastName: new FormControl("", [Validators.required, Validators.minLength(4), CustomValidators.notOnlyWhitespace]),
        email: new FormControl({ value: sessionStorage.getItem('userEmail'), disabled: false }, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$')]),
        mobileNumber: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      }),
      shippingDetails: this.formBuilder.group({
        country: new FormControl("", [Validators.required]),
        state: new FormControl("", [Validators.required]),
        city: new FormControl("", [Validators.required, CustomValidators.notOnlyWhitespace]),
        street: new FormControl("", [Validators.required, CustomValidators.notOnlyWhitespace]),
        zipCode: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{6}$'), CustomValidators.notOnlyWhitespace]),
        description: new FormControl("", [Validators.required, CustomValidators.notOnlyWhitespace]),
      }),
      creditCard: this.formBuilder.group
    })


    //! Country & State Details
    this.formService.getAllCountries().subscribe(data => {
      this.countries = data;

      console.log(this.countries);

    })

    this.formService.getAllStates().subscribe(data => {
      this.states = data;
    })

    //! Cart Details
    this.cartService.totalPrice.subscribe(totalPrice => this.totalPrice = +totalPrice.toFixed(2))

    this.cartService.totalQuantity.subscribe(totalQuantity => this.totalQuantity = totalQuantity)

    // this.cartService.computeCartTotal() This is not needed as we used Replay Subject in cart.service file.
  }


  get firstName() { return this.checkoutForm.get('customerDetails.firstName') }
  get lastName() { return this.checkoutForm.get('customerDetails.lastName') }
  get email() { return this.checkoutForm.get('customerDetails.email') }
  get mobileNumber() { return this.checkoutForm.get('customerDetails.mobileNumber') }

  get country() { return this.checkoutForm.get('shippingDetails.country') }
  get state() { return this.checkoutForm.get('shippingDetails.state') }
  get city() { return this.checkoutForm.get('shippingDetails.city') }
  get street() { return this.checkoutForm.get('shippingDetails.street') }
  get zipCode() { return this.checkoutForm.get('shippingDetails.firstName') }
  get description() { return this.checkoutForm.get('shippingDetails.firstName') }

  //! STRIPE CODE
  stripePaymentForm() {

    var elements = this.stripe.elements()

    this.cardElement = elements.create('card', { hidePostalCode: true });

    // Add an instance of card UI component into the 'card-element' div
    this.cardElement.mount('#card-element');

    // Add event binding for the 'change' event on the card element
    this.cardElement.on('change', (event: any) => {

      // get a handle to card-errors element
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        // show validation error to customer
        this.displayError.textContent = event.error.message;
      }

    });


  }


  displayCorrectStates() {

    let selectedCountry = this.checkoutForm.get("shippingDetails")?.get("country")?.value

    this.formService.getCountryStates(selectedCountry).subscribe(data => {
      console.log(data);
      this.selectedCountryCode = data.code
      console.log(this.selectedCountryCode);
      let countryState = data.states
      this.states = countryState
    })

  }

  onPlacingOrder() {

    console.log(this.checkoutForm.value);

    this.checkoutForm

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched()
      return
    }

    let order = new OrderBean(this.totalPrice, this.totalQuantity);

    console.log(order);


    const cartItems: CartItemBean[] = this.cartService.cartItems
    let orderItems: OrderItemBean[] = cartItems.map(item => new OrderItemBean(item))

    const customerForm = this.checkoutForm.get('customerDetails')
    const shippingForm = this.checkoutForm.get('shippingDetails')

    const firstName = customerForm?.get('firstName')?.value
    const lastName = customerForm?.get('lastName')?.value
    const email = customerForm?.get('email')?.value
    const mobileNumber = customerForm?.get('mobileNumber')?.value

    const customer = new CustomerBean(firstName, lastName, email, mobileNumber)

    const street = shippingForm?.get('street')?.value
    const city = shippingForm?.get('city')?.value
    const state = shippingForm?.get('state')?.value
    const country = shippingForm?.get('country')?.value
    const zipCode = shippingForm?.get('zipCode')?.value

    const address = new AddressBean(street, city, state, country, zipCode)

    let purchase = new PurchaseOrderBean(customer, address, order, orderItems)

    // this.checkoutService.placeOrder(purchase).subscribe(data => console.log(data));

    this.paymentInfo.amount = Math.round(this.totalPrice * 100);//* 80 - Include this for usd to inr conversion
    this.paymentInfo.currency = "USD";
    this.paymentInfo.description = this.checkoutForm.get("shippingDetails.description")?.value;
    this.paymentInfo.receiptEmail = purchase.customer.email;


    console.log(this.paymentInfo.amount);


    // if valid form then
    // - create payment intent
    // - confirm card payment
    // - place order

    if (!this.checkoutForm.invalid && this.displayError.textContent === "") {

      this.submitButtonDisabled = true

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        paymentIntentResponse => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret, {
            payment_method: {
              card: this.cardElement,
              billing_details: {
                email: purchase.customer.email,
                name: `${purchase.customer.firstName} ${purchase.customer.lastName}`,
                address: {
                  line1: purchase.shippingAddress.street,
                  city: purchase.shippingAddress.city,
                  state: purchase.shippingAddress.state,
                  postal_code: purchase.shippingAddress.zipCode,
                  country: this.selectedCountryCode
                }
              }
            }
          }, { handleActions: false })
            .then((result: any) => {
              if (result.error) {
                alert(result.error.message)
                this.submitButtonDisabled = false

              } else {
                this.checkoutService.placeOrder(purchase).subscribe({
                  next: (response: any) => {
                    console.log(response)
                    this.orderid = response.orderTrackingNumber
                    // alert(this.orderid)
                    this.submitButtonDisabled = false

                  },

                  error: (err: any) => {
                    alert(err.message)
                    this.submitButtonDisabled = false

                  },

                  complete: () => {
                    let myModal = new bootstrap.Modal(document.getElementById('successModal')!, {});
                    myModal.show();

                    console.info('complete')
                    this.submitButtonDisabled = false
                    this.resetForm()
                  }
                })
              }
            })
        }
      )


    }
    else {
      this.checkoutForm.markAllAsTouched()
      return
    }


  }

  resetForm() {

    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.cartItems = [];

    this.cartService.persistCartTotal()

    this.checkoutForm.reset()

    this.router.navigate(['/home/products'])
  }

  routeToProductsIfCartEmpty() {

    let price;

    this.cartService.totalPrice.subscribe(data => { price = data })

    if (price == 0) {
      this.router.navigate(['/home/products'])
    }

  }

}
