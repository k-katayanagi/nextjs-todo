interface Props {
    selectStatus:string;
    statuses:string[]
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
