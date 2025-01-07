import { statuses,sortStatuses } from "@/consts/sortStatus";
import { sortStatus,status } from "@/types/todos";
interface Props {
    selectStatus:sortStatus|status;
    statuses:typeof statuses|typeof sortStatuses
    onChange:(event: React.ChangeEvent<HTMLSelectElement>)=>void
}

const SortStatesOption = (props:Props) => {
    const {selectStatus,statuses,onChange} =  props 

  return (
    <>
        <label htmlFor="status">ステータス:</label>
        <select
        id="status"
        value={selectStatus}
        onChange={onChange}
        >
        {statuses.map((status)=>( <option key={status} value={status}>{status}</option>))
        }
        </select>
    </>
 
  );
};

export default SortStatesOption;
