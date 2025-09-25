import Razorpay from 'razorpay';

export async function POST(request: Request) {
    const { amount, currency } = await request.json();

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await instance.orders.create(options);
        return new Response(JSON.stringify({ orderId: order.id }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
