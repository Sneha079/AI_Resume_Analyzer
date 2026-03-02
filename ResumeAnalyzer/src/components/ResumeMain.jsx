import React, { useState } from 'react'
import './ResumeStyles.css';
import axios from "axios";
const ResumeMain = () => {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [aiResult, setAiResult] = useState("");

    const handleSubmit = async () => {
        if (!file) {
            alert("Please select a resume file");
            return;
        }
        const formData = new FormData()
        formData.append("resume", file);
        formData.append("description", description);
        try {
            const res = await axios.post(
                // "http://localhost:4000/api/resume/upload", formData
                "https://ai-resume-analyzer-kgxk.onrender.com", formData

            );
            setAiResult(res.data.aiResponse);

        } catch (e) {
            console.log(e);
        }
    }
    return (

        <div className='MainContainer'>
            <h2>Resume AnalyZer</h2>
            <p>Upload your resume and get AI-powered insights</p>
            <div className='Container' >
                <div className='FormContainer'>
                    <div>
                        <p className='Lable'>Resume(PDF-Max 5MB)</p>
                        <label className='FileUploadBox'>
                            <input type='file'
                                accept=".pdf,.doc,.docx"
                                hidden

                                onChange={(e) => setFile(e.target.files[0])}>
                            </input>
                            <div className="UploadContent">
                                <div className="UploadIcon">📂</div>
                                <p>Click to Upload Resume</p>
                            </div>

                        </label>
                        {file && <p className="FileName">Uploaded Successfully {file.name}</p>}
                    </div>


                    <div>
                        <p className='Lable'>Job Description</p>
                        <textarea
                            placeholder="Enter job description..."
                            className='InputDescription'
                            onChange={(e) => setDescription(e.target.value)} >

                        </textarea>
                    </div>
                </div>
                <button onClick={handleSubmit}
                    className='AnalyzeButton'
                >Analyzer Resume</button>

                {aiResult && (
                    <div>
                        <h3>AI Result:</h3>
                        <div style={{ whiteSpace: "pre-line" }}>
                            {aiResult}
                        </div>
                    </div>
                )}
            </div>
        </div>


    )
}

export default ResumeMain