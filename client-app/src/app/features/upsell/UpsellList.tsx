import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../stores/Store";
import UpsellRow from "./UpsellRow";

export default observer(function UpsellList(){
    const {upsellStore} = useStore();
    useEffect(()=>{
        upsellStore.loadUpSell()
    } , [upsellStore])
    if(upsellStore.loadingInitial) return(<div>Loading...</div>)
    return(
        <div>
           {/* <Link to="/cities/creatCity" className="btn btn-icon icon-left btn-primary"> <i className="fa fa-plus" > </i> Add City  </Link> */}
            <div className="card mt-4">
                <div className="card-body">
                    {/* <CityForm/> */}
                    <table className="table">
                      <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Products</th>
                            <th scope="col">Project</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            {/* <th scope="col">Project</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <UpsellRow/>
                      </tbody>
                    </table>
                </div>
               
            </div>  
        </div>
    )
})