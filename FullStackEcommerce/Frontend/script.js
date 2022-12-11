//  <div class="products">
//         <div class="cards">
//             <div class="img">
//                 <img src="../images/nature.jpg" alt="nature">
//             </div>
//             <div class="title">
//                 <h1>SunSet</h1>
//             </div>
//             <div class="des">
//                 <p>amount: <span id="amount">0</span></p> 
//                 <button>Add to Cart</button>
//             </div>
//         </div>
//  </div>
const products=document.querySelector('.products');


products.addEventListener('click',(event)=>{
    // if(event.target)
    console.log(event.target.id);
    if(event.target.innerText=='Add to Cart'){
        // console.log(event.target.parentNode.previousElementSibling.previousElementSibling.children[0].src);
        const className=event.target.parentNode.parentNode.className;
        const id=event.target.parentNode.parentNode.id;
        // console.log(id);

        const img_src=event.target.parentNode.previousElementSibling.previousElementSibling.children[0].src;
        // console.log(img_src)
        const product_name=event.target.parentNode.previousElementSibling.children[0].innerText
        // console.log(product_name)
        const price=event.target.previousElementSibling.innerText;
        // console.log(price)
        let totalPrice=document.querySelector('#total-amount').innerText;
        // console.log(totalPrice);
        let table=document.querySelector('#table');
        if(document.querySelector(`#cart-${id}`)){
            alert('The item already added to the cart');
            return;
        }

        document.querySelector('#number').innerText=parseInt(document.querySelector('#number').innerText)+1;
        const tbody=document.createElement('tbody');
        tbody.classList.add('cart-row');
        tbody.setAttribute('id',`cart-${id}`);
        totalPrice=parseFloat(totalPrice)+parseFloat(price);
        document.querySelector('#total-amount').innerText=parseFloat(totalPrice)
        console.log(totalPrice);


    //     <span class='cart-item'>
    //     <img class='cart-img' src="${img_src}" alt=""/>
    //         <span>${name}</span>
    //     </span>
    //     <span class=cart-quantity>
    //     <input type="text" value="1">
    //     </span>
        
    //     <span class='cart-price'>${price}</span>
    //     <button id="remove">REMOVE</button>
    // `
        const tr=document.createElement('tr')
        const cartImage=document.createElement('td');
        cartImage.classList.add('cart-item');
        cartImage.innerHTML=` <img class="cart-img" src="${img_src}" alt=""/>
            <span>${product_name}</span>`
          const cartquantity=document.createElement('td');  
          cartquantity.classList.add('cart-quantity');
          cartquantity.innerHTML=`<input type="text" value="1">`
        const cartPrice=document.createElement('td');
        cartPrice.classList.add('cart-price');
        cartPrice.innerHTML=` ${price}
        <button id="remove">REMOVE</button>`;
        tr.appendChild(cartImage);
        tr.appendChild(cartquantity);
        tr.appendChild(cartPrice);

        tbody.appendChild(tr);


        // tbody.innerHTML=`
        // <tr class="cart-item">
        //     <img class="cart-img" src="${img_src}" alt=""/>
        //     <span>${product_name}</span>
        // </tr>
        // <tr class="cart-quantity">
        // <input type="text" value="1">
        // </tr>
        // <tr class="cart-price">
        // ${price}
        // <button id="remove">REMOVE</button>
        // </tr>`

        table.appendChild(tbody);

    const container=document.querySelector('.container')




    const notif=document.createElement('div');
    notif.classList.add('toast');
    notif.innerText=`product is added to the cart`;
    container.appendChild(notif);

    setTimeout(()=>{
        notif.remove()
    },3000)

        

    }
})


function showProductsOnScreen(product){
    const productName=product.productName;
    const imageName=product.imageName;
    const price=product.price;
    const id=product.id;

    const card=document.createElement('div');
    card.classList.add('cards');
    card.setAttribute('id',id);
    const image=document.createElement('div');
    image.classList.add('img');
    const img=document.createElement('img');
    img.setAttribute('src',imageName);
    img.setAttribute('alt',productName);
    image.appendChild(img);
    const title=document.createElement('div');
    title.classList.add('title');
    h1=document.createElement('h1');
    h1.innerText=productName;
    title.appendChild(h1);
    const des=document.createElement('div');
    des.classList.add('des');
    const p=document.createElement('p');
    p.innerText=price;
    const button=document.createElement('button');
    button.setAttribute('id','AddToCart')
    // button.classList.add('addToCart');
    button.innerText='Add to Cart';
    
    des.appendChild(p);
    des.appendChild(button);

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(des);

    products.appendChild(card);





}


window.addEventListener('DOMContentLoaded',(event)=>{
    axios.get('http://localhost:3000/getAllProducts')
    .then((response) => {
        response.data.forEach(element => {
            console.log(element)
            console.log(element.productName)
            showProductsOnScreen(element);
        });
         card=document.querySelector('.cards')
        
    }).catch((err) => {
        console.log(err)
    });
})

const cart=document.querySelector('.cart');
const cartSection=document.querySelector('.cart-section');
const close=document.getElementById('close');
const carts=document.querySelector('.carts')

        cart.addEventListener('click',()=>{
            cartSection.style.display='block';
        })
        close.addEventListener('click',()=>{
            cartSection.style.display='none';
        })
         carts.addEventListener('click',()=>{
            cartSection.style.display='block';
        })

        // notification


document.querySelector('#purchase-btn').addEventListener('click',()=>{
            console.log(document.querySelector('#number').innerText)
            if(parseInt( document.querySelector('#number').innerText)==0){
                alert('your cart is empty! add the items to the cart');
                return
            }
            alert('thank you purchasing');
            document.querySelector('#total-amount').innerText=0;
            while(parseInt(document.querySelector('#number').innerText)>0){
                console.log(document.querySelector('.cart-row'))
                document.querySelector('.cart-row').remove();
                document.querySelector('#number').innerText=parseInt(document.querySelector('#number').innerText)-1;

            }
            
        })

    document.querySelector('.cart-section').addEventListener('click',(e)=>{
        console.log(e.target.parentNode.parentNode.parentNode.id)
        e.target.parentNode.parentNode.parentNode.id.remove();
        // console.log(id);
        // document.getElementById('id').remove()
        // if(e.target.id=='remove'){
        //     // document.getElementById('id').remove();
        //     // console.log(document.getElementById('id'))

        // }

    })