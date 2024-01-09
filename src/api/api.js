import axios from "./index";

export const getTest = () =>{
    return axios.get('http://127.0.0.1:8000/api/hello/sayHello/小明');
}

export const login = (data) =>{
    return axios.post('http://localhost:8000/api/UserController/login',data)
}
export const getUserInfo = (userId) =>{
    return axios.get("http://localhost:8000/api/UserController/getUserById",{
        params:{
            userId:userId,
        }
    })
}

export const register = (telephone,password,userName,userSex,config)=>{
    return axios.post('http://localhost:8000/api/UserController/register',{
        telephone:telephone,
        password:password,
        userName:userName,
        userSex:userSex,
    },config)
}

export const getAllBusinessList=()=>{
    return axios.get("http://localhost:8000/api/BusinessController/listAll")
}

export const createOrder=(data)=>{
    return axios.post("http://localhost:8000/api/OrdersController/createOrders",data)
}

export const getMyOrdersList=(userId)=>{
    return axios.get("http://localhost:8000/api/OrdersController/listOrdersByUserId",{
        params:{
            userId:userId,
        }
    })
}

export const getOrderByOrderId=(orderId)=>{
    return axios.get("http://localhost:8000/api/OrdersController/getOrdersById",{
        params:{
            ordersId:orderId,
        }
    })
}

export const getBusinessListByOrderType=(orderType)=>{
    return axios.get("http://localhost:8000/api/BusinessController/listBusinessByOrderTypeId",{
        params:{
            orderTypeId:orderType,
        }
    })
}

export const getBusinessInfoById=(businessId)=>{
    return axios.get("http://localhost:8000/api/BusinessController/getBusinessById",{
        params:{
            businessId:businessId,
        }
    })
}

export const getFoodByBusinessId=(businessId)=>{
    return axios.get("http://localhost:8000/api/FoodController/listFoodByBusinessId",{
        params:{
            businessId:businessId,
        }
    })
}

export const getCartByUserIdAndBusinessId=(userId,businessId)=>{
    return axios.get("http://localhost:8000/api/CartController/getCart",{
        params:{
            userId:userId,
            businessId:businessId,
        }
    })
}

export const saveCart=(data)=>{
    return axios.post("http://localhost:8000/api/CartController/saveCart",data)
}

export const updateCart=(data)=>{
    return axios.post("http://localhost:8000/api/CartController/updateCart",data)
}


export const removeCart=(requestData)=>{
    return axios.delete("http://localhost:8000/api/CartController/removeCart",{data:requestData},)
}

export const getUserAddresses=(userId)=>{
    return axios.get("http://localhost:8000/api/DeliveryAddressController/listDeliveryAddressByUserId",{
        params:{
            userId:userId,
        }
    })
}

export const addUserAddress=(data)=>{
    return axios.post("http://localhost:8000/api/DeliveryAddressController/saveDeliveryAddress",data)
}

export const deleteUserAddress=(daId)=>{
    return axios.delete("http://localhost:8000/api/DeliveryAddressController/removeDeliveryAddress",{
        params:{
            daId:daId,
        }
    })
}

export const getAddressByDaId=(daId) => {
    return axios.get("http://localhost:8000/api/DeliveryAddressController/getDeliveryAddressById",{
        params:{
            daId:daId,
        }
    })
}

export const updateAddress=(data) =>{
    return axios.post("http://localhost:8000/api/DeliveryAddressController/updateDeliveryAddress",data)
}

export const payMyOrder=(data)=>{
    return axios.post("http://localhost:8000/api/UserController/payOrder",data)
}

export const searchBusinessByName = (searchContent)=>{
    return axios.get('http://localhost:8000/api/BusinessController/listBySearch',{
        params:{
            searchContent:searchContent,
        }
    })
}

export const getOrdersByUserIdAndBusinessId = (userId,businessId)=>{
    return axios.get('http://localhost:8000/api/OrdersController/getOrdersByUserIdAndBusinessId',{
        params:{
            userId:userId,
            businessId:businessId,
        }
    })
}

export const deleteOrderById = (orderId)=>{
    return axios.delete('http://localhost:8000/api/OrdersController/deleteOrderById',{
        params:{
            orderId:orderId,
        }
    })
}
