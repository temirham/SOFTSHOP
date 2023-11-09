import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        isAuthenticated: false,
        isStaff: false,
        Draw: [],
        PaymentSoft: [],
        Softs: [],
        Payment: [],
        SumShoppingCart: 0,
        Soft_id: 0,
        User_id: 0,
    },
    reducers: {
        setSofts(state, {payload}) {  // изменяем состояние на полученные данные
            state.Softs = payload
        },
        setPayment(state, {payload}) {  // изменяем состояние на полученные данные
            state.Payment = payload
        },
        setSum(state, {payload}) {  // суммируем цены выбранных товаров
            state.SumShoppingCart += payload
        },
        setDraw(state, {payload}) {
            state.Draw = payload
        },
        setPaymentSoft(state, {payload}) {
            state.PaymentSoft = payload
        },
        delSum(state) {  // обнуляем сумму выбранных товаров
            state.SumShoppingCart = 0
        },
        setIsAuthenticated(state, {payload}){
            state.isAuthenticated = payload
        },
        setIsStaff(state, {payload}){
            state.isStaff = payload
        },
        setSoft_id(state, {payload}){
            state.Soft_id = payload
        },
        setUser_id(state, {payload}){
            state.User_id = payload
        },
        delDraw(state) {  // обнуляем сумму выбранных товаров
            state.Draw = [];
        },
        delPaymentSoft(state) {  // обнуляем сумму выбранных товаров
            state.BookingService = [];
        },
    }
})


export const useSofts = () =>
    useSelector((state) => state.ourData.Softs)

export const usePayment = () =>
    useSelector((state) => state.ourData.Payment)

export const useDraw = () =>
    useSelector((state) => state.ourData.Draw)

export const usePaymentSoft = () =>
    useSelector((state) => state.ourData.PaymentSoft)

export const useSoft_id = () =>
    useSelector((state) => state.ourData.Soft_id)
export const useUser_id = () =>
    useSelector((state) => state.ourData.User_id)
export const useSum = () =>
    useSelector((state) => state.ourData.SumShoppingCart)
export const useIsAuthenticated = () =>
    useSelector((state) => state.ourData.isAuthenticated)
export const useIsStaff = () =>
    useSelector((state) => state.ourData.isStaff)

export const {
    setSofts: setSoftsAction,
    setPayment: setPaymentAction,
    setDraw: setDrawAction,
    setPayment: setBookingSoftAction,
    setSoft_id: setSoft_idAction,
    setUser_id: setUser_idAction,
    setSum: setSumAction,
    delSum: delSumAction,
    delDraw: delDrawAction,
    delPaymentSoft: delPaymentSoftAction,
    setIsAuthenticated: setIsAuthenticatedAction,
    setIsStaff: setIsStaffAction,
} = dataSlice.actions


export default dataSlice.reducer