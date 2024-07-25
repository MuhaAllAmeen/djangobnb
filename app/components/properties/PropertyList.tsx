'use client';
import { useEffect,useState } from "react";
import PropertyListItem from "./PropertyListItem"
import apiService from "@/app/services/apiService";
import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

export type PropertyType = {
    id: string;
    title: string;
    price_per_night: number;
    image_url: string;
    is_favorite: boolean;
}
interface PropertyListProps{
    landlord_id?: string | null;
    favorite?: boolean | null
}
const PropertyList:React.FC<PropertyListProps> = ({landlord_id, favorite}) => {
    const searchModal = useSearchModal()
    const params = useSearchParams()
    const country = searchModal.query.country
    const numGuest = searchModal.query.guests
    const numBathrooms = searchModal.query.bathrooms
    const numBedroom = searchModal.query.bedrooms
    const checkInDate = searchModal.query.checkIn
    const checkOutDate = searchModal.query.checkOut
    const category = searchModal.query.category
    const [properties,setProperties] = useState<PropertyType[]>([]);
    
    const markFavorite = (id: string, is_favorite:boolean)=>{
        const tmpProperties = properties.map((property: PropertyType)=>{
            if(property.id == id){
                property.is_favorite = is_favorite
                
            }
            return property;
        })
        setProperties(tmpProperties)
    }
    const getProperties = async ()=>{
        let url = '/api/properties/'
        if (landlord_id){
            url+=`?landlord_id=${landlord_id}`
        }else if (favorite){
            url+= '?is_favorites=true'
        }else{
            let urlQuery = ''
            if (country){
                urlQuery+='&country='+country
            }
            if (numGuest){
                urlQuery+='&numGuests='+numGuest
            }
            if (numBathrooms){
                urlQuery+='&numBathrooms='+numBathrooms
            }
            if (numBedroom){
                urlQuery+='&numBedrooms='+numBedroom
            }
            if (checkInDate){
                urlQuery+='&checkIn='+format(checkInDate,'yyyy-MM-dd')
            }
            if (checkOutDate){
                urlQuery+='&checkOut='+format(checkOutDate,'yyyy-MM-dd')
            }
            if (category){
                urlQuery+='&category='+category
            }
            if (urlQuery.length){
                urlQuery= '?'+urlQuery.substring(1)
                url +=urlQuery
            }
        }
        const tmpProperties = await apiService.get(url)
        setProperties(tmpProperties.data.map((property: PropertyType)=>{
            if (tmpProperties.favorites.includes(property.id)){
                property.is_favorite = true
            }else{
                property.is_favorite = false
            }
            return property
        }));


    }
    useEffect(()=>{
        getProperties()
    },[category, searchModal.query,params])
    return(
        <>
            {properties.map((property)=>{
                return(
                    <PropertyListItem 
                        key = {property.id}
                        property = {property}
                        markFavorite = {(is_favorite:any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}

        </>
    )
}

export default PropertyList

