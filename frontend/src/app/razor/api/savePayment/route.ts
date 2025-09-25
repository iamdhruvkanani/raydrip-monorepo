export async function POST(request: Request) {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        cart,
        totalPrice,
        orderId
    } = await request.json();

    // TODO: Insert your DB save logic here!
    // Example: await prisma.payment.create({ data: {...} })

    console.log("Saving payment/order:", {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        cart,
        totalPrice,
        orderId,
    });

    return new Response(JSON.stringify({ status: "success" }), { status: 201 });
}
