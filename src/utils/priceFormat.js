export default function PriceFormat({price}){
    return price?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}