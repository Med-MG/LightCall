import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/Store";
import UpsellForm from "./UpsellForm";

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
                        <td>{Upsell.project?.project_Type}</td>
                        <td>{Upsell.Products_ids ? Upsell.Products_ids[0]?.name : null}</td>
                        <td>{String(Upsell.status)}</td>
                        {/* <td>{Upsell.Project}</td> */}
                         {console.log(Upsell.Products_ids)}
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