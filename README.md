# Paper Core — fresh starter

A small, responsive, browser-based quotation and internal margin calculator built from scratch with HTML, CSS and vanilla JavaScript.

## Included
- Selling price is the primary input.
- VAT defaults to 7.5% and is editable.
- Automatic VAT amount and VAT-inclusive total.
- Internal margin amount, margin percentage, and margin per kg.
- Seller voucher preview and browser Print / Save as PDF.
- Internal total cost and margin are not rendered in the seller voucher.
- Responsive layout and basic input validation.

## Important assumptions
- The selling price field is the **total selling price before VAT for the quoted line**, not a per-kilogram price.
- Cost is the total cost for the same quoted line.
- The requested margin indicator is calculated as `(selling price + VAT) - total cost`, and margin percentage as `margin / VAT-inclusive total × 100`. VAT is included in this indicator as requested, but it is not actual profit.
- Margin per kg is `margin / weight in kg`.
- The voucher is a new placeholder layout. The existing live voucher's exact design cannot be reproduced without a screenshot or PDF of the current voucher.

## Run locally
Open `index.html` in a browser. No build step is required.

## Deploy
Upload the folder to Netlify or push it to a GitHub repository and connect the repository to Netlify.

## Not included yet
- Google Sheets / database connection.
- User authentication and access controls.
- Existing product catalog, saved quotations, or historical records.
- Exact replication of the current seller voucher.
- Production VAT/accounting validation.

Do not use this starter as a replacement for a live production workflow until the actual voucher format, cost basis, product fields, data storage, and deployment are reviewed and tested.
