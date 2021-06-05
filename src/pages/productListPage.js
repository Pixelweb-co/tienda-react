import React, { Component,useState, useEffect,Fragment  } from 'react'
import { Form, Grid, Image, ItemMeta, Transition } from 'semantic-ui-react'
import banner from '../images/banner.jpg';
import axios from 'axios';
import './../App.css'; 

import { Typeahead } from 'react-bootstrap-typeahead'; 

//importar componentes

import Panel from '../components/panel'
import Filtro from '../components/filtro'
import ProductList from '../components/productList'


export const ProductListPage = () => {

const [filter, setFilter] = useState({duration:[0,10000], brand:0, category:0});
const [brands, setbrands] = useState([{id:1, name:"brand 1"}, {id:2, name:"brand 2"},{id:3, name:"brand 3"}]);
const [categories, setcategories] = useState([{id:1, name:"category 1"}, {id:2, name:"category 2"},{id:3, name:"category 3"}]);
const [products , setProducts] = useState([])
const [loadingActive, showLoading] = useState(false)

const [isLoading, setIsLoading] = useState(false);
const [options, setOptions] = useState([]);

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

             <Panel/>


            <Filtro categories={categories} brands={brands} setFilter={setFilter} filter={filter} filterProducts={filterProducts} clear_filter={clear_filter} filterBrand={filterBrand} filterCategory={filterCategory}/>
        
       </div>

       <div className="col-md-8 col-xs-12 lateral">

          <div className="card">

              <ProductList products={products} loading={loadingActive}/>

          </div>


        </div>

      </div> 
      
    </div>


    </div>
  );
}


