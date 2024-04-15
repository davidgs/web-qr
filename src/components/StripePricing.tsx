function stripeEmbed() {
  return {
    __html: `<script async src="https://js.stripe.com/v3/pricing-table.js"></script>
<stripe-pricing-table pricing-table-id="prctbl_1P5w8kGuKQxVPasTTCV3iCrb"
publishable-key="pk_live_51OYEejGuKQxVPasTx38tvhF18bkVUopxhtaqFB1HwNd89om7n7GYofFpEKnMGMSZ92rbVeFMwETMjLBXQJr6uR8i00eVzQL3rn">
</stripe-pricing-table>`,
  };
}

export function PricingTable() {
  return <div dangerouslySetInnerHTML={stripeEmbed()} />;
}
