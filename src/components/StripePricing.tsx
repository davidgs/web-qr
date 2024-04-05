function stripeEmbed() {
  return {
    __html: `<script async src="https://js.stripe.com/v3/pricing-table.js"></script>
    <stripe-pricing-table
    pricing-table-id="prctbl_1OgV8HGuKQxVPasTQ9Cm8EPf"
          publishable-key="pk_test_51OYEejGuKQxVPasTmIP0YpYi6bMc5YxPdbTODK6FO0quQ9clYbr9TC9Kihv3o2zV8ErBY2xRD4OwnLNoxgE265B600yqy7eDkN"
    >
    </stripe-pricing-table>`,
  };
}

export function PricingTable() {
  return <div dangerouslySetInnerHTML={stripeEmbed()} />;
}
