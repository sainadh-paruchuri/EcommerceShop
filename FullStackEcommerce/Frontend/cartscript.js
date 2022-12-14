const cartproducts=document.querySelector('.cartproducts');
let totalAmount=0;
const remove=document.getElementById('remove');

// const purchase_btn=document.getElementById('purchase-btn');
window.addEventListener('DOMContentLoaded',(event)=>{
    axios.get(`http://localhost:3000/cart`)
    .then((response)=>{
        document.querySelector('#number').innerText=response.data.products.length;
        response.data.products.forEach(element => {
            totalAmount+=element.price;
            showProductsOnCart(element);
        });   
            document.querySelector('#total-amount').innerText=totalAmount
    })
    .catch(err=>console.log(err))
})

async function showProductsOnCart(product){
        const id=product.id;
        const img_src=product.imageName;
        const product_name=product.productName;
        const quantity=product.cartItem.quantity;
        const price=product.price;

        localStorage.setItem(id,img_src);
    
       
        
        // document.querySelector('#number').innerText=parseInt(document.querySelector('#number').innerText)+1;
        const table=document.createElement('table');
        table.setAttribute('id','table')
        const tbody=document.createElement('tbody');
        tbody.classList.add('cart-row');
        tbody.setAttribute('id',id);
        // totalPrice=parseFloat(totalPrice)+parseFloat(price);
        // document.querySelector('#total-amount').innerText=parseFloat(totalPrice)
        // console.log(totalPrice);

        const tr=document.createElement('tr')
        const cartImage=document.createElement('td');
        cartImage.classList.add('cart-item');
        cartImage.innerHTML=` <img class="cart-img" src="${img_src}" alt=""/>
            <span>${product_name}</span>`
          const cartquantity=document.createElement('td');  
          cartquantity.classList.add('cart-quantity');
          cartquantity.setAttribute('id',`quantity-${id}`)
          cartquantity.innerHTML=`<input type="text" value=${quantity}>`
        const cartPrice=document.createElement('td');
        cartPrice.classList.add('cart-price');
        cartPrice.setAttribute('id',`price-${id}`)
        cartPrice.innerHTML=` ${price}
        <button id="remove">REMOVE</button>`;
        tr.appendChild(cartImage);
        tr.appendChild(cartquantity);
        tr.appendChild(cartPrice);

        tbody.appendChild(tr);

        table.appendChild(tbody);
        cartproducts.appendChild(table);


}

document.querySelector('#purchase-btn').addEventListener('click',()=>{
            // console.log(document.querySelector('#number').innerText)
            axios.get('http://localhost:3000/cart')
            .then(response=>{
                console.log(response);
                if(response.data.products.length>0){
                axios.post('http://localhost:3000/create-order',response.data.products)
                .then(response=>{
                    console.log(response)
                })
                .catch(err=>console.log(err))
            }
            })
            .catch(err=>console.log(err))
            // if(parseInt( document.querySelector('#number').innerText)==0){
            //     alert('your cart is empty! add the items to the cart');
            //     return
            // }
            // alert('thank you purchasing');
            document.querySelector('#total-amount').innerText=0;
            while(parseInt(document.querySelector('#number').innerText)>0){
                console.log(document.querySelector('.cart-row'))
                document.querySelector('.cart-row').remove();
                document.querySelector('#number').innerText=parseInt(document.querySelector('#number').innerText)-1;

            }
            
        })

cartproducts.addEventListener('click',(event)=>{
    if(event.target.id==='remove'){
        console.log(event.target.parentNode.parentNode.parentNode);
        const id=Number(event.target.parentNode.parentNode.parentNode.id);
        axios.delete(`http://localhost:3000/deletecart/${id}`)
        .then(response=>{
            console.log(response)
            location.reload();
        })
        .catch(err=>console.log(err))
    }
})