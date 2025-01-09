import { orderItems } from "@/consts/orderItem";



interface Props {
    selectOrder:string;
    orderItems:typeof orderItems
    onChange:(event:string)=>void
    className?: string; 
}

const OrderTodoOption = (props:Props) => {
    const {selectOrder,orderItems,onChange} =  props 

  return (
    <>
        <label htmlFor="item">並び替え</label>
        <select
        id="item"
        value={selectOrder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        {orderItems.map((item)=>( <option key={item} value={item}>{item}</option>))
        }
        </select>
    </>
  );
};

export default OrderTodoOption;
