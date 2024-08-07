import axios from "axios"
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";

const Registration = () => {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("password");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            username: data.username,
            name: data.name,
            email: data.email,
            password: data.password
        }

        setLoading(true);
        await axios.post("https://codersocietyserver.onrender.com/auth/register", userInfo).then((res) => {
            setLoading(false);
            toast.success("New Account Created");
            localStorage.setItem("User", JSON.stringify(res.data.user))
            window.location.reload();
        }).catch((err) => {
            setLoading(false);
            toast.error(err.response.data.message)
        })
    };


    return (
        <section className="content-center py-5 bg-gray-100" id="register">
            <div className="shadow-md p-4 md:w-6/12 mx-auto bg-white rounded-2xl" action="" >
                <h4 className="text-center text-3xl pb-0 mt-2 font-bold">
                    Create A New Account
                </h4>

                <form className="px-4" action="" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text" id="username"
                        placeholder="✍️ Username..."
                        {...register("username", {
                            required: "Username is required field",
                            maxLength: {
                                value: 12,
                                message: "Username only 12 character"
                            }
                        })}
                    />
                    <div className="msg">
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>

                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text" id="name"
                        placeholder="😁 Full Name..."
                        {...register("name", {
                            required: "Name is required field"
                        })}
                    />
                    <div className="msg">
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>

                    <label htmlFor="email">Email address</label>
                    <input
                        type="email" id="email"
                        placeholder="📧 Email address..."
                        {...register("email", {
                            required: "Email address is required field"
                        })}
                    />
                    <div className="msg">
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <label htmlFor="password">Password</label>
                    <div className="inputt input-bordered flex items-center ">
                        <input className="w-full p-0.1 m-0" type={type} id="password"
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

                    <button type="submit" className="btn mx-auto btn-normal hover:shadow px-6 text-xl mt-6">
                        {
                            loading && <span className="loading loading-spinner"></span>
                        }
                        Register
                    </button>

                    <div className="text-center text-xl pt-2 text-gray-600">
                        Already have an account?
                        <Link className="text-green-500" to={'/login'}> Login</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Registration
