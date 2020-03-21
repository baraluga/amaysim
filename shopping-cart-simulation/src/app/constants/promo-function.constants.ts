import { CartItem, ProductCode, Product } from '../models';
import { doNothing, subtractList } from '../utils';
import { AvailableProducts } from './shopping-cart.constants';

namespace PromoFunctions {
  /**
   * A 3 for 2 deal on Unlimited 1GB Sims. So for example,
   * if you buy 3 Unlimited 1GB Sims, you will pay the
   * price of 2 only for the first month.
   */
  export const threeFor2 = (items: CartItem[]) => {
    const promofied: CartItem[] = [];
    const oneGBItems = items.filter(item => item.product.code === ProductCode.ULT_SMALL);
    const rest = subtractList(items, oneGBItems) as CartItem[];
    oneGBItems.reduce((acc, curr) => {
      const isApplicable = acc % 3 === 0;
      promofied.push({
        ...curr,
        applicablePrice: isApplicable ? 0 : curr.applicablePrice,
      });
      return ++acc;
    }, 1);
    return [...rest, ...promofied];
  };

  /**
   * The Unlimited 5GB Sim will have a bulk discount applied;
   * whereby the price will drop to $39.90 each for the first month,
   * if the customer buys more than 3.
   */
  export const bulkDiscount = (items: CartItem[]) => {
    const fiveGBItems = items.filter(item => item.product.code === ProductCode.ULT_LARGE);
    const rest = subtractList(items, fiveGBItems);
    const isApplicable = fiveGBItems.length > 3;
    const promofied = !isApplicable
      ? fiveGBItems
      : fiveGBItems.map(five => ({ ...five, applicablePrice: 39.9 }));
    return [...rest, ...promofied];
  };

  /**
   * We will bundle in a free 1 GB Data-pack
   * free-of-charge with every Unlimited 2GB sold.
   */
  export const free1GB = (items: CartItem[]) => {
    const twoGBItems = items.filter(item => item.product.code === ProductCode.ULT_MEDIUM);
    const freebie: Product = AvailableProducts[ProductCode.LT_1GB];
    const additionalItems = twoGBItems.map(
      ({ id }) => ({ product: freebie, id, applicablePrice: 0 } as CartItem),
    );

    return [...items, ...additionalItems];
  };
}

export const ActivePromos = [
  PromoFunctions.bulkDiscount,
  PromoFunctions.free1GB,
  PromoFunctions.threeFor2,
];
