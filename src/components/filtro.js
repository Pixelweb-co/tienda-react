import React, { Component,useState, useEffect,Fragment  } from 'react'
import { Slider } from "react-semantic-ui-range";


const panelFiltro = (props) => {


const settings = {
    start: [2,4],
    min: 0,
    max: 10000,
    step: 10,
    onChange: value => {
      props.setFilter({...props.filter, duration:value});
      console.log(props.filter) 
  
      props.filterProducts({...props.filter, duration:value})
    }
  };
  

    return(
        
        <div class="card filters">
        <div class="card-body ">
          <h4 class="card-title pull-left">Filtros</h4> <button className="btn btn-success pull-right" onClick={props.clear_filter.bind()}>Limpiar</button>
         <hr/>
         <h4 className="card-title">Precio</h4>

         <Slider multiple value={props.filter.duration} color="red" settings={settings} />

         <div>
        <b>Min: {props.filter && props.filter.duration[0]}</b>
          <b>    -   </b>
        <b>Max: {props.filter && props.filter.duration[1]}</b>

         </div>


      <h4 className="card-title">Marca</h4>

        <ul class="list-group list-group-flush">
         
         {props.brands && props.brands.map((item,index)=>{

          let cssActive = false   


          if(item.id ===  props.filter.brand){
              cssActive = true;
            }else{
               cssActive = false;  
            }
         
        return( <li class={'list-group-item ' +(cssActive ? "selected" : '')} value={item.id} onClick={()=>{props.filterBrand(item)}}>{item.name}</li>)
        })}
        </ul>
        

        <h4 className="card-title">Catégoria</h4>

          <ul class="list-group list-group-flush">
          {props.categories && props.categories.map((item,index)=>{

            let cssActive = false   


          if(item.id ===  props.filter.category){
              cssActive = true;
            }else{
               cssActive = false;  
            }
                        
                        return( <li class={'list-group-item ' +(cssActive ? "selected" : '')} value={item.id} onClick={()=>{props.filterCategory(item)}}>{item.name}</li>)
                        })}
          </ul>
        </div>
      </div>
    )

}

export default panelFiltro