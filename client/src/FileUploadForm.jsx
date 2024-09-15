import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import "./../src/file.css";


const FileUploadForm = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('ItemName', data.ItemName);
        formData.append('ItemQuantity', data.ItemQuantity);
        formData.append('Price', data.Price);
        formData.append('file', data.file[0]);

        try {
            const response = await axios.post('http://localhost:5555/Productlist', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log(response.data); 
        } catch (error) {
            console.error(error); 
        }
    };


    return (
        <>
        <h2 style={{textAlign:"center", fontSize:"30px",padding:"20px", marginTop:"0px" }}>Data Upload</h2>
        <div className='formwrap'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Item Name" {...register('ItemName', { required: 'ItemName is required' })} />
            {errors.ItemName && <p>{errors.ItemName.message}</p>}

            <input type="text" placeholder="Item Quantity" {...register('ItemQuantity', { required: 'ItemQuantity is required' })} />
            {errors.ItemQuantity && <p>{errors.ItemQuantity.message}</p>}

            <input type="text" placeholder="Price" {...register('Price', { required: 'Price is required' })} />
            {errors.Price && <p>{errors.Price.message}</p>}

            <input type="file" {...register('file', { required: 'File is required' })} />
            {errors.file && <p>{errors.file.message}</p>}

            <button className='sub' type="submit">Submit</button>
        </form>
        </div>
        </>
    );
};


export default FileUploadForm;
