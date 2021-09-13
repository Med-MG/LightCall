import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../stores/Store";
import UpsellRow from "./UpsellRow";
//Datatable Modules
// var dt = require( 'datatables.net' )();
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

export default observer(function UpsellList(){
    // componentDidMount() {
    //     $(document).ready(function () {
    //         $('#myTable').DataTable();
    //     });
    //  }
    // componentDidMount();
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
                    <div className="table-responsive">
                    {/* <CityForm/> */}
                        <table id="example" className="table table-striped" >
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
        </div>

        
    )
})
// function componentDidMount() {
//     $(document).ready(function () {
//         setTimeout(function(){
//         $('#example').DataTable();
//          } ,1000);
//     });
// }

