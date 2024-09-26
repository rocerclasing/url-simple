const FormError = ({error}) => {

    return(

        <div>

            <h1>{error&& <p>{error.message}</p>}</h1>

        </div>
    )

}

export default FormError