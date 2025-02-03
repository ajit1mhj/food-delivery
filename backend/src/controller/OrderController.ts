import Stripe from "stripe";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

// Example exchange rate (adjust this dynamically if needed)
const EXCHANGE_RATE = 140; // NPR per USD (example)
const MIN_USD_CENTS = 50; // Stripe's minimum required charge in USD cents
const MIN_AMOUNT_NPR = Math.ceil((MIN_USD_CENTS / 100) * EXCHANGE_RATE); // Convert to NPR

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
        phoneNumber: number;
    };
    restaurantId: string;
};

const createCheckoutSession = async (req: Request, res: Response): Promise<any> => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);

        if (!restaurant) {
            throw new Error("Restaurant not found");
        }

        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);
        const session = await createSession(lineItems, "TEST_ORDER_ID", restaurant.deliveryPrice, restaurant._id.toString());

        if (!session.url) {
            return res.status(500).json({ message: "Error creating Stripe session" });
        }

        res.json({ url: session.url });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.raw?.message || error.message });
    }
};

// ✅ Adjusts menu item price if below Stripe's required minimum charge
const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString());

        if (!menuItem) {
            throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
        }

        let unitAmount = menuItem.price;
        if (unitAmount < MIN_AMOUNT_NPR) {
            unitAmount = MIN_AMOUNT_NPR; // Ensure it meets Stripe's minimum charge
        }

        return {
            price_data: {
                currency: "npr",
                unit_amount: unitAmount,
                product_data: {
                    name: menuItem.name,
                },
            },
            quantity: parseInt(cartItem.quantity),
        };
    });

    return lineItems;
};

// ✅ Ensures delivery charge meets Stripe's minimum requirement
const createSession = async (
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId: string,
    deliveryPrice: number,
    restaurantId: string
) => {
    if (deliveryPrice < MIN_AMOUNT_NPR) {
        deliveryPrice = MIN_AMOUNT_NPR; // Adjust delivery price if below minimum
    }

    const sessionData = await STRIPE.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryPrice,
                        currency: "npr",
                    },
                },
            },
        ],
        mode: "payment",
        metadata: {
            orderId,
            restaurantId,
        },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    });

    return sessionData;
};

export default {
    createCheckoutSession,
};
