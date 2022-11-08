import { useState } from "react";
import CustomInput from "./CustomInput";

type CustomFormProps<T> = {
    defalultFormState: T,
    formItems: ICustomFormITem<T>[],
    formTitle: string,
    submitForm: (data: T) => void
}

export interface ICustomFormITem<T> {
  label: string;
  type: "email" | "password" | "text";
  placeHolder: string;
  key: keyof T;
  
}

export default function CustomForm<T extends object>({defalultFormState, formItems, formTitle, submitForm}: CustomFormProps<T>) {
  const [formState, setFormState] = useState<T>(defalultFormState);

  const updateFormState = (key: keyof T, value: string) => {
    setFormState({ ...formState, [key]: value });
    
  };

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitForm(formState)
  }

  return (
    <form onSubmit={(event) => formSubmit(event)} className="main-menu__form mt-5">
      <h5>{formTitle}</h5>
      {formItems.map((registerItem) => (
        <CustomInput
          updateInputState={(text) => updateFormState(registerItem.key, text)}
          type={registerItem.type}
          placeHolder={registerItem.placeHolder}
          label={registerItem.label}
        ></CustomInput>
      ))}
      <div className="form-group">
        <button type="submit" className="btn btn-primary mt-1">
          Отправить форму
        </button>
      </div>
    </form>
  );
}
