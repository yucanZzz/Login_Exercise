import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";


const ValidatedLoginForm:React.FC = () => {
    // 'Remember me' should pass with the parameter: yes/no
    const [remember, setRemember] = React.useState<boolean>(false)
    
    return(
        //Use thirty party, Formik and Yup to validate the login form
        <Formik
            initialValues={{ email: "", password: "", rememberMe: "" }}
            // Handle submission.
            onSubmit={(values, {setSubmitting}) => {
                fetch('127.0.0.1:8000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(
                    async (response:Response) => {
                        if(response.status === 200){
                            // do something
                        }else{
                            setSubmitting(false)
                        }
                    }
                )
            }}

            // const RegEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

            // Using Yum for validation
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required("This field is required."),
                password: Yup.string()
                    .required("Please enter the password.")
                    .min(8, "Password must be at least 8 digits.")
                    .matches(/(?=.*[0-9])/, "Password must contain a number.")
                })
            }
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {errors.email && touched.email && (<p className="error">{errors.email}</p>)}
                            </div>
                            <div>
                                <label htmlFor="email">Password</label>
                                <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {errors.password && touched.password && (<div className="error">{errors.password}</div>)}
                            </div>
                            <div>
                                <input 
                                type="checkbox" 
                                name="rememberMe"
                                checked={remember}
                                onClick={()=>{setRemember(!remember)}}
                                onChange={handleChange} 
                                value={remember?values.rememberMe='yes':values.rememberMe='no'}/>
                                <label htmlFor="remember">Remember me?</label>
                            </div>
                            <button type="submit" disabled={isSubmitting}>Login</button>
                        </form>
                        <ul>
                            <li>
                                <p><a href="blank">Forgot your password?</a></p>
                                <p>Don't have an account? <a href="blank">Sign up</a></p>
                                <p><a href="blank">Resend email confirmation</a></p>
                            </li>
                        </ul>
                    </>
                
                );
            }}
        </Formik>
    )
}
    



export default ValidatedLoginForm;