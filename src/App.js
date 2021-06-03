import React, { Component,useState, useEffect,Fragment  } from 'react'
import { Form, Grid, Image, ItemMeta, Transition } from 'semantic-ui-react'
import { Slider } from "react-semantic-ui-range";
import banner from './images/banner.jpg';
import axios from 'axios';
import './App.css'; 

import { Typeahead } from 'react-bootstrap-typeahead'; 


function App() {

const [filter, setFilter] = useState({duration:[0,10000], brand:0, category:0});
const [brands, setbrands] = useState([{id:1, name:"brand 1"}, {id:2, name:"brand 2"},{id:3, name:"brand 3"}]);
const [categories, setcategories] = useState([{id:1, name:"category 1"}, {id:2, name:"category 2"},{id:3, name:"category 3"}]);
const [products , setProducts] = useState([])
const [loadingActive, showLoading] = useState(false)

const [isLoading, setIsLoading] = useState(false);
const [options, setOptions] = useState([]);

const settings = {
  start: [2,4],
  min: 0,
  max: 10000,
  step: 10,
  onChange: value => {
    setFilter({...filter, duration:value});
    console.log(filter) 

    filterProducts({...filter, duration:value})
  }
};

const handleSearch = (query) => {
  setIsLoading(true);

  fetch(`https://www.pixelweb.com.co/tienda-react/index.php/api/get_products?q=${query}+in:login&page=1&per_page=50`)
    .then((resp) => resp.json())
    .then(({ items }) => {
      const options = items.map((i) => ({
        avatar_url: i.avatar_url,
        id: i.id,
        login: i.login,
      }));

      setOptions(options);
      setIsLoading(false);
    });
};

const filterBy = () => true;

const clear_filter = () => {

 
 
  setFilter({duration:[0,10000], category:0,brand:0});

  setTimeout(()=>{
  get_inicial_data()

},500)


}


const filterProducts = async (filterd) => {

  showLoading(true)


  var formdata=new FormData();
    formdata.append("price_start",filterd.duration[0]);
    formdata.append("price_end",filterd.duration[1]);
    formdata.append("brand",filterd.brand);
    formdata.append("category",filterd.category);


  await axios.post('https://www.pixelweb.com.co/tienda-react/index.php/api/get_products', formdata).then((response) => {

    // handle success
    console.log(response.data);
    
    setProducts(response.data.products)
   
  setTimeout(()=>{ 
  showLoading(false)
  },1000) 

  })


}

const filterBrand = (data) => {


setFilter({...filter, brand:data.id})

console.log(filter)

filterProducts({...filter, brand:data.id})

}

const filterCategory = (data) => {


  setFilter({...filter, category:data.id})
  
  console.log(filter)

  filterProducts({...filter, category:data.id})
  
  }


  const get_inicial_data = () => {
    axios.get('https://www.pixelweb.com.co/tienda-react/index.php/api/get_initial_data')
    .then(function (response) {
      // handle success
      console.log(response.data);
  
      setProducts(response.data.products)
      setcategories(response.data.categories)
      setbrands(response.data.brands)
  
  
    })
  }


  useEffect(()=>{

    get_inicial_data()


  },[])


  return (
    <div className="App">
    <div className="container-fluid fcont">
      <div className="row">
        <div className="col-md-2 col-xs-12">
          <h4>Aniam Store</h4>

        </div>

        <div className="col-md-6 col-xs-12">
        <Typeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="buscar productos..."
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <img
            alt={option.login}
            src='https://i.pravatar.cc/24'
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span>{option.login}</span>
        </Fragment>
      )}
    />
    
        </div>

        <div className="col-md-2 col-xs-12">
          <button>Tienda</button>


    
        </div>

        <div className="col-md-2 col-xs-12">
           <button>Carrito</button>
    
          </div>

      
  


      </div> 
      <div className="row banner-container">
      
          <img src={banner} className="img-responsive img banner1" />
      

      </div> 

    </div>

    <div className="container">
    <div className="row">
      <div className="col-md-4 col-xs-12 lateral">

              <div class="card">
              <div class="card-body">
                <h4 class="card-title">Aniam Store</h4>
               <br/>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                <button>Ver instagram</button>
              
              
                <button>WhatsApp</button>
              
              </div>
            </div>


            <div class="card filters">
              <div class="card-body ">
                <h4 class="card-title pull-left">Filtros</h4> <button className="btn btn-success pull-right" onClick={clear_filter.bind()}>Limpiar</button>
               <hr/>
               <h4 className="card-title">Precio</h4>

               <Slider multiple value={filter.duration} color="red" settings={settings} />

               <div>
              <b>Min: {filter && filter.duration[0]}</b>
                <b>    -   </b>
              <b>Max: {filter && filter.duration[1]}</b>

               </div>


            <h4 className="card-title">Marca</h4>

              <ul class="list-group list-group-flush">
               
               {brands && brands.map((item,index)=>{

                let cssActive = false   


                if(item.id ===  filter.brand){
                    cssActive = true;
                  }else{
                     cssActive = false;  
                  }
               
              return( <li class={'list-group-item ' +(cssActive ? "selected" : '')} value={item.id} onClick={()=>{filterBrand(item)}}>{item.name}</li>)
              })}
              </ul>
              

              <h4 className="card-title">Catégoria</h4>

                <ul class="list-group list-group-flush">
                {categories && categories.map((item,index)=>{

                  let cssActive = false   


                if(item.id ===  filter.category){
                    cssActive = true;
                  }else{
                     cssActive = false;  
                  }
                              
                              return( <li class={'list-group-item ' +(cssActive ? "selected" : '')} value={item.id} onClick={()=>{filterCategory(item)}}>{item.name}</li>)
                              })}
                </ul>
              </div>
            </div>

        
       </div>

       <div className="col-md-8 col-xs-12 lateral">

          <div className="card">

          <div className={"loading "+(loadingActive ? "" : 'hide_login')}>Cargando lista ...</div>

            <ul class="products">
               {products && products.map((item, index) => {

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

            {products && products.length === 0 ? (
              <div class="noresult-label alert alert-secondary" role="alert">
                No se encontraron resultados.
              </div>
            ):(
              <></>
            )}


          </div>


        </div>

      </div> 
      
    </div>


    </div>
  );
}

export default App;
