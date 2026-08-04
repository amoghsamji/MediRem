import axios from "axios";

const API = "http://localhost:5000/api/medicines";

const getToken = () => localStorage.getItem("token");

export const getMedicines = async () => {
    const response = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return response.data;
};

export const addMedicine = async (medicineData: any) => {
    const response = await axios.post(API, medicineData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return response.data;
};

export const updateMedicine = async (
    id: string,
    medicineData: any
) => {
    const response = await axios.put(
        `${API}/${id}`,
        medicineData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return response.data;
};

export const deleteMedicine = async (id: string) => {
    const response = await axios.delete(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return response.data;
};