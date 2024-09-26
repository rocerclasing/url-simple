import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../Utils/erroresFirebase";
import { FormValidate } from "../Utils/FormValidate";

import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import Title from "../components/Title"
import Button from "../components/Button"
import ButtonLoading from "../components/ButtonLoading";


const Register = () => {
 


    const navegate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const[loading,setLoading] =useState(false)

  const {register,handleSubmit,formState:{errors},getValues,setError } = useForm({
    defaultValues:{
      email:"correo@correo.com"
    },
    
  })

  const {required,patternEmail,minLength, validateTrim,  validateEquals} = FormValidate()
  

  const onSubmit = async({email,password}) => { 
     try {
      setLoading(true)
       await registerUser(email,password);
       navegate("/");
       } catch (error) {
        console.log(error.code)
        const{code,message} = erroresFirebase(error.code)
        setError(code,{message})
        
  }finally{
    setLoading(false)
  }
}

  return (
    <>
      <Title text="Register"></Title>
      <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput  
             type="email" placeholder="Ingrese email"

              {...register("email",{
                required,
                pattern: patternEmail,
            })}
            label="Ingresa tu correo"
          ><FormError error={errors.email} /></FormInput>
          <FormInput 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                {...register("password",{
                    minLength,
                    validate: validateTrim
                })}  
                    label="Inserta la password"
          ><FormError error={errors.password} /></FormInput>

      <FormInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              {...register("repassword",{
                  validate:  validateEquals(getValues("password"))
              })}
                  label="Repita la password"
      >
          <FormError error={errors.repassword} /></FormInput>
          <Button text="Register"  type="submit" loading={loading}/>
      </form>
    </>
  );
};

export default Register;
