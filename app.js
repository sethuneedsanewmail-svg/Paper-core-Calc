(() => {
  const $ = (id) => document.getElementById(id);
  const fields = ["customer","voucherNo","voucherDate","description","weight","quantityNote","sellingPrice","vatRate","totalCost"];
  const money = (value) => new Intl.NumberFormat("en-NG", {style:"currency",currency:"NGN",minimumFractionDigits:2,maximumFractionDigits:2}).format(Number.isFinite(value) ? value : 0);
  const number = (id) => {
    const raw = $(id).value.trim();
    return raw === "" ? 0 : Number(raw);
  };
  const safe = (value) => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt = (n) => new Intl.NumberFormat("en-NG",{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
  function calculate() {
    const selling = Math.max(0, number("sellingPrice"));
    const vatRate = Math.min(100, Math.max(0, number("vatRate")));
    const weight = Math.max(0, number("weight"));
    const cost = Math.max(0, number("totalCost"));
    const vat = selling * vatRate / 100;
    const total = selling + vat;
    // Per the requested internal reporting convention, margin includes VAT even though VAT is not profit.
    const margin = total - cost;
    const marginPercent = total > 0 ? margin / total * 100 : 0;
    const perKg = weight > 0 ? margin / weight : null;
    $("vatAmount").value = money(vat);
    $("totalWithVat").textContent = money(total);
    $("marginAmount").textContent = money(margin);
    $("marginPercent").textContent = total > 0 ? `${marginPercent.toFixed(2)}%` : "—";
    $("marginPerKg").textContent = perKg === null ? "—" : money(perKg);
    const warning = $("marginWarning");
    warning.classList.toggle("negative", margin < 0);
    warning.textContent = margin < 0 ? "Margin is negative at the entered cost and price." : "Margin is positive. VAT is included in this requested indicator.";
    return {selling, vatRate, vat, total, weight};
  }
  function renderVoucher() {
    const d = calculate();
    const customer = $("customer").value.trim() || "—";
    const voucherNo = $("voucherNo").value.trim() || "—";
    const date = $("voucherDate").value || new Date().toISOString().slice(0,10);
    const description = $("description").value.trim() || "Paper product";
    const quantityNote = $("quantityNote").value.trim();
    $("voucherContent").innerHTML = `
      <div class="voucher-head">
        <div><h3>PAPER CORE</h3><p>Paper product quotation</p></div>
        <div class="voucher-meta"><p><strong>VOUCHER</strong> ${safe(voucherNo)}</p><p>Date: ${safe(date)}</p><p>Customer: ${safe(customer)}</p></div>
      </div>
      <table>
        <thead><tr><th>Description</th><th class="num">Weight (kg)</th><th class="num">Unit selling price</th><th class="num">VAT</th><th class="num">Total</th></tr></thead>
        <tbody><tr><td>${safe(description)}${quantityNote ? `<div style="color:#657a89;margin-top:4px">${safe(quantityNote)}</div>` : ""}</td><td class="num">${fmt(d.weight)}</td><td class="num">${money(d.selling)}</td><td class="num">${fmt(d.vatRate)}% (${money(d.vat)})</td><td class="num">${money(d.total)}</td></tr></tbody>
      </table>
      <div class="voucher-total"><div><span>Selling price</span><strong>${money(d.selling)}</strong></div><div><span>VAT (${fmt(d.vatRate)}%)</span><strong>${money(d.vat)}</strong></div><div class="grand"><span>Total payable</span><strong>${money(d.total)}</strong></div></div>
      <div class="voucher-foot">Thank you for your business.</div>`;
    $("voucherPreview").hidden = false;
  }
  fields.forEach(id => $(id).addEventListener("input", calculate));
  $("previewBtn").addEventListener("click", () => { renderVoucher(); $("voucherPreview").scrollIntoView({behavior:"smooth",block:"start"}); });
  $("printBtn").addEventListener("click", () => { renderVoucher(); window.print(); });
  $("resetBtn").addEventListener("click", () => {
    $("customer").value = ""; $("voucherNo").value = ""; $("voucherDate").value = new Date().toISOString().slice(0,10);
    $("description").value = ""; $("weight").value = "1"; $("quantityNote").value = "";
    $("sellingPrice").value = "0"; $("vatRate").value = "7.5"; $("totalCost").value = "0";
    $("voucherPreview").hidden = true; calculate();
  });
  $("voucherDate").value = new Date().toISOString().slice(0,10);
  calculate();
})();