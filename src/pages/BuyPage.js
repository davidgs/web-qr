import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function BuyPage() {
    const navigate = useNavigate();
  const dark = useSelector((state) => state.dark.dark);
  const mainSet = useSelector((state) => state.main.settings);

  const darkClass = dark ? "header-stuff-dark" : "header-stuff";

    // Paste the stripe-pricing-table snippet in your React component
    return (
      <div className={`main-column-closed`}>
<stripe-pricing-table pricing-table-id="prctbl_1OelUuGuKQxVPasT978NdhxL"
publishable-key="pk_test_51OYEejGuKQxVPasTmIP0YpYi6bMc5YxPdbTODK6FO0quQ9clYbr9TC9Kihv3o2zV8ErBY2xRD4OwnLNoxgE265B600yqy7eDkN"></stripe-pricing-table>
</div>
    );
  }

