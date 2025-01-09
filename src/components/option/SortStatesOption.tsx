import { statuses, sortStatuses } from "@/consts/sortStatus";

interface Props {
  selectStatus: string;
  statuses: typeof statuses | typeof sortStatuses;
  onChange: (event: string) => void;
  className?: string; 
}

const SortStatesOption = (props: Props) => {
  const { selectStatus, statuses, onChange,className } = props;

  return (
    <>
      <select
        id="status"
        value={selectStatus}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        {statuses.map((status) => {
          const [, statusName] = status.split(":");
          return (
            <option key={status} value={status}>
              {statusName}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SortStatesOption;

