import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "../config/firebase"
import Certificate from "../components/CertificatesCategory/Certificate"
import Marksheet from "../components/CertificatesCategory/Marksheet"

function Result() {
	const [profileImage, setProfileImage] = useState()
	const { state } = useLocation()
	const studentData = state.data
	const category = state.category
	const imageName = studentData.registration_no

	const imageRef = ref(storage, `/studentImages/${imageName}.jpg`);

	useEffect(() => {
		getDownloadURL(imageRef)
			.then((url) => {
				setProfileImage(url);
			})
	}, [imageRef])

	return (
		<main>
			{category === "certificate" && (
				<Certificate data={studentData} profileImage={profileImage} />
			)}
			{category === "marksheet" && (
				<Marksheet data={studentData} profileImage={profileImage} />
			)}
		</main>
	)
}

export default Result
