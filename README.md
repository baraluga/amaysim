# amaysim

Amaysim's Engineering Technical Test (Cart) Solution

## Technologies used:

1. Typescript - Core
2. RxJS - Core
3. Angular8 - UI
4. Firebase - Hosting

### Wait, I thought we said "do not use any framework"??

True. But as a Software Engineer, I've come to realized that I solve problems using the best tools (that I know of) at hand rather than pure coding. Besides, at my solution's core, I've only used Typescript - which is a flavor of JS - and slight RxJS (for reactivity convenience). Without RxJS, I'd most probably write my own lite-implementation of that to aide in the GUI.

### Pfft. Okay, how did you "solve" it then?

At a high level, I created a singleton service called, "ShoppingCartFacade" that provides a single instance of ShoppingCart(pricingRules). It shall also provide the function to add new items and apply/clear a promo code while asynchronously providing the total value, running payable price, and the current items.

### Total value and running pay...what now?

Total value = the sum of all items' prices based on the specified PricingRules()
Running Payable = the sum of all items' prices AFTER promos and discounts have been applied;

### Now that you mentioned, how did you go about the promos?

I'd like to enforce myself to think functional and reactive FIRST before OOP, so in true functional fashion, I opted for a pure functional approach. All ongoing promos will implement their own functions under a namespace called PromoFunctions. Such function shall have a signature of (items: CartItem[]) => CartItem[] which will have their own logic (buy 3 less 1, change price when X amount, add X when Y, etc). Then all "ongoing" promos must simply be registered to the "master list" called ActivePromos.

Then somewhere in the CartFacade, all ActivePromo functions will be applied on the running value of CartItem[] of the current instance of ShoppingCart.

### Okay okay okay. How do I run it, then?

It's already up and running! You can visit it at https://amaysim-exam.firebaseapp.com/

If you're really keen on running it locally..

1. Make sure Node (along with NPM, of course) is installed on your machine
2. Clone this repository
3. Navigate to 'shopping-cart-simulation'
4. Open terminal and run...
   `npm run lemme-see`
