import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/Store'
import CityForm from './CityForm';
import CityRow from './CityRow';

export default observer(function CityList(){
    const {cityStore} = useStore();
    useEffect(()=>{
      cityStore.laodCities()
    } , [cityStore])
    if(cityStore.loadingInitial) return(<div>Loading...</div>)
    return(
        <div>
           <Link to="/cities/creatCity" className="btn btn-icon icon-left btn-primary"> <i className="fa fa-plus" > </i> Add City  </Link>
         <div className="card mt-4">
                  <div className="card-body">
                    <CityForm/>
                    <table className="table">
                      <thead>
                        <tr>
                            <th scope="col">city</th>
                            <th scope="col">zip code</th>
                            <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <CityRow/>
                      </tbody>
                    </table>
                  </div>
               
                </div>  
        </div>
    )
})