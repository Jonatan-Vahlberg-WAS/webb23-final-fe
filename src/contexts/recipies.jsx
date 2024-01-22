import { createContext, useContext, useState } from 'react';

import Axios from '@/utils/axios';
import { useRouter } from 'next/navigation';

const defaultState = {
    recipies: [],
    recipiesLoading: true,
    recipie: null,
    recipieLoading: true,
    recipieReviews: [],
    getRecipies: (search) => {},
    getRecipie: () => {},
    createRecipie: () => {},
    updateRecipie: () => {},
    deleteRecipie: () => {},
    getRecipieReviews: () => {},
    createRecipieReview: () => {},
    deleteRecipieReview: () => {},
}

const RecipieContext = createContext(defaultState);

const RecipieProvider = ({ children }) => {
        const router = useRouter();

        const [recipies, setRecipies] = useState(defaultState.recipies);
        const [recipiesLoading, setRecipiesLoading] = useState(defaultState.recipiesLoading);
        const [recipie, setRecipie] = useState(defaultState.recipie);
        const [recipieLoading, setRecipieLoading] = useState(defaultState.recipieLoading);
        const [recipieReviews, setRecipieReviews] = useState(defaultState.recipieReviews);
    
        const getRecipies = async (search) => {
            setRecipiesLoading(true);
            try {
                const response = await Axios.get(`/recipies${search ? `?search=${search}` : ""}`);
                setRecipies(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setRecipiesLoading(false);
            }
        }
    
        const getRecipie = async (id) => {
            setRecipieLoading(true);
            try {
                const response = await Axios.get(`/recipies/${id}`);
                setRecipie(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setRecipieLoading(false);
            }
        }
    
        const createRecipie = async (data) => {
            try {
                const response = await Axios.post("/recipies", data);
                setRecipies([...recipies, response.data]);
            } catch (error) {
                console.log(error);
            }
        }
    
        const updateRecipie = async (id, data) => {
            try {
                const response = await Axios.put(`/recipies/${id}`, data);
                const index = recipies.findIndex((recipie) => recipie._id === id);
                const newRecipies = [...recipies];
                newRecipies[index] = response.data;
                setRecipies(newRecipies);
            } catch (error) {
                console.log(error);
            }
        }
    
        const deleteRecipie = async (id) => {
            try {
                await Axios.delete(`/recipies/${id}`);
                const newRecipies = recipies.filter((recipie) => recipie._id !== id);
                setRecipies(newRecipies);
                setRecipie(null);
                router.push("/recipies");
            } catch (error) {
                console.log(error);
            }
        }

        const getRecipieReviews = async (id) => {
            setRecipieLoading(true);
            try {
                const response = await Axios.get(`/recipies/${id}/reviews`);
                setRecipieReviews(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setRecipieLoading(false);
            }
        }
    
        const createRecipieReview = async (id, data) => {
            try {
                const response = await Axios.post(`/recipies/${id}/reviews`, data);
                setRecipieReviews([...recipieReviews, response.data]);
            } catch (error) {
                console.log(error);
            }
        }

        const deleteRecipieReview = async (id) => {
            try {
                await Axios.delete(`/recipies/${id}/reviews`);
                const newRecipieReviews = recipieReviews.filter((review) => review._id !== id);
                setRecipieReviews(newRecipieReviews);
            } catch (error) {
                console.log(error);
            }
        }

        return (
            <RecipieContext.Provider
                value={{
                    recipies,
                    recipiesLoading,
                    recipie,
                    recipieLoading,
                    recipieReviews,
                    getRecipies,
                    getRecipie,
                    createRecipie,
                    updateRecipie,
                    deleteRecipie,
                    getRecipieReviews,
                    createRecipieReview,
                    deleteRecipieReview,
                }}
            >
                {children}
            </RecipieContext.Provider>
        );

}

const useRecipies = () => {
    const context = useContext(RecipieContext);
    if (context === undefined) {
        throw new Error('useRecipies must be used within a RecipieProvider');
    }
    return context;
}

export { RecipieProvider, useRecipies };

