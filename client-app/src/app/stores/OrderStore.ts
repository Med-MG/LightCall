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
    orderFiler : Order[]  = Array.from(this.ordersRegistry.values());
    // filterMode = false;

    constructor() {
        makeAutoObservable(this)
    }

    get orders() {
        // return Array.from(this.ordersRegistry.values());
        return this.orderFiler;
    }

    set orders(order : any){
        // const AllOrder = Array.from(this.ordersRegistry.values());
        // AllOrder.filter(x => x.orderId = order)
        // this.orderFiler = AllOrder;
        console.log(order[0])
        switch (order[1]) {
            case 'ProjectName':
                this.orderFiler.filter(x => x.project.project_Type == order[0])
                break;
            case 'Costumer':
                this.orderFiler = this.orderFiler.filter(x => x.customer?.fullName == order[0])
                console.log('frfr',this.orderFiler)
                // this.orderFiler = AllOrder;
                break;
            case 'Phone':
                this.orderFiler.filter(x => x.customer.phone == order[0])
                break;
        
            default:
                break;
        }
    }

    loadOrders = async () => {
        this.setLoadingInitial(true)
        try {
            var orders = await agent.Orders.list();
            

            orders.forEach(order => {
                this.ordersRegistry.set(order.id, order);
            })
            this.orderFiler = orders;
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

    filterOrder = async(orderId : string) =>{
        // this.filterMode = true
        // const AllOrder = Array.from(this.ordersRegistry.values());
        // AllOrder.filter(x => x.orderId == orderId);
        
        this.orders.filter(x => x.orderId == orderId);

        // return AllOrder;
    }


}