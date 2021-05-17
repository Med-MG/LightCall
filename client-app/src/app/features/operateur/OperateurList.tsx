import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useStore } from '../../stores/Store'
import OperateurRow from './OperateurRow';

export default observer(function OperateurList(){
    const {operateurStore} = useStore();
    const {operateurs} = operateurStore
    useEffect(()=>{
      operateurStore.loadOperateurs()
  } , [operateurStore])
    return(
        
        <div>
         <div className="card mt-4">
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                            <th scope="col">lastName</th>
                            <th scope="col">firstName</th>
                            <th scope="col">email</th>
                            <th scope="col">status</th>
                            <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {operateurs.map((operateur)=>{
                            <tr key={operateur.id}>
                                <td>{operateur.lastName}</td>
                                <td>{operateur.firstName}</td>
                                <td>{operateur.email}</td>
                            </tr>
                        })} */}
                        <OperateurRow/>
                      </tbody>
                    </table>
                  </div>
               
                </div>  
        </div>
    )
})