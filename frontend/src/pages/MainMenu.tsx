import axios from "axios";
import CustomForm, { ICustomFormITem } from "../components/CustomForm";
import { useAppDispatch } from "../hooks/redux";
import useFetch from "../hooks/useFetch";
import { userRegister, userAuth } from "../state/userSlice"

interface IRegisterForm {
    email: string;
    password: string;
    name: string;
  }

  interface IAuthForm {
    email: string;
    password: string;
  }

const formRegisterConfig: ICustomFormITem<IRegisterForm>[] = [
    {
      label: "Почта",
      type: "email",
      placeHolder: "Введите свою почту",
      key: "email",
    },
    {
        label: "Пароль",
        type: "password",
        placeHolder: "Введите пароль",
        key: "password",
      },
      {
        label: "Имя",
        type: "text",
        placeHolder: "Введите имя",
        key: "name",
      },
  ];

  const formAuthConfig: ICustomFormITem<IAuthForm>[] = [
    {
      label: "Почта",
      type: "email",
      placeHolder: "Введите свою почту",
      key: "email",
    },
    {
        label: "Пароль",
        type: "password",
        placeHolder: "Введите пароль",
        key: "password",
      },
  ];

export default function MainMenu() {
  const dispatcher = useAppDispatch()

    const registerFormSubmit = async (registerData: IRegisterForm) => {
      dispatcher(userRegister(registerData))
        
    }

    const authFormSubmit = (authData: IAuthForm) => {
      dispatcher(userAuth(authData))
    }


  return (
    <section className="main-menu">
      <div className="container">
        <div className="main-menu__inner">
          <CustomForm submitForm={registerFormSubmit} formTitle="Форма регистрации" formItems={formRegisterConfig} defalultFormState={{password: '', email: '', name: ''}}></CustomForm>
          <CustomForm submitForm={authFormSubmit} formTitle="Форма авторизации" formItems={formAuthConfig} defalultFormState={{password: '', email: '',}}></CustomForm>
          {/* <CustomForm></CustomForm> */}
        </div>
      </div>
    </section>
  );
}
