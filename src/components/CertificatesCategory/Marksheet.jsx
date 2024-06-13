import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import styles from "./Marksheet.module.css"
import PdfDownloadComponent from "../pdfConverter/PdfDownloadComponent";
import Loader from "../Loader/Loader";

function Marksheet({ data, profileImage }) {
	const [docImage, setDocImage] = useState(null)
	const [loading, setLoading] = useState(false)
	const imageRef = ref(storage, `/document/marksheet`);

	useEffect(() => {
		setLoading(true)
		getDownloadURL(imageRef)
			.then((url) => {
				setDocImage(url);
				setLoading(false)
			}).catch((error) => {
				console.log(error)
				setLoading(false)
			})
	}, [])

	const totalMarks =
		+data.term_1 +
		+data.term_2 +
		+data.term_3 +
		+data.term_4 +
		+data.practical

	return (
		<>
			{loading && <Loader />}
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
				<div className={styles.father_name}>
					<p>{data.father_name}</p>
				</div>
				<div className={styles.mother_name}>
					<p>{data.mother_name}</p>
				</div>
				<div className={styles.dob}>
					<p>{data.dob}</p>
				</div>
				<div className={styles.course}>
					<p>{data.course}</p>
				</div>
				<div className={styles.duration}>
					<p>{data.duration}</p>
				</div>
				<div className={styles.term_1}>
					<p>{data.term_1}</p>
				</div>
				<div className={styles.term_2}>
					<p>{data.term_2}</p>
				</div>
				<div className={styles.term_3}>
					<p>{data.term_3}</p>
				</div>
				<div className={styles.term_4}>
					<p>{data.term_4}</p>
				</div>
				<div className={styles.practical}>
					<p>{data.practical}</p>
				</div>
				<div className={styles.totalMarks}>
					<p>{totalMarks}</p>
				</div>
				<div className={styles.date}>
					<p>{data.date}</p>
				</div>
			</div>
			<PdfDownloadComponent id="certificate" pageSize="A4" pageOrientation="portrait" close={() => { }} />
		</>
	)
}

export default Marksheet
