import './AddPhrase.css'
import { projectFirestore } from '../firebase/config';
import { useState } from 'react'

const AddPhrase = () => {
    const [slovakWord, setSlovakWord] = useState('')
    const [englishWord, setEnglishWord] = useState('')
    const [added, setAdded] = useState(false)
    //const [error, setError] = useState(false)

    const submitForm = async (e) => {
        e.preventDefault()
        const newWord = {slovakWord, englishWord}

        if (slovakWord && englishWord) {
            await projectFirestore.collection('english-words').add(newWord)
            setSlovakWord('')
            setEnglishWord('')
            setAdded(true)
        } 
    
       
        setTimeout( () => {
            setAdded(false)
        }, 250)
    }

    return <form onSubmit={submitForm} className='add-phrase'>
                <input type="text" onChange={ (e) => setSlovakWord(e.target.value)} placeholder='Slovak word' value={slovakWord}/>
                <input type="text" onChange={ (e) => setEnglishWord(e.target.value)} placeholder='English word' value={englishWord}/>
                <button onClick={submitForm}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </button>
                {added && <h1>Successfully added</h1>}
           </form>
}
 
export default AddPhrase;