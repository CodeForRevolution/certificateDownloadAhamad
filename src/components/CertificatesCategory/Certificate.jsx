import { useEffect, useState } from "react"
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import styles from "./Certificate.module.css"
import PdfDownloadComponent from "../pdfConverter/PdfDownloadComponent";

function Certificate({ data, profileImage }) {
	const [docImage, setDocImage] = useState(null)
	const imageRef = ref(storage, `/document/certificate`);

	useEffect(() => {
		getDownloadURL(imageRef)
			.then((url) => {
				setDocImage(url);
			})
	})

	return (
		<>
			<div className={styles.imageContainer} id="certificate">
				<img src={docImage} alt="" />
				<div className={styles.registration_no}>
					<p>{data.registration_no}</p>
				</div>
				<div className={styles.enrollment_no}>
					<p>{data.enrollment_no}</p>
				</div>
				<div className={styles.name}>
					<p>{data.name}</p>
				</div>
				<div className={styles.guardian_name}>
					<p>{data.guardian_name}</p>
				</div>
				<div className={styles.course}>
					<p>{data.course}</p>
				</div>
				<div className={styles.duration}>
					<p>{data.duration}</p>
				</div>
				<div className={styles.grade}>
					<p>{data.grade}</p>
				</div>
				<div className={styles.date}>
					<p>{data.date}</p>
				</div>
				<div className={styles.profilePic}>
					<img src={profileImage} alt="" />
				</div>
			</div>
			<PdfDownloadComponent id="certificate" pageSize="A4" pageOrientation="landscape" close={() => { }} />
		</>
	)
}

export default Certificate
