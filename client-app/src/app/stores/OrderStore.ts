import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';

import { v4 as uuid } from 'uuid';
import { Order } from '../models/Order';
import { Statistic } from '../models/Statistic';
import { OrderSheet } from '../models/OrderSheet';

export default class OrderStore {

    ordersRegistry = new Map<string, Order>();
    selectedOrder: Order | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    assignedOrder: Order | undefined = undefined;
    statistics : Statistic | undefined = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    get orders() {

        return Array.from(this.ordersRegistry.values());

    }

    loadOrders = async () => {

        this.setLoadingInitial(true)
        try {
            var orders = await agent.Orders.list();


            orders.forEach(order => {
                this.ordersRegistry.set(order.id, order);
            })
            
            this.setLoadingInitial(false)

        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }

    }

    loadOrdersStatistic = async () => {

        this.setLoadingInitial(true)
        try {
            this.statistics  = await agent.Orders.Statistic();

            this.setLoadingInitial(false)

        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }

    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectOrder = (id: string) => {
        this.selectedOrder = this.ordersRegistry.get(id);

    }
    canselSelectedStatus = () => {
        this.selectedOrder = undefined;

    }

    AssigneOrder = async () => {
        this.loading = true;
        try {
            var order = await agent.Orders.assigne();
            runInAction(() => {
                this.assignedOrder = order
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {

                this.loading = false;
            })
        }

    }

    InAssigneOrder = async (id: string) => {
        this.loading = true;
        try {
            await agent.Orders.inAssigne(id);
            runInAction(() => {
                this.assignedOrder = undefined;
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {

                this.loading = false;
            })
        }

    }

    createOrder = async (order: Order) => {

        this.loading = true;
        order.id = uuid();
        try {
            await agent.Orders.create(order);
            runInAction(() => {
                this.ordersRegistry.set(order.id, order);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {

                this.loading = false;
            })
        }
    }

    updateOrder = async (order: Order) => {

        this.loading = true;

        try {
            await agent.Orders.update(order);
            runInAction(() => {
                this.ordersRegistry.set(order.id, order);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {

                this.loading = false;
            })
        }
    }

    deleteOrder = async (id: string) => {
        this.loading = true;
        try {
            await agent.Orders.delete(id);
            runInAction(() => {
                this.ordersRegistry.delete(id);
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false
            })
        }
    }


    UpdateOperateur = async () => {
        this.loading = true;
        try {
             await agent.Orders.updateOperateur();
            runInAction(() => {
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {

                this.loading = false;
            })
        }

    }


        OperateurStatus = async () => {
        this.loading = true;
        try {
             await agent.Orders.OperateurStatus();
            runInAction(() => {
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {

                this.loading = false;
            })
        }

    }

    UploadExel = async (file : FormData) => {
        this.loading = true;
        try {
             await agent.Orders.uploadExcel(file);
            runInAction(() => {
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {

                this.loading = false;
            })
        }
    }

    sheetConnect = async(infoSheet :OrderSheet ) => {
        this.loading = true;
        try{
            console.log(infoSheet)
            await agent.Orders.sheetConnect(infoSheet);
            runInAction(() => {
                this.loading = false;
            })
        }catch (error) {
            runInAction(() => {

                this.loading = false;
            })
        }
    }



}