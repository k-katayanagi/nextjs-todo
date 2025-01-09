"use client";

type Props = {
   label:string
   type:string
   name:string
   value:string
   onChange:(event: React.ChangeEvent<HTMLInputElement>)=>void
   className?: string; 
  };

const Input = (props:Props) => {
    const {label,type,name,value,onChange,className} = props
  return (
    <label className={`${className} block`}> 
        {label}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 mx-4 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </label>
  );
};

export default Input;
