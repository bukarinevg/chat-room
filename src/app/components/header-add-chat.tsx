"use client";
import "@styles/add-chat.scss";
import { createChat } from "@/lib/actions";
import Modal from "@components/modal";
import Button from "@components/button"

import { useState } from "react";
import { useFormState } from 'react-dom';
import Select, { StylesConfig } from "react-select";
import makeAnimated from 'react-select/animated';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const animatedComponents = makeAnimated()

export default function HeaderAddChat(){
    const [ showModal, setShowModal ] = useState(false);

    const [ state, dispatch ] = useFormState(createChat, {
        message: null,
        errors: {
            name: [],
            users: []
        }
    });
    
    const handleShowModal = () => {
        setShowModal(true);
    }

    let options = [
        { value: 1, label: 'User 1' },
        { value: 2, label: 'User 2' },
        { value: 3, label: 'User 3' },
        { value: 4, label: 'User 4' },
        { value: 5, label: 'User 5' },
    ];

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
                <form action={dispatch}>
                    <div    className="add-chat__form-group">
                        <input 
                            name="name"
                            type="text" 
                            placeholder="Enter Chat Name" 
                        />
                         {
                                state.errors?.name&&
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
                            state.errors?.users &&
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