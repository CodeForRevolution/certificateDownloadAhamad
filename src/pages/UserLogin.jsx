import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { Toaster, toast } from 'sonner';

function UserLogin() {
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })

	async function handleFormData(data) {
		const docRef = doc(db, data.category, data.registerationNo)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			console.log(docSnap.data())
			navigate('/certificate', { state: { data: docSnap.data(), category: data.category } })
		} else {
			toast.error("Data not found! Try again...", {
				position: "top-center",
				duration: 4000,
			})
		}
	}

	return (
		<>
			<main className="h-screen bg-[url(/images/Hexagon.svg)] bg-center bg-cover grid place-content-center">
				<Toaster richColors />
				<div className="bg-transparent backdrop-blur-[8px] rounded-lg flex flex-col justify-center p-6 shadow-[4px_4px_8px_2px_rgba(255,255,255,0.2)] border border-gray-400">
					<div className="grid place-items-center">
						<img className="w-[80px]" src="/images/cert-icon.png" alt="" />
					</div>
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-2 mx-6 text-center text-2xl font-bold leading-9 text-white">
							<p>Download and verify</p>
							<p>Your Certificate</p>
						</h2>
					</div>
					<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
						<form
							onSubmit={handleSubmit(handleFormData)}
						>
							<div>
								<label
									htmlFor="regNo"
									className="block text-sm font-medium leading-6 text-white"
								>
									Registration no.:
								</label>
								<div className="mt-2">
									<input
										id="regNo"
										name="text"
										type="text"
										placeholder="Enter Registration Number"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 px-2"
										{...register("registerationNo")}
									/>
								</div>
							</div>
							<div className="grid mt-4">
								<label
									htmlFor="course"
									className="block text-sm font-medium leading-6 text-white mb-2"
								>
									What do you want?
								</label>
								<select
									className="outline-none ring-1 ring-inset ring-gray-300 rounded-md p-1 w-full"
									name=""
									id=""
									required
									{...register("category", { required: true })}
								>
									<option hidden>Pick one</option>
									<option value="certificate">Certificate</option>
									<option value="marksheet">Marksheet</option>
								</select>
							</div>
							<div>
								<button
									type="submit"
									className="w-full p-2 mt-4 bg-blue-500 border-2 border-blue-500 text-white rounded-md font-semibold hover:bg-white hover:text-blue-500 hover:border-2 hover:border-blue-500 duration-200"
								>
									SUBMIT
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	)
}

export default UserLogin