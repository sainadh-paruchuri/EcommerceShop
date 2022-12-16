const cartproducts=document.querySelector('.cartproducts');

window.addEventListener('DOMContentLoaded',(event)=>{
    axios.get(`http://localhost:3000/orders`)
    .then((response)=>{
        console.log(response)
        response.data.forEach(element => {
            element.products.forEach(product=>{
                showProductsOnCart(product)
            })
        });   
    })
    .catch(err=>console.log(err))
})

async function showProductsOnCart(product){
        const id=product.id;
        const img_src=product.imageName;
        const product_name=product.productName;
        const price=product.price;

        localStorage.setItem(id,img_src);
    
       
        
        // document.querySelector('#number').innerText=parseInt(document.querySelector('#number').innerText)+1;
        const table=document.createElement('table');
        table.setAttribute('id','table')
        const tbody=document.createElement('tbody');
        tbody.classList.add('cart-row');
        tbody.setAttribute('id',`cart-${id}`);
        // totalPrice=parseFloat(totalPrice)+parseFloat(price);
        // document.querySelector('#total-amount').innerText=parseFloat(totalPrice)
        // console.log(totalPrice);

        const tr=document.createElement('tr')
        const orderImage=document.createElement('td');
        orderImage.classList.add('cart-item');
        orderImage.innerHTML=` <img class="cart-img" src="${img_src}" alt=""/>
            <span>${product_name}</span>`
          const orderName=document.createElement('td');  
          orderName.classList.add('cart-quantity');
          orderName.setAttribute('id',`quantity-${id}`)
          orderName.innerHTML=`${product_name}`
        const orderPrice=document.createElement('td');
        orderPrice.classList.add('cart-price');
        orderPrice.setAttribute('id',`price-${id}`)
        orderPrice.innerHTML=` ${price}`
        tr.appendChild(orderImage);
        tr.appendChild(orderName);
        tr.appendChild(orderPrice);

        tbody.appendChild(tr);

        table.appendChild(tbody);
        cartproducts.appendChild(table);


}
