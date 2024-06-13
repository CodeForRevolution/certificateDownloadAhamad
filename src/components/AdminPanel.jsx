import { useState } from "react"
import { useForm } from "react-hook-form"
import { db, storage } from "../config/firebase"
import { setDoc, doc } from "firebase/firestore"
import * as XLSX from "xlsx"
import { ref, uploadBytes } from "firebase/storage"
import { Toaster, toast } from 'sonner';

function AdminPanel() {
	const { register, handleSubmit } = useForm()
	const [loader, setLoader] = useState(false)
	const [imageLoader, setImageLoader] = useState(false)
	const [images, setImages] = useState(null);

	async function handleUpload(data) {
		data.excelFile[0].arrayBuffer().then(async (sheetData) => {
			const allSheet = XLSX.read(sheetData)
			const json = XLSX.utils.sheet_to_json(allSheet.Sheets.Sheet1)

			json.forEach(async (entry) => {
				setLoader(true)
				await setDoc(doc(db, data.category, JSON.stringify(entry.registration_no)), entry)
				setLoader(false)
			});
		})
	}

	const uploadFiles = async (e) => {
		e.preventDefault()
		if (!images) {
			return
		}
		for (let i = 0; i < images.length; i++) {
			setImageLoader(true)
			const imageRef = ref(storage, `/studentImages/${images[i].name}`);
			await uploadBytes(imageRef, images[i])
		}
		setImageLoader(false)
	};

	async function handleDocUpload(e, category) {
		const file = e.target.files[0];
		const imageRef = ref(storage, `/document/${category}`);
		await uploadBytes(imageRef, file)
			.then(() => {
				toast.success("Image uploaded successfully", {
					position: "top-center",
					duration: 4000,
				})
			})
	}

	function handleLogout() {
		localStorage.clear("login")
		window.location.reload()
	}

	return (
		<>
			<Toaster richColors />
			<div className="m-4 grid place-items-center h-[90vh]">
				<div>
					<div className="text-center">
						<h1 className="text-4xl font-bold text-gray-900">ADMIN PANEL</h1>
						<h1 className="text-1xl font-semibold text-gray-600">(Upload Data)</h1>
					</div>
					<div className="flex flex-col items-end lg:flex-row md:flex-row sm:flex-col gap-4">
						<div
							className="my-4 flex flex-col gap-4"
						>
							<div className="flex flex-col">
								<label htmlFor="" className="font-semibold">
									Upload Certificate image:
								</label>
								<input
									type="file"
									accept="image/*"
									onChange={(e) => handleDocUpload(e, 'certificate')}
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="" className="font-semibold">
									Upload Marksheet image:
								</label>
								<input
									type="file"
									accept="image/*"
									onChange={(e) => handleDocUpload(e, 'marksheet')}
								/>
							</div>
						</div>
						<div>
							<form
								className="my-4 flex flex-col gap-4"
								onSubmit={handleSubmit(handleUpload)}
								encType="multipart/form-data"
							>
								<div className="flex flex-col">
									<label htmlFor="" className="font-semibold">
										Select Excel file:
									</label>
									<input
										type="file"
										accept=".xlsx,.xlx"
										required
										{...register("excelFile", { required: true })}
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="font-semibold">
										Select Course:
									</label>
									<select
										className="outline-none border border-gray-200 rounded-md p-1"
										name=""
										id=""
										required
										{...register("category", { required: true })}
									>
										<option value="certificate">Certificate data</option>
										<option value="marksheet">Marksheet data</option>
									</select>
								</div>
								<div>
									<button
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										type="submit"
									>
										{!loader
											? <div>
												<i className="fa-solid fa-file-excel me-1"></i>Upload
											</div>
											: <img className="w-[20px]" src="/images/spinner.svg" alt="" />}
									</button>
								</div>
							</form>
						</div>
						<div>
							<form className="my-4 flex flex-col gap-4">
								<div className="flex flex-col">
									<label htmlFor="" className="font-semibold">
										Select Images:
									</label>
									<input
										type="file"
										accept=".jpg"
										multiple
										required
										onChange={(event) => {
											setImages(event.target.files);
										}}
									/>
									<p className="mt-2 text-sm text-slate-400"><span className="text-red-600">*</span> Multiple images selection supported!</p>
									<p className="text-sm text-slate-400"><span className="text-red-600">*</span> Only {`".jpg"`} format supported!</p>
									<p className="text-sm text-slate-400"><span className="text-red-600">*</span> Duplicate name images will be replaced!</p>
								</div>
								<div>
									<button
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										type="submit"
										onClick={uploadFiles}
									>
										{!imageLoader
											? <div>
												<i className="fa-solid fa-file-image me-1"></i>Upload
											</div>
											: <img className="w-[20px]" src="/images/spinner.svg" alt="" />}
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className="grid place-items-center my-2">
						<button
							className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={handleLogout}
						>
							<i className="fa-solid fa-right-from-bracket me-1"></i>
							Logout
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminPanel