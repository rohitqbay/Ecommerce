document.addEventListener('DOMContentLoaded', loadProduct);

function loadProduct() {
    loadContent();
}

function loadContent() {
    // Attach event listeners for buttons
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    let qtyProduct = document.querySelectorAll('.cart-quantity');
    qtyProduct.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    let btnAddCart = document.querySelectorAll('.add-cart');
    btnAddCart.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });

    updateTotal();
}

function removeItem() {
    if (confirm("Are you sure you want to remove this item?")) {
        let title = this.parentElement.querySelector('.cart-title').innerHTML;
        itemList = itemList.filter((el) => el.title !== title);
        this.parentElement.remove();
    }
    loadContent();
}

function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent();
}

let itemList = [];

function addCart() {
    let product = this.parentElement;
    let title = product.querySelector('.card-title').innerHTML;
    let price = product.querySelector('.Item-price').innerHTML;
    let imgSrc = product.parentElement.querySelector('img').src;

    let newProduct = { title, price, imgSrc };

    if (itemList.find((el) => el.title === newProduct.title)) {
        alert("Product is already in the cart.");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title, price, imgSrc);

    let cartProduct = document.createElement('div');
    cartProduct.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(cartProduct);

    loadContent();
}

function createCartProduct(title, price, imgSrc) {
    return `
        <div class="cart-box">
            <img src="${imgSrc}" class="img-thumbnail rounded-circle" alt="">
            <div class="detail-box">
                <div class="cart-title">${title}</div>
                <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amt">${price}</div>
                </div>
                <input type="number" value="1" class="cart-quantity w-25">
            </div>
            <a name="trash" class="cart-remove">
                <i class="fa-solid fa-trash"></i>
            </a>
        </div>
    `;
}

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');
    let total = 0;

    cartItems.forEach((product) => {
        let productPrice = product.querySelector('.cart-price');
        let price = parseFloat(productPrice.innerText.replace('₹', ''));
        let qty = parseInt(product.querySelector('.cart-quantity').value);
        total += price * qty;
        product.querySelector('.cart-amt').innerText = `(x${qty}) ₹${(price * qty).toFixed(2)}`;
    });

    totalValue.innerHTML = `Total: ₹${total.toFixed(2)}`;
    const cartCount = document.querySelector('.badge');
    cartCount.innerHTML = itemList.length;
}
