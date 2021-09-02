import axios, { AxiosResponse , AxiosError } from 'axios';
import { City } from '../models/city';
import { Operateur } from '../models/Operateur';
import { Order } from '../models/Order';
import { shippingCompany } from '../models/shippingCompany';
import { Project } from '../models/Project';
import { User, UserFormValues } from '../models/User';
import { store } from '../stores/Store';
// import { User, UserFormValues } from '../models/user';
import { Status } from './../models/Status';
import { Product } from '../models/Product';
import { UpSell } from '../models/UpSell';
import { OrderSheet } from '../models/OrderSheet';
import { toast } from 'react-toastify';
import { history } from '../..';
import { ProfileFormValues } from './../models/User';
import { Statistic } from '../models/Statistic';
import { Photo } from '../models/Photo';



const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

//this peace of code makes sure that we send our token with every request
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})


axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
const {data, status} = error.response!;
switch (status) {
    case 400:
        if(data.errors){
            const modalStateErrors: any = [];
            for (const key in data.errors) {
                if(data.errors[key]){
                    modalStateErrors.push(data.errors[key])
                }
            }
            throw modalStateErrors.flat();
        }else {
            toast.error(data);
        }
        break;
    case 401:
        toast.error('unauthorized');
        break;
    case 404:
        // toast.error('not found');
        history.push('/404');
        break;
    case 500:
        store.commonStore.setServerError(data);
        history.push('/server-error');
        break;
}
return Promise.reject(error);
})



const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Orders = {
    list: () => requests.get<Order[]>('/Order'),
    Statistic: () => requests.get<Statistic>('/Order/statistic'),
    details: (id: string) => requests.get<Order>(`/Order/${id}`),
    create: (order: Order) => requests.post<void>('/Order', order),
    update: (order: Order) => requests.put<void>(`/Order/${order.id}`, order),
    updateStatus: (status: Status) => requests.put<void>(`/Order/status/${status.id}`, status),
    delete: (id: string) => requests.del<void>(`/Order/${id}`),
    assigne: () => requests.put<Order>('/Order/AsinOrder', {}),
    inAssigne: (id: string) => requests.put<void>(`/Order/inAsinOrder/${id}`, {}),
    updateOperateur: () => requests.put<void>(`/Order/operateur` , {}),
    uploadExcel : (importFile: FormData) => requests.post<void>('/Order/Import', importFile ),
    sheetConnect : (OrderSheet : OrderSheet) => requests.post<void>('/Order/sheet', OrderSheet )

}

const Staties = {
    list: () => requests.get<Status[]>('/Status'),
    details: (id: string) => requests.get<Status>(`/Status/${id}`),
    create: (status: Status) => requests.post<void>('/Status', status),
    update: (status: Status) => requests.put<void>(`/Status/${status.id}`, status),
    delete: (id: string) => requests.del<void>(`/Status/${id}`)
}

const Cities = {
    list: () => requests.get<City[]>('/Cities'),
    details: (id: string) => requests.get<City>(`/Cities/${id}`),
    create: (city: City) => requests.post<void>('/Cities', city),
    update: (city: City) => requests.put<void>(`/Cities/${city.id}`, city),
    delete: (id: string) => requests.del<void>(`/Cities/${id}`)

}
const Upsell = {
    list: () => requests.get<UpSell[]>('/Upsell'),
    details: (id: string) => requests.get<UpSell>(`/Upsell/${id}`),
    create: (upsell: UpSell) => requests.post<void>('/Upsell', upsell),
    update: (upsell: UpSell) => requests.put<void>(`/Upsell/${upsell.id}`, upsell),
    delete: (id: string) => requests.del<void>(`/Upsell/${id}`)
}

const Projects = {
    list: () => requests.get<Project[]>('/Project'),
    details: (id: string) => requests.get<Project>(`/Project/${id}`),
    create: (project: Project) => requests.post<void>('/Project', project),
    update: (project: Project) => requests.put<void>(`/Project/${project.id}`, project),
    delete: (id: string) => requests.del<void>(`/Project/${id}`)
}

const Products = {
    list: () => requests.get<Product[]>('/Product'),
    details: (id: string) => requests.get<Project>(`/Product/${id}`),
    create: (product: Product ) => {
        console.log(product);
        let formData = new FormData();
        formData.append('file', product.file!);
        formData.append('projectId', product.id!);
        formData.append('description', product.description!);
        formData.append('quantity', product.quantity!);
        formData.append('id', product.id!);
        formData.append('name', product.name!);
        // return axios.post<Photo>('/photo', formData, {
        //     headers : {'Conetent-type':'multipart/form-data'}
        // })
         return axios.post<void>('/Product', formData, {
             headers : {'Conetent-type':'multipart/form-data'}
         })
        
    },
    update: (product: Product ) => {
        console.log(product);
        let formData = new FormData();
        formData.append('file', product.file!);
        formData.append('projectId', product.id!);
        formData.append('description', product.description!);
        formData.append('quantity', product.quantity!);
        formData.append('id', product.id!);
        formData.append('name', product.name!);
        // return axios.post<Photo>('/photo', formData, {
        //     headers : {'Conetent-type':'multipart/form-data'}
        // })
         return axios.put<void>(`/Product/${product.id}`, formData, {
             headers : {'Conetent-type':'multipart/form-data'}
         })
        
    },
    // update: (product: Product) => requests.put<void>(`/Product/${product.id}`, product),
    delete: (id: string) => requests.del<void>(`/Product/${id}`)
}

const OperateurAcc = {
    list: () => requests.get<Operateur[]>('/OperateurAccount'),
    details: (id: string) => requests.get<Operateur>(`/OperateurAccount/${id}`),
    create: (operateur: Operateur) => requests.post<void>('/OperateurAccount', operateur),
    update: (operateur: Operateur) => requests.put<void>(`/OperateurAccount/${operateur.id}`, operateur),
    delete: (id: string) => requests.del<void>(`/OperateurAccount/${id}`)
}

const ShippingCompany = {
    list: () => requests.get<shippingCompany[]>('/ShippingCompany'),
    details: (id: string) => requests.get<shippingCompany>(`/ShippingCompany/${id}`),
    create: (shippingCompany: shippingCompany) => requests.post<void>('/ShippingCompany', shippingCompany),
    update: (shippingCompany: shippingCompany) => requests.put<void>(`/ShippingCompany/${shippingCompany.id}`, shippingCompany),
    delete: (id: string) => requests.del<void>(`/ShippingCompany/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    updateProfile: (profile: ProfileFormValues) => requests.put<User>('/account', profile)
}

const agent = {
    Orders,
    Account,
    Staties,
    OperateurAcc,
    Cities,
    ShippingCompany,
    Projects,
    Products,
    Upsell
}

export default agent;

