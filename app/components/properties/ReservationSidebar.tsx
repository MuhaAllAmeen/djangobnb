'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { useEffect, useState } from "react";
import {Range} from 'react-date-range'
import DatePicker from "../forms/Calendar";
import apiService from "@/app/services/apiService";

const intialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}
export type Property = {
    id: string;
    price_per_night: number;
    guests: number;
}

interface ReservationSidebarProps{
    userId: string | null
    property: Property
}

const ReservationSidebar:React.FC<ReservationSidebarProps> = ({property, userId}) => {
    const loginModal = useLoginModal()
    const [fee,setFee] = useState<number>(0)
    const [nights,setNights]= useState<number>(1)
    const [totalPrice,setTotalPrice]= useState<number>(0)
    const [dateRange,setDateRange] = useState<Range>(intialDateRange)
    const [guests,setGuests] = useState<string>('1')
    const [bookedDates,setBookedDates] = useState<Date[]>([])
    const guestsRange = Array.from({length: property.guests},(_,index)=> index+1)
    const performBooking = async()=>{
        if (userId){
            if (dateRange.startDate && dateRange.endDate){
                const formData = new FormData()
                formData.append('guests',guests)
                formData.append('start_date',format(dateRange.startDate,'yyyy-MM-dd'))
                formData.append('end_date',format(dateRange.endDate,'yyyy-MM-dd'))

                formData.append('number_of_nights',nights.toString())
                formData.append('total_price',totalPrice.toString())
                
                const response = await apiService.post(`/api/properties/${property.id}/book/`,formData)
                if (response.success){

                }else{

                }
            }
            
        }else{
            loginModal.open()
        }
    }
    const _setDateRange = (selection: any)=>{
        const newStartDate = new Date(selection.startDate)
        const newEndDate = new Date(selection.endDate)
        if (newEndDate<=newStartDate){
            newEndDate.setDate(newStartDate.getDate()+1)
        }
        setDateRange({...dateRange, startDate: newStartDate, endDate: newEndDate})
    }
    const getReservation = async()=>{
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)
        let dates: Date[] = []
        reservations.forEach((reservation:any)=> {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date)
            })
            dates = [...dates,...range]
            setBookedDates(dates)
        })
    }   
    useEffect(()=>{
        getReservation()
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInDays(dateRange.endDate,dateRange.startDate)
            if (dayCount && property.price_per_night){
                const _fee = ((dayCount * property.price_per_night)/100) * 5
                setFee(_fee) 
                setTotalPrice((dayCount * property.price_per_night)+_fee)
                setNights(dayCount)
            }else{
                const _fee = (property.price_per_night / 100) * 5
                setFee(_fee)
                setTotalPrice(property.price_per_night + _fee)
                setNights(1)
            }
        }
    },[dateRange])
    return(
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>
            <DatePicker bookedDate={bookedDates} value={dateRange} onChange={(value)=>_setDateRange(value.selection)} />
            <div className="mb-6 p-3 border border-gray-400 rounded-xl ">
                <label htmlFor="" className="mb-2 block font-bold text-xs">Guests</label>
                <select value={guests} onChange={(e)=>setGuests(e.target.value)} name="" id="" className="w-full -ml-2 text-xm">
                    {guestsRange.map(number=> 
                        (<option value={number} key={number}>{number}</option>)
                    )}
                </select>
            </div>
            <div onClick={performBooking} className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl">
                Book
            </div>
            <div className="mb-4 flex justify-between align-center">
                <p>${property.price_per_night} * {nights} nights</p>
                <p>${property.price_per_night * nights}</p>    
            </div>
            <div className="mb-4 flex justify-between align-center">
                <p>Djanogbnb fee</p>
                <p>${fee}</p>    
            </div>
            <hr />
            <div className="mt-4 flex justify-between align-center font-bold">
                <p>Total</p>
                <p>${totalPrice}</p>    
            </div>
        </aside>
    )
}

export default ReservationSidebar