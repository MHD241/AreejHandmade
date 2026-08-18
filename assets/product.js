const CART_KEY="areejAppleCart";
let quantity=1;
const $=id=>document.getElementById(id);
const money=value=>`£${Number(value).toFixed(2)}`;

function readCart(){
  try{return JSON.parse(localStorage.getItem(CART_KEY)||"[]")}catch{return[]}
}

function updateCartCount(){
  const count=readCart().reduce((sum,item)=>sum+(Number(item.qty)||0),0);
  $("cartCount").textContent=count;
}

function changePhoto(button){
  document.querySelectorAll(".thumb").forEach(item=>item.classList.remove("active"));
  button.classList.add("active");
  const image=button.querySelector("img");
  const main=$("mainImage");
  main.style.opacity=".2";
  setTimeout(()=>{
    main.src=image.src;
    main.alt=image.alt;
    main.style.opacity="1";
  },160);
}

function changeQuantity(amount){
  quantity=Math.max(1,Math.min(10,quantity+amount));
  $("quantity").textContent=quantity;
  $("addPrice").textContent=money(PRODUCT.price*quantity);
}

function readValue(id){
  const element=$(id);
  return element?element.value.trim():"";
}

function addToBasket(){
  const colour=readValue("colour");
  const size=readValue("size");
  const wording=readValue("wording");
  const options={};
  document.querySelectorAll("[data-order-option]").forEach(element=>{
    const value=element.value.trim();
    if(value)options[element.dataset.orderOption]=value;
  });
  const giftWrap=document.querySelector('input[name="giftWrap"]:checked')?.value||"No gift wrapping";
  options["Gift presentation"]=giftWrap;
  const cart=readCart();
  cart.push({
    cartId:Date.now()+Math.floor(Math.random()*1000),
    id:PRODUCT.id,
    name:PRODUCT.name,
    img:PRODUCT.images[0],
    price:PRODUCT.price,
    colour,
    size,
    personal:wording,
    options,
    privateMessage:readValue("privateMessage"),
    giftMessage:readValue("giftMessage"),
    qty:quantity
  });
  localStorage.setItem(CART_KEY,JSON.stringify(cart));
  updateCartCount();
  $("confirmation").textContent=`${PRODUCT.name} was added to your basket.`;
  showToast("Added to your basket");
  setTimeout(()=>{$("confirmation").textContent=""},4500);
}

let toastTimer;
function showToast(message){
  const toast=$("toast");
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);
}

document.addEventListener("keydown",event=>{
  if(event.key==="ArrowRight"||event.key==="ArrowLeft"){
    const thumbs=[...document.querySelectorAll(".thumb")];
    const active=Math.max(0,thumbs.findIndex(item=>item.classList.contains("active")));
    const next=event.key==="ArrowRight"?(active+1)%thumbs.length:(active-1+thumbs.length)%thumbs.length;
    changePhoto(thumbs[next]);
  }
});

updateCartCount();
