import React, { useEffect, useState } from 'react'

const AllInputs = (name) => {

    const [errors, setErrors] = useState({});

    const getFormFields = (data, setData, options) => {
        switch (name) {
            case 'login':
                return [
                    { error: errors.email, type: 'email', placeholder: 'Enter Email ID', errorText: errors.email, label: "Email ID", value: data?.email || '', onChange: (e) => setData({ ...data, email: e.target.value }) },
                    { error: errors.password, type: 'password', placeholder: 'Enter Password', errorText: errors.password, label: "Password", value: data?.password || '', onChange: (e) => setData({ ...data, password: e.target.value }) },
                ]?.filter(Boolean)

            case 'project':
                return [
                    { error: errors.title, type: 'text', placeholder: 'Enter Society Name', errorText: errors.title, label: 'Project Name', value: data?.title || '', onChange: (e) => setData({ ...data, title: e.target.value }) },
                    { error: errors.category, type: 'select', errorText: errors.category, label: "Category", value: data?.category, options: options, onChange: (e) => setData({ ...data, category: e.target.value }) },
                    { error: errors.tools, type: 'text', placeholder: 'Enter Tools', errorText: errors.tools, label: 'Tools', value: data?.tools || '', onChange: (e) => setData({ ...data, tools: e.target.value }) },
                    { error: errors.link, type: 'text', placeholder: 'Enter URL', errorText: errors.link, label: 'Live URL', value: data?.link || '', onChange: (e) => setData({ ...data, link: e.target.value }) },
                    { error: errors.image, type: 'file', errorText: errors.image, label: 'Upload Image', value: data?.file, onChange: (e, preview) => setData({ ...data, image: e, file: preview }), },
                    { error: errors.description, type: 'text', placeholder: 'Enter Description', errorText: errors.description, label: 'Description', value: data?.description || '', onChange: (e) => setData({ ...data, description: e.target.value }), multiline: true, minRows: 8.3 },
                ];

            case 'change-password':
                return [
                    { error: errors.current_password, type: 'password', placeholder: 'Enter Current Password', errorText: errors.current_password, label: "Current Password", value: data?.current_password || '', onChange: (e) => setData({ ...data, current_password: e.target.value }) },
                    { error: errors.new_password, type: 'password', placeholder: 'Enter New Password', errorText: errors.new_password, label: "New Password", value: data?.new_password || '', onChange: (e) => setData({ ...data, new_password: e.target.value }) },
                ]
            default:
                return [];
        }
    };

    const validateForm = (data) => {
        const newErrors = {};

        switch (name) {
            case 'login':

                if (!data.email) {
                    newErrors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(data.email)) {
                    newErrors.email = 'Enter a valid email';
                }

                if (!data.password) {
                    newErrors.password = 'Password is required';
                }
                break;
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
            case 'change-password':
                if (!data.current_password) {
                    newErrors.current_password = 'Current Password is required';
                } else if (!/^\d{6}$/.test(data.current_password)) {
                    newErrors.current_password = 'Password must be exactly 6 digits';
                }
                if (!data.new_password) {
                    newErrors.new_password = 'New Password is required';
                } else if (!/^\d{6}$/.test(data.new_password)) {
                    newErrors.new_password = 'Password must be exactly 6 digits';
                }
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
