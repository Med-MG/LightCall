import React, { useEffect } from 'react'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { PolarArea } from 'react-chartjs-2';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/Store';
import { Statistic } from '../../models/Statistic';

const UsersDashboard = () => {
    const [startDate, setStartDate] = useState(new Date());

    const {orderStore  } = useStore()
    const {statistics} = orderStore
    const [statisticsArray] = useState([])

    useEffect(()=>{
      orderStore.loadOrdersStatistic()
  
  } , [orderStore ])

    const dataPolar = {
      labels: [
        "new order",
        "confirmed",
        "no answer",
        "busy",
        "cancelled",
        "call later",
        "double commande"
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [statistics?.ordersNew , statistics?.ordersConfirmer, statistics?.ordersNoAnswer, statistics?.ordersBusy, statistics?.ordersCancel, statistics?.ordersCallLater, statistics?.ordersDoubleCommande] as number[],
        backgroundColor: [
          'rgb(103, 119, 239)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
          'rgb(237, 76, 103)',
          'rgb(247, 159, 31)',
        ],
        clip: -10
      }]
    };
    return (
        <div className="main-content">
        <section className="section">
        <div className="section-header">
            <h1>Dashboard</h1>
            <div className="form-group mb-0 section-header-breadcrumb">
                    <select className="form-control">
                          <option>perrie project</option>
                          <option>lorinmaa</option>
                          <option>octumposu nomu</option>
                    </select>
              </div>
              <div className="form-group mb-0 ml-3">
                      <input type="text" className="form-control  datetimepicker"/>
              </div>
              {/* <div className="form-group">
                    <DatePicker className="btn btn-primary daterange-btn icon-left btn-icon" selected={startDate} onChange={(date) => setStartDate(date)} >
                      <i className="fas fa-calendar"></i>
                    </DatePicker>
                </div> */}
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                  <div className="card-icon bg-primary">
                    <i className="far fa-user"></i>
                  </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Orders</h4>
                    </div>
                    <div className="card-body">
                      {statistics?.orders}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-circle"></i>
                </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>New Orders</h4>
                    </div>
                    <div className="card-body">
                    {statistics?.ordersNew}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                <div className="card-icon bg-danger">
                  <i className="far fa-newspaper"></i>
                </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Confirmed</h4>
                    </div>
                    <div className="card-body">
                    {statistics?.ordersConfirmer}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                  <div className="card-icon bg-primary">
                    <i className="far fa-user"></i>
                  </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Delivered</h4>
                    </div>
                    <div className="card-body">
                    {statistics?.ordersLivrer}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                <div className="card-icon bg-warning">
                  <i className="far fa-file"></i>
                </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Cancelled</h4>
                    </div>
                    <div className="card-body">
                    {statistics?.ordersCancel}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                  <div className="card-icon bg-primary">
                    <i className="far fa-user"></i>
                  </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Call Later</h4>
                    </div>
                    <div className="card-body">
                    {statistics?.ordersCallLater}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                <div className="card-icon bg-warning">
                  <i className="far fa-file"></i>
                </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Busy</h4>
                    </div>
                    <div className="card-body">
                    {statistics?.ordersBusy}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                  <div className="card-icon bg-primary">
                    <i className="far fa-user"></i>
                  </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Double Commande</h4>
                    </div>
                    <div className="card-body">
                    {statistics?.ordersDoubleCommande}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12">
              <div className="card">
                <div className="card-header">
                  <h4>CA Statistics</h4>
                  <div className="card-header-action">
                    <div className="dropdown">
                      <a href="#" className="dropdown-toggle btn btn-primary" data-toggle="dropdown">Filter</a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a href="#" className="dropdown-item has-icon"><i className="far fa-circle"></i> Cost</a>
                        <a href="#" className="dropdown-item has-icon"><i className="far fa-circle"></i> Profits</a>                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">View All</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="summary">
                    <div className="summary-item">
                      <h6>cost List <span className="text-muted">(4 Items)</span></h6>
                      <ul className="list-unstyled list-unstyled-border">
                        <li className="media">
                          <a href="#">
                            <img className="mr-3 rounded" width="50" src="../assets/img/products/product-1-50.png" alt="product"/>
                          </a>
                          <div className="media-body">
                            <div className="media-right">14000 MAD</div>
                            <div className="media-title"><a href="#">CA Confirmed</a></div>
                            <div className="text-muted text-small">project <a href="#">perrie</a> <div className="bullet"></div> Today</div>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#">
                            <img className="mr-3 rounded" width="50" src="../assets/img/products/product-2-50.png" alt="product"/>
                          </a>
                          <div className="media-body">
                            <div className="media-right">14998 MAD</div>
                            <div className="media-title"><a href="#">CA Prevision</a></div>
                            <div className="text-muted text-small">by <a href="#">Hasan Basri</a> <div className="bullet"></div> Sunday
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#">
                            <img className="mr-3 rounded" width="50" src="../assets/img/products/product-3-50.png" alt="product"/>
                          </a>
                          <div className="media-body">
                            <div className="media-right">10567 MAD</div>
                            <div className="media-title"><a href="#">CA Delivered</a></div>
                            <div className="text-muted text-small">project <a href="#">perrie</a> <div className="bullet"></div> Today
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#">
                            <img className="mr-3 rounded" width="50" src="../assets/img/products/product-3-50.png" alt="product"/>
                          </a>
                          <div className="media-body">
                            <div className="media-right">2300 MAD</div>
                            <div className="media-title"><a href="#">CA Cancelled</a></div>
                            <div className="text-muted text-small">project <a href="#">perrie</a> <div className="bullet"></div> Today
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Best Products</h4>
                  </div>
                  <div className="card-body">
                    <OwlCarousel className="owl-theme" loop={true} margin={10} nav >
                    <div>
                        <div className="product-item pb-3">
                          <div className="product-image">
                            <img alt="image" src="../assets/img/products/product-4-50.png" className="img-fluid"/>
                          </div>
                          <div className="product-details">
                            <div className="product-name">Skyfall - Noir</div>
                            <div className="product-review">
                                norland project
                            </div>
                            <div className="text-muted text-small">17 confirmed orders</div>
                            <div className="product-cta">
                              <a href="#" className="btn btn-primary">Detail</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="product-item">
                          <div className="product-image">
                            <img alt="image" src="../assets/img/products/product-3-50.png" className="img-fluid"/>
                          </div>
                          <div className="product-details">
                            <div className="product-name">Coffret cadeau offert</div>
                            <div className="product-review">
                              Perrie project
                            </div>
                            <div className="text-muted text-small">11 confirmed orders</div>
                            <div className="product-cta">
                              <a href="#" className="btn btn-primary">Detail</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="product-item">
                          <div className="product-image">
                            <img alt="image" src="../assets/img/products/product-1-50.png" className="img-fluid"/>
                          </div>
                          <div className="product-details">
                            <div className="product-name">Coffret cadeau offert</div>
                            <div className="product-review">
                                linar sockes project
                            </div>
                            <div className="text-muted text-small">08 confirmed orders</div>
                            <div className="product-cta">
                              <a href="#" className="btn btn-primary">Detail</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </OwlCarousel>
          
                  </div>
                </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6" style={{height:"100%"}}>
                <div className="card">
                  <div className="card-header">
                    <h4>Perrie project</h4>
                  </div>
                  <div className="card-body">
                    <PolarArea data={dataPolar} width={350} height={350} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>
          </div>
          
        </section>
      </div>
    )
}

export default observer(UsersDashboard) ;
