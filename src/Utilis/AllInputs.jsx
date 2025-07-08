import React, { useEffect, useState } from 'react'
import { UserState } from '../Context/Usercontext'

const AllInputs = () => {

    const { errors, setErrors } = UserState()

    const getFormFields = (name, data, setData, options) => {
        switch (name) {
            case 'project':
                return [
                    { error: errors.title, type: 'text', placeholder: 'Enter Society Name', errorText: errors.title, label: 'Project Name', value: data?.title || '', onChange: (e) => setData({ ...data, title: e.target.value }) },
                    { error: errors.category, type: 'select', errorText: errors.category, label: "Category", value: data?.category, options: options, onChange: (e) => setData({ ...data, category: e.target.value }) },
                    { error: errors.tools, type: 'text', placeholder: 'Enter Tools', errorText: errors.tools, label: 'Tools', value: data?.tools || '', onChange: (e) => setData({ ...data, tools: e.target.value }) },
                    { error: errors.link, type: 'text', placeholder: 'Enter URL', errorText: errors.link, label: 'Live URL', value: data?.link || '', onChange: (e) => setData({ ...data, link: e.target.value }) },
                    { error: errors.image, type: 'file', errorText: errors.image, label: 'Upload Image', value: data?.file, onChange: (e, preview) => setData({ ...data, image: e, file: preview }), },
                    { error: errors.description, type: 'text', placeholder: 'Enter Description', errorText: errors.description, label: 'Description', value: data?.description || '', onChange: (e) => setData({ ...data, description: e.target.value }), multiline: true, minRows: 8.3 },
                ]
            default:
                return [];
        }
    };

    const validateForm = (name, data) => {
        const newErrors = {};

        switch (name) {
            case 'project':
                if (!data.title) newErrors.title = "Project name is required";
                if (!data.category) newErrors.category = "Category is required";
                if (!data.tools) newErrors.tools = "Tools are required";
                if (!data.link) {
                    newErrors.link = "Live URL is required";
                } else if (!/^https?:\/\/\S+\.\S+/.test(data.link)) {
                    newErrors.link = "Invalid URL format";
                }
                if (!data.image) newErrors.image = "Image is required";
                if (!data.description) newErrors.description = "Description is required";
                break;


            // Add more cases here for validation logic
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    return { getFormFields, validateForm }

}

export default AllInputs
