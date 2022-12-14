import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AddressBean, CartItemBean, CountriesBean, CustomerBean, OrderBean, OrderItemBean, PurchaseOrderBean, StatesBean } from 'src/app/beans/Beans';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { ProductsListService } from 'src/app/services/products-list.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

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
  cartItems: CartItemBean[] = [];

  totalPrice = 0.00;
  totalQuantity = 0

  checkoutForm!: FormGroup;

  ngOnInit(): void {

    this.routeToProductsIfCartEmpty()

    this.checkoutForm = this.formBuilder.group({
      customerDetails: this.formBuilder.group({
        firstName: new FormControl("", [Validators.required, Validators.minLength(4), CustomValidators.notOnlyWhitespace]),
        lastName: new FormControl("", [Validators.required, Validators.minLength(4), CustomValidators.notOnlyWhitespace]),
        email: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$')]),
        mobileNumber: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      }),
      shippingDetails: this.formBuilder.group({
        country: new FormControl("", [Validators.required]),
        state: new FormControl("", [Validators.required]),
        city: new FormControl("", [Validators.required, CustomValidators.notOnlyWhitespace]),
        street: new FormControl("", [Validators.required, CustomValidators.notOnlyWhitespace]),
        zipCode: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{6}$'), CustomValidators.notOnlyWhitespace]),
      }),
      cardDetails: this.formBuilder.group({
        nameOnCard: new FormControl("", [Validators.required, CustomValidators.notOnlyWhitespace]),
        cardNumber: new FormControl("", [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
        cvvNumber: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
        expiryMonth: new FormControl("", [Validators.required]),
        expiryYear: new FormControl("", [Validators.required])
      })
    })

    //! Card Month & Year Details
    let currentMonth = new Date().getMonth() + 1

    this.formService.getCreditCardMonths(currentMonth).subscribe(data => {
      this.creditCardMonth = data;
    })

    this.formService.getCreditCardYear().subscribe(data => {
      this.creditCardYear = data;
    })

    //! Country & State Details
    this.formService.getAllCountries().subscribe(data => {
      this.countries = data;
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

  get nameOnCard() { return this.checkoutForm.get('cardDetails.nameOnCard') }
  get cardNumber() { return this.checkoutForm.get('cardDetails.cardNumber') }
  get cvvNumber() { return this.checkoutForm.get('cardDetails.cvvNumber') }
  get expiryMonth() { return this.checkoutForm.get('cardDetails.expiryMonth') }
  get expiryYear() { return this.checkoutForm.get('cardDetails.expiryYear') }

  displayCorrectMonth(event: Event | any) {

    let creditCardFormGroup = this.checkoutForm.get('cardDetails')
    let currentYear = new Date().getFullYear();
    let selectedYear = Number(creditCardFormGroup?.value.expiryYear)
    let startMonth: number

    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1
    }
    else {
      startMonth = 1
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(data => {
      this.creditCardMonth = data;
    })
  }

  displayCorrectStates() {

    let selectedCountry = this.checkoutForm.get("shippingDetails")?.get("country")?.value

    this.formService.getCountryStates(selectedCountry).subscribe(data => {
      console.log(data.states);
      let countryState = data.states
      this.states = countryState
    })

  }

  onPlacingOrder() {

    console.log(this.checkoutForm.value);

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


    this.checkoutService.placeOrder(purchase).subscribe({
      next: (v) => {
        this.orderid = v
        // console.log(v)
      },
      error: (e) => console.error(e),
      complete: () => {

        let myModal = new bootstrap.Modal(document.getElementById('successModal')!, {});
        myModal.show();

        console.info('complete')
      }
    });

  }

  resetForm(){ 
    
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.cartItems = [];

    this.checkoutForm.reset()

    this.router.navigate(['/home/products'])
  }

  routeToProductsIfCartEmpty() {

    let price;

    this.cartService.totalPrice.subscribe(data => { price = data})
    
    if(price == 0){
    this.router.navigate(['/home/products'])
    }

  }

}
