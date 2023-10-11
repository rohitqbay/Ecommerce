
document.addEventListener('DOMContentLoaded',loadProduct);

function loadProduct(){
    loadContent();
}

function loadContent(){
    //remove items from cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    //product Item Change Event
    let qtyProduct = document.querySelectorAll('.cart-quantity');
    qtyProduct.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });

    //product Cart
    let btnAddCart = document.querySelectorAll('.add-cart');
    // console.log(btnAddCart);
    btnAddCart.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });

    updateTotal();
}

//remove Item
function removeItem(){
    // console.log("Click");
    if(confirm("Are You Sure to Remove")){
        let title=this.parentElement.querySelector('.cart-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
        this.parentElement.remove();
    }
    loadContent();
    
}

//change Quantity
function changeQty(){
    if(isNaN(this.value)||this.value<1){
        this.value = 1;
    }
    loadContent();
}
let itemList=[];

//Add Cart
function addCart(){
    // console.log('Check');
    let product = this.parentElement;
    let title=product.querySelector('.card-title').innerHTML;
    let price=product.querySelector('.Item-price').innerHTML;
    // console.log(price);
    let imgSrc=product.querySelector('.card-img-top').src;
    // console.log(imgSrc);

    let newProduct={title,price,imgSrc};

    //Check Product already exsists
    if(itemList.find((el)=>el.title==newProduct.title)){
        alert("Product Already Added in Cart");
        return;
    }else{
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title,price,imgSrc);

    let cartProduct=document.createElement('div');
    cartProduct.innerHTML=newProductElement;
    let cartBasket=document.querySelector('.cart-content');
    cartBasket.append(cartProduct);

    loadContent();
}



function createCartProduct(title,price,imgSrc){
    return `
                <div class="cart-box">
                    <img src="${imgSrc}" class="img-thumbnail rounded-circle " alt="">
                    <div class="detail-box">
    
                            <div class="cart-title">${title}</div>
                        
                        <div class="price-box">
                            <div class="cart-price">${price}</div>
                            <div class="cart-amt">${price}</div>
                            
                        </div>
                        <input type="number" value="1" class="cart-quantity w-25 ">
                    </div>
                    <a name="trash" class="cart-remove"><i class="fa-solid fa-trash"></i><a></a>
                </div>
    `;

}

function updateTotal()
{
    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');

    let total=0;

    cartItems.forEach(product=>{
        let productPrice=product.querySelector('.cart-price');
        let price=parseInt(productPrice.innerHTML.replace("₹",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="(x"+qty+")"+" ₹ "+price*qty;

    });
    totalValue.innerHTML=`₹ ${total}`;

    //Cart Count
    const cartCount=document.querySelector('.badge');
    let count=itemList.length;
    cartCount.innerHTML=count;

}
