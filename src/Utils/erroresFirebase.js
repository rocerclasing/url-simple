export const erroresFirebase = (code) => {
    switch(code)
    {
      case "auth/email-already-in-use":
       return{
            code:"email",
            message:"Usuario ya registrado"
       }
      case "auth/invalid-email":
        return{
          code:"email",
          message:"Formato email no valido"
     }
      case"auth/user-not-found":
        return{
          code:"email",
          message:"Usuario no registrado"
     }
      case"auth/wrong-password":
      return{
        code:"password",
        message:"Contraseña Incorrecta"
   }

   case"auth/invalid-credential":
   return{
     code:"password",
     message:"Contraseña Incorrecta, porfavor ingresa la contraseña correcta"
}

      default:
       return{
          code:"password",
          message:"Contraseña Incorrecta"
       }
    }
}