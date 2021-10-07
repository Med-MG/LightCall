import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/Store";
import UpsellForm from "./UpsellForm";
const $ = require('jquery');
$.DataTable = require('datatables.net');

function UpsellRow(){
    
    const {upsellStore, modalStore} = useStore();
    const {selectUpsell, deleteUpsell , Upsells , upselltRegistery}  = upsellStore;
    function EditUpsel(id: string){
        modalStore.openModal(<UpsellForm />);
        selectUpsell(id)
       }
    return ( 
        <>
        {console.log(upselltRegistery)}
        {console.log(Upsells)}
            {Upsells.map((Upsell)=> {
                return ( 
                    
                    <tr key={Upsell.id}>
                        <td>{Upsell.name}</td>
                        {/* <td>{Upsell.project?.project_Type}</td> */}
                        
                        
                        <td>{Upsell.product_ids  ? Upsell.product_ids [0]?.name : null}</td>
                        <td>{Upsell.project?.project_Type}</td> 
                        <td>{String(Upsell.status)}</td>
                        
                         {console.log(Upsell.product_ids )}
                        {/* <td>{Upsell.Project}</td> */}
                        <td>
                            <div>
                                <button onClick={()=>EditUpsel(Upsell.id)} className="btn btn-info mr-2" >Edit</button>
                                <button className="btn btn-danger" onClick={()=> deleteUpsell(Upsell.id) } >Delete</button>
                            </div>
                        </td>
                    </tr>)}
            )}
        </>
    );
}

export default UpsellRow;