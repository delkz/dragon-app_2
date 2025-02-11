'use client';
import { useForm } from "react-hook-form"
import styles from "./style.module.scss";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthError } from "@supabase/supabase-js";

type Inputs = {
  email: string
  password: string
}

type LoginFormProps = {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<{ isValid: boolean,message: string, error: AuthError }>;
  className?: string;
}

const LoginForm = ({ login, signup }: LoginFormProps) => {

  const [blockButton, setBlockButton] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors }
  } = useForm<Inputs>({ mode: "onChange" })
  const [wrongPassowrd, setWrongPassword] = useState(false)

  const handleLogin = async (data: Inputs) => {
    toast('Validando Login', {icon:'⌛'});
    setBlockButton(true);

    const validCredentials = await login(data.email, data.password);

    if (!validCredentials) {
      setWrongPassword(true);
      setBlockButton(false);
      return;
    }
    
  }

  const handleSignup = async (data: Inputs) => {
    toast('Criando usuario, aguarde', {icon:'⌛'});
    setBlockButton(true);
    const credentials = await signup(data.email, data.password);

    if (!credentials.isValid) {
      toast.error('Algo deu errado ao criar o usuario. Verifique os campos\n' + credentials.message);
    }

    setBlockButton(false);

  }


  return <form className={styles.formContainer} onSubmit={handleSubmit(handleLogin)}>
    <div>
      <label htmlFor="email">Email:</label>
      <input data-testid="email" placeholder="Email" {...register("email", { required: true })} id="email" name="email" type="email" required />
    </div>
    <div>
      <label htmlFor="password">Senha:</label>
      <input data-testid="password" placeholder="Senha" {...register("password", { required: true })} id="password" name="password" type="password" required />
    </div>

    <button data-testid="loginButton" className={styles.btnPrimary} disabled={!isDirty || !isValid || blockButton} type="submit">Fazer login</button>
    <button data-testid="registerButton" className={`${styles.formContainer} btn-secundary`} type="button" onClick={handleSubmit(handleSignup)} disabled={!isDirty || !isValid || blockButton}>Criar novo usuario</button>

    {(errors.password || errors.email) && <span>Verifique os campos</span>}
    {(wrongPassowrd) && <span>Verifique o usuario ou senha</span>}
  </form>
}

export default LoginForm;