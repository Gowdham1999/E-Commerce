export class ProductBean {

   constructor(
      public id: number,
      public sku: string,
      public name: string,
      public description: string,
      public unitPrice: number,
      public imageUrl: string,
      public active: boolean,
      public unitsInStock: number,
      public dateCreated: Date,
      public lastUpdated: Date

   ) { }

}

export class CategoryBean {

   constructor(
      public id: number,
      public categoryName: string,
      public products: ProductBean[]
   ) { }

}


export class ProductReturnType {

   constructor(
      public products: ProductBean[],
      public totalDataCount: number,
   ) { }

}

export class CartItemBean {

   id: number
   name: string
   imageUrl: string
   unitPrice: number
   quantity: number

   constructor(product: ProductBean) {

      this.id = product.id
      this.name = product.name
      this.imageUrl = product.imageUrl
      this.unitPrice = product.unitPrice

      this.quantity = 1
   }

}

export class CountriesBean {

   constructor(
      public id: number,
      public code: string,
      public name: string,
      public states: StatesBean[]
   ) { }

}

export class StatesBean {

   constructor(
      public id: number,
      public name: string,
   ) { }

}

export class CustomerBean {
   constructor(
      public firstName: string,
      public lastName: string,
      public email: string,
      public mobileNumber: number,
   ) { }
}

export class OrderBean {
   constructor(
      public totalPrice: number,
      public totalQuantity: number,
   ) { }
}

export class OrderItemBean {

   imageUrl: string;
   unitPrice: number;
   quantity: number;
   productId: number;

   constructor(cartItem: CartItemBean) {

      this.imageUrl = cartItem.imageUrl;
      this.unitPrice = cartItem.unitPrice;
      this.quantity = cartItem.quantity;
      this.productId = cartItem.id;

   }
}

export class AddressBean {
   constructor(
      public street: string,
      public city: string,
      public state: string,
      public country: string,
      public zipCode: string,
   ) { }
}


export class PurchaseOrderBean {
   constructor(
      public customer: CustomerBean,
      public shippingAddress: AddressBean,
      public order: OrderBean,
      public orderItems: OrderItemBean[],
   ) { }
}

export class OrderHistory_OrderBean {

   constructor(
      public orderTrackingNumber: string,
      public totalPrice: string,
      public totalQuantity: string,
      public status: string,
      public dateCreated: string,
      public lastUpdated: string,
      public orderItems: OrderItemBean[]
   ) { }

}

export class OrderHistoryReturnBean {

   constructor(public orders: OrderHistory_OrderBean, public totalElements: number) { }

}


export class PaymentInfoBean {

   amount?: number;
   currency?: string;
   description?: string;
   receiptEmail?: string;

}