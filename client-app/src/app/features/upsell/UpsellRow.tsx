import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/Store";

function UpsellRow(){
    const {upsellStore} = useStore();
    const {selectUpsell, deleteUpsell , Upsells , upselltRegistery}  = upsellStore;
    
    return ( 
        <>
        {console.log(upselltRegistery)}
            {Upsells.map((Upsell)=> {
                return ( 
                    <tr key={Upsell.id}>
                        <td>{Upsell.name}</td>
                        <td>{Upsell.project?.project_Type}</td>
                        <td>{Upsell.product_ids[0]?.name}</td>
                        <td>{String(Upsell.status)}</td>
                        {/* <td>{Upsell.Project}</td> */}
                         {console.log(Upsell.product_ids)}
                        {/* <td>{Upsell.Project}</td> */}
                        <td>
                            <div>
                                <Link to="/Upsell/EditUpsell" onClick={()=> selectUpsell(Upsell.id) } className="btn btn-info mr-2" >Edit</Link>
                                <button className="btn btn-danger" onClick={()=> deleteUpsell(Upsell.id) } >Delete</button>
                            </div>
                        </td>
                    </tr>)}
            )}
        </>
    );
}

export default UpsellRow;