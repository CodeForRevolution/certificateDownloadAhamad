import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from './PdfDownloadComponent.module.css'

const PdfDownloadComponent = ({ id, pageSize, pageOrientation, close }) => {
    const [loader, setLoader] = useState(false)

    const handleDownloadPDF = () => {
        const input = document.getElementById(`${id}`);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            setLoader(true)
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF(pageOrientation, 'mm', pageSize);
            const componentWidth = pdf.internal.pageSize.getWidth();
            const componentHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            setLoader(false)
            pdf.save('downloaded-file.pdf');
            // close()
        });
    };
    return (
        <div className={styles.btnContainer} >
            <button className={styles.learnMore} onClick={handleDownloadPDF} disabled={!(loader === false)}>
                <span className={styles.circle} aria-hidden="true">
                    <span className={`${styles.icon} ${styles.arrow}`}></span>
                </span>
                <span className={styles.buttonText}>
                    {loader ? (
                        <span>Downloading</span>
                    ) : (
                        <span>Download</span>
                    )}
                </span>
            </button>
        </div>
    );
};
export default PdfDownloadComponent;