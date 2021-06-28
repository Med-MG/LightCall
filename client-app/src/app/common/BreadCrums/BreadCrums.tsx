import React from 'react'
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';

const BreadCrums = () => {
    const breadcrumbs = useReactRouterBreadcrumbs();
    return (
        <>
        {breadcrumbs.map(({
                match,
                breadcrumb
            }) => (
                <div className="breadcrumb-item" key={match.url}>
                        <Link to={match.url}>{breadcrumb}</Link>
                </div>
            ))}
        </>
    )
}

export default BreadCrums
