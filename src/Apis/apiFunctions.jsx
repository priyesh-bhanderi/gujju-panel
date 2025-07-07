import axios from 'axios';
import { UserState } from '../Context/Usercontext';
import { useToast } from '../Context/ToastProvider';

export const apiFunctions = () => {

    const { user, setLoading } = UserState();
    const baseURL = import.meta.env.VITE_APP_BASEURL;
    const { showToast } = useToast();


    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const second = 0;

    const apiGet = async (url, error) => {
        setLoading(true);
        try {
            const response = await axios.get(baseURL + url, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            return response.data;
        } catch (errors) {
            if (error) {
                showToast('Advertise Delete SuccessFully', 'error');
            }
            throw errors;
        } finally {
            await delay(second);
            setLoading(false);
        }
    };

    const apiPost = async (url, payload) => {
        setLoading(true);
        try {
            const response = await axios.post(baseURL + url, payload, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            await delay(second);
            setLoading(false);
        }
    };

    const apiPostFile = async (url, payload, error) => {
        setLoading(true);
        try {
            const response = await axios.post(baseURL + url, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            return response.data;
        } catch (errors) {
            if (error) {
                showToast(errors.response.data.error.error_message, 'error');
            }
            throw errors;
        } finally {
            await delay(second);
            setLoading(false);
        }
    };

    const apiDelete = async (url) => {
        setLoading(true);
        try {
            const response = await axios.delete(baseURL + url, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            await delay(second);
            setLoading(false);
        }
    };

    return { apiGet, apiPost, apiDelete, apiPostFile };
};