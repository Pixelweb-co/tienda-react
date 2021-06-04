import React, { Component,useState, useEffect,Fragment  } from 'react'



const productList = (props) => {


const products = props.products

    return(
        <div>

<div className={"loading "+(props.loading ? "" : 'hide_login')}>Cargando lista ...</div>

<ul class="products">
   {props.products && props.products.map((item, index) => {

     return(
      <li>
          <div class="card">
          <div class="card-body">
            <div class="brand-logo-c">
                <img src="https://i.pravatar.cc/300" className="logo-brand"/>

            </div>
            <div class="brand-title">
                      {item.brand_name}
                      </div>

             <div className="clearfix"></div>

            <div className="product-image">
            <img src="https://i.pravatar.cc/300" className="img-thumbnail"/>
            </div>


            <h4 className="product-title">{item.name}</h4>

            <h2 className="product-price">$ {item.price}</h2>

            <div className="product-tags">
            <div class="item-content-block tags">
<a href="#">lorem</a> <a href="#">loremipse</a> <a href="#">Esrite</a> <a href="#">remip</a> <a href="#">serte</a> <a href="#">quiaxms</a> <a href="#">loremipse</a> <a href="#">Esrite</a>
</div>
            </div>


            <div className="actions actions-bt">
              <button className="btn btn-success" type="button">Add to Cart</button>
            </div>



            </div>
            



          </div>

      </li>
     
   ) })} 
</ul>    

{props.products && props.products.length === 0 ? (
  <div class="noresult-label alert alert-secondary" role="alert">
    No se encontraron resultados.
  </div>
):(
  <></>
)}

        </div>
    )
}


export default productList