/* Microsoft Store integration boundary.
 * A plain browser/PWA cannot access Windows.Services.Store.StoreContext directly.
 * To enable checkout, a trusted packaged Windows bridge must implement
 * window.LankiStoreBridge.purchase({productId, packId}) and return verified
 * transaction data ONLY after Microsoft Store confirms fulfillment.
 * Do not mark purchases successful based on a UI click or untrusted JS result.
 */
const GOLD_PACKS=[
 {id:'gold1',productId:'LANKI_GOLD_1',price:'$0.99',gold:100},
 {id:'gold5',productId:'LANKI_GOLD_5',price:'$4.99',gold:550},
 {id:'gold10',productId:'LANKI_GOLD_10',price:'$9.99',gold:1200},
 {id:'gold15',productId:'LANKI_GOLD_15',price:'$14.99',gold:1900},
 {id:'gold20',productId:'LANKI_GOLD_20',price:'$19.99',gold:2700}
];
window.LankiStore={packs:GOLD_PACKS,async purchase(pack){
 if(!window.LankiStoreBridge||typeof window.LankiStoreBridge.purchase!=='function')throw Error('Microsoft Store checkout is not connected. Install a Store-enabled Windows package to purchase.');
 // A real deployment MUST verify receipt/ownership with trusted native/backend code,
 // grant gold exactly once per transaction, and handle pending/cancel/refund cases.
 return window.LankiStoreBridge.purchase({productId:pack.productId,packId:pack.id});
}};
