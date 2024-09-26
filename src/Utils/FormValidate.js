export const FormValidate = () => {

    return{

        required:{
            value:true,
            message:'Campo Obligatorio'

      },

      
      patternEmail:{

        value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/  ,
        message: "Formato email incorrecto"
      },

      minLength:{
        value: 6,
        message:"Minimo 6 caracteres"
    },

    validateTrim:{ trim:(v)=>{

        if(!v.trim()){
            return "Escribe algo"
        }

        return true

    }},
    validateEquals(value){
       return{
               equals:v => v=== value || "No coincide con las contraseñas",
                 // message:"No coincide con las contraseñas"
       }
    }
    }
}