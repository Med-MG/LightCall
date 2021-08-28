import { error } from 'node:console';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/Store';
import ProductForm from './ProductForm';



function ProductRow() {

   const {productStore , modalStore} = useStore();

   const {products , deleteProduct , selectProduct} = productStore;

    return ( 
        <>
            {products.map((product)=> (
                <div key={product.id} className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <article className="article">
                        <div className="article-header">
                            {console.log(product)}
                            <div className="article-image" data-background="../assets/img/news/img08.jpg" style={{ backgroundImage: `url(${product.photos![0].url})`}}>
                            </div>
                            <div className="article-title">
                                <h2><a href="#">{product.name}</a></h2>
                            </div>
                        </div>
                        <div className="article-details">
                            <p>{product.description}.</p>
                            <div className="article-cta">
                                <button className="btn btn-primary" onClick={()=> modalStore.openModal(<ProductForm />)}>Read More</button>
                            </div>
                        </div>
                    </article>
                </div>
            )
                )}
        </>
    );
}

export default ProductRow;