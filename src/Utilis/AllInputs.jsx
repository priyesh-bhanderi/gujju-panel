import React from 'react'

const AllInputs = () => {

    const projectsInputs = (errors, data, setData, options,) => {
        return [
            { error: errors.title, type: 'text', placeholder: 'Enter Society Name', errorText: errors.title, label: 'Project Name', value: data?.title || '', onChange: (e) => setData({ ...data, title: e.target.value }) },
            { error: errors.category, type: 'select', errorText: errors.category, label: "Category", value: data?.category, options: options, onChange: (e) => setData({ ...data, category: e.target.value }) },
            { error: errors.tools, type: 'text', placeholder: 'Enter Tools', errorText: errors.tools, label: 'Tools', value: data?.tools || '', onChange: (e) => setData({ ...data, tools: e.target.value }) },
            { error: errors.link, type: 'text', placeholder: 'Enter URL', errorText: errors.link, label: 'Live URL', value: data?.link || '', onChange: (e) => setData({ ...data, link: e.target.value }) },
            { error: errors.image, type: 'file', errorText: errors.image, label: 'Upload Image', value: data?.file, onChange: (e, preview) => setData({ ...data, image: e, file: preview }), },
            { error: errors.description, type: 'text', placeholder: 'Enter Description', errorText: errors.description, label: 'Description', value: data?.description || '', onChange: (e) => setData({ ...data, description: e.target.value }), multiline: true, minRows: 8.3 },
        ]
    }

    const validateProjectForm = (data,setErrors) => {

        const newErrors = {};

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

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({}); // Clear previous errors
    return true;
    };

    return { projectsInputs, validateProjectForm }

}

export default AllInputs
