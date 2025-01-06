"use client";

type Props = {
   label:string
   type:string
   name:string
   value:string
   onChange:(event: React.ChangeEvent<HTMLInputElement>)=>void
  };

const Input = (props:Props) => {
    const {label,type,name,value,onChange} = props
  return (
    <label>
        {label}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </label>
  );
};

export default Input;
