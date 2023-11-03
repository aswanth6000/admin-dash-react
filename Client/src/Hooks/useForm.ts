import { ChangeEvent, useState } from "react";

export const useForm = <T>(initialValue: T) =>{
    const [value, setValue] = useState<T>(initialValue);
    return [value, (event: ChangeEvent<HTMLInputElement>)=>{
        setValue({
            ...value,
            [event.target.name] : event.target.value
        })
    }]

}