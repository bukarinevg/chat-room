"use client";
import "@styles/add-chat.scss";
import { createChat } from "@/lib/actions";
import { LoadingContext } from "@components/providers/LoadingProvider";
import Modal from "@components/modal";
import Button from "@components/button"

import { useState, useEffect, useContext } from "react";
import { useFormState } from 'react-dom';
import Select, { StylesConfig } from "react-select";
import makeAnimated from 'react-select/animated';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UserDetails } from "@/lib/types";
import { stat } from "fs";
import { time, timeStamp } from "console";
import { useParams } from "next/navigation";


const animatedComponents = makeAnimated()

export default function AddChat(
    {users}
    :{
        users?: UserDetails[]
    }
){
    const [showModal, setShowModal ] = useState(false);
    const {loading, setLoading } = useContext(LoadingContext);
    const initialState =  {
        message: null,
        errors: {
            name: [],
            users: []
        },
        timeStamp: Date.now()
    };
    const[ state, dispatch ] = useFormState(createChat, initialState);

    const urlParams = useParams();

    const handleShowModal = () => {
        setShowModal(true);
    }

    useEffect(() => {
        setLoading(false);
        if(!state){
            setShowModal(false);
            setLoading(false);
        }
    }, [ state,  urlParams ]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
    }


    let options = users?.map(user => 
        {
            return {
                value: user.id,
                label: user.name
            };
        }
    );

    return (
        <div className="add-chat">
            <FontAwesomeIcon 
                icon={faPlus} 
                className="header__icon" 
                onClick={handleShowModal}

            />
            <Modal 
                className="add-chat__modal"
                show={showModal} 
                onClose={() => setShowModal(false)}
                title="Add Chat"
            >
                <form 
                    action={dispatch}
                    onSubmit={handleSubmit}
                >
                {state ? state.toString() : null}
                    <div    className="add-chat__form-group">
                        <input 
                            name="name"
                            type="text" 
                            placeholder="Enter Chat Name" 
                        />
                         {
                                state?.errors?.name&&
                                state.errors.name.length > 0 && 
                                <div className="error">
                                    {
                                        state.errors.name.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))
                                    }
                                </div>
                            }
                    </div>
                    <div className="add-chat__form-group">
                        <Select 
                            className="add-chat__form-group__select"
                            isMulti
                            options={options} 
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            placeholder="Select Users"
                            name="users"
                        />
                        {
                            state?.errors?.users &&
                            state.errors.users.length > 0 &&
                            <div className="error">
                                {
                                    state.errors.users.map((error, index) => (
                                        <p key={index}>{error}</p>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <div className= "add-chat__form-group checkbox">
                        <label 
                            className="add-chat__label"
                            htmlFor='private'
                        >
                            Private
                        </label>
                        <input 
                            defaultValue={1}
                            id="private"
                            name="private"
                            type="checkbox"
                        />

                    </div>
                    <Button
                        className="btn-primary"
                    > 
                        Create
                    </Button>
                </form>
            </Modal>
        </div>
    );
}