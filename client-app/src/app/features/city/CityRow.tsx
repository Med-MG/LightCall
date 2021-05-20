import React from 'react';
import { Link } from 'react-router-dom';

import { useStore } from '../../stores/Store';



function CityRow() {

   const {cityStore} = useStore();

   const {cities , deleteCity , selectCity} = cityStore;
    return ( 
        <>
            {cities.map((city)=> {
                return ( 
                <tr key={city.id}>
                <td>{city.CityName}</td>
                <td>{city.ZipCode}</td>
                <td>
                <div>
                    <Link to="/city/Editcity" onClick={()=> selectCity(city.id) } className="btn btn-info mr-2" >Edit</Link>
                    <button className="btn btn-danger" onClick={()=> deleteCity(city.id) } >Delete</button>
                </div>
                </td>
            </tr>)}

        )}
        </>
    );
}

 export default CityRow;