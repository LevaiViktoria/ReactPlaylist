import classNames from 'classnames';
import React, { useState } from 'react';

export function PlaylistForm({onSubmit}){
    //Az input mező értékének kezelésére használt horog. Kezdetben az input értéke egy üres string!!!.
    const [value, setValue] = useState('');
    //Az input mező validálására létrehozott horgony.
    const [error, setError] = useState(false)

    //A form elküldését lekezelő függvény.
    const handleSubmit = e =>{
        e.preventDefault() //A form eredeti eseményének letiltása.
        if(value.trim().length === 0){
            setError(true)
            return
        }
        setError(false)
        onSubmit(value)
        setValue('')
    }
    return(
        <details open>
            <summary>Add new playlist</summary>
            <form className={classNames("ui action input container", {error})} onSubmit={handleSubmit}>
                <input value={value} onChange={e => setValue(e.target.value)}/>
                <button className={classNames("ui primary button", {negative: error})}>
                    Add
                </button>
            </form>
        </details>
    )
}