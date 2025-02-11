'use client';
import { useForm } from "react-hook-form"
import React, { useState } from 'react'
import api from "@/utils/axios";
import { Dragon } from "@/utils/types/dragon";
import toast from "react-hot-toast";
import { validTypes } from "@/utils/dragonTypes";

type FormData = Dragon;
type EditFormProps = {
    dragon: Dragon
}


const EditForm = ({dragon}:EditFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [disableButton, setDisableButton] = useState(false);

    const onSubmit = async (data: FormData) => {
        setDisableButton(true);
        // Essa parte do codigo trata o campo de historias, que pode ser um array ou uma string
        let historiesArray = Array.isArray(data.histories) ? data.histories : [data.histories];
        if(historiesArray.length == 1 && historiesArray[0]){
            const tempArray = historiesArray[0].split(",");
            historiesArray = tempArray;
        }
        data.histories = historiesArray.filter((history): history is string => history !== undefined);
        
        const response = await api.put("/"+dragon.id, data);

        if(response.status == 201 || response.status == 200){
            toast.success('Dragão editado com sucesso');	
            setDisableButton(false);
            return;
        }
        toast.error('Erro ao editar dragão');
        setDisableButton(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Nome</label>
                <input placeholder="Nome do dragão"  defaultValue={dragon.name} id="name" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="type">Tipo</label>
                <select defaultValue={dragon.type} id="type" {...register("type", { required: true })}>
                    { validTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    )) }
                </select>
                {errors.type && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="histories">Lendas</label>
                <textarea placeholder="Separe as lendas de avistamento com virgulas" defaultValue={dragon.histories} id="description" {...register("histories", { required: true })} />
                {errors.histories && <span>This field is required</span>}
            </div>
            <button type="submit" disabled={disableButton}>Editar dragão</button>
        </form>
    )
}

export default EditForm