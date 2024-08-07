import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
    const [type, setType] = useState("password");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        const userInfo = {
            email: data.email,
            password: data.password
        }

        setLoading(true);
        await axios.post("https://codersocietyserver.onrender.com/auth/login", userInfo).then((res) => {
            // console.log(res.data)
            setLoading(false);
            toast.success("Login Successfully");
            localStorage.setItem("User", JSON.stringify(res.data.user))
            window.location.reload();
        }).catch((err) => {
            setLoading(false)
            toast.error(err.response.data.message)
        })
    };

    return (
        <section className="content-center p-1 bg-gray-100" id="login">
            <div className="shadow md:p-4 sm:p-2 pt-8 sm-w-full md:w-6/12 mx-auto bg-white rounded-2xl" action="" >
                <h4 className="text-center text-3xl p-3 pb-0 font-bold">
                    Already A Member? Sign In
                </h4>

                <form className="p-4" action="" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type={"email"} id="email"
                        placeholder="✍️ Email address..."
                        {...register("email", {
                            required: "Email is required field"
                        })}
                    />
                    <div className="msg">
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <label htmlFor="password">Password</label>
                    <div className="inputt input-bordered flex items-center ">
                        <input className="w-full m-0" type={type} id="password"
                            placeholder="🗝️ Passsword..."
                            {...register("password", {
                                required: "Password is required field",
                                minLength: {
                                    value: 8,
                                    message: "Password at least 8 characters"
                                }
                            })}
                        />
                        <button
                            type="button"
                            className="btn btn-ghost me-3"
                            onClick={() => (type === "password") ? setType("text") : setType("password")}
                        >
                            <i className='bx bx-show text-2xl'></i>
                        </button>
                    </div>

                    <div className="msg">
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>

                    <button className="btn mx-auto btn-normal hover:shadow px-6 text-xl mt-6">
                        {
                            loading && <span className="loading loading-spinner"></span>
                        }
                        Login
                    </button>

                    <div className="text-center text-xl pt-5 text-gray-600">
                        Don't have an account?
                        <Link className="text-green-500" to={'/register'}> Register Now</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login
