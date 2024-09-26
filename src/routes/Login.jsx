import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../Utils/erroresFirebase";
import { FormValidate } from "../Utils/FormValidate";

import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import Title from "../components/Title";
import Button  from "../components/Button";



const Login = () => {
 

  const { loginUser } = useContext(UserContext);
  const[loading,setLoading] =useState(false)
  const navegate = useNavigate();

  const {register,handleSubmit,formState:{errors},setError } = useForm()

  const {required,patternEmail,minLength, validateTrim} = FormValidate()

  const onSubmit = async({email,password}) => { 
    try {
      setLoading(true)
      await loginUser(email,password);
      navegate("/");
      } catch (error) {
        console.log(error.code)
       const{code,message}=erroresFirebase(error.code)
       setError(code,{message})
     }finally{

        setLoading(false)

     }
 }


  return (
    <>
      <Title text="Login"></Title>
      <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput  
              label="Ingrese tu correo"
             type="email" placeholder="Ingrese email"

              {...register("email",{
                required,
                pattern: patternEmail,
            })}
          ><FormError error={errors.email} /></FormInput>

      <FormInput 
                label="Ingrese password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                {...register("password",{
                    minLength,
                    validate: validateTrim
                })}  
          ><FormError error={errors.password} /></FormInput>

         <Button text="Login"  type="submit" loading={loading}/>
          
        
        
      </form>
    </>
  );
};

export default Login;
