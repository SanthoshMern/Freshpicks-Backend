import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import "./../src/file.css"


function FileView() {
    const [formDataList, setFormDataList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5555/submit-form');
            setFormDataList(response.data);
            console.table(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
  return (
    <div>
    <h2>Form Data</h2>
    <div className='wrapview'>
                <table>
                    <thead>
                <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>PhoneNumber</th>
                        <th>Download File</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formDataList.map((formData, index) => ([
                    <tr key={index}>
                        <td>{formData.firstName}</td>
                        <td>{formData.lastName}</td>
                        <td>{formData.email}</td>
                        <td>{formData.phoneNumber}</td>
                        <td><a href={`http://localhost:5555/${formData.file}`} target="_blank" rel="noopener noreferrer">Download File</a></td>
                     </tr>
                    ]))}
                    </tbody>
                </table>
    </div>
</div>

  )
}

export default FileView