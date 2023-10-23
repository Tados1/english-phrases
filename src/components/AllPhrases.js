import './AllPhrases.css'
import { projectFirestore } from '../firebase/config';
import { useState, useEffect } from 'react'

const AllPhrases = ({ data }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [changeData, setChangeData] = useState(false);

  const searchPhraseFunction = (e) => {
    setSearchPhrase(e.target.value.toLowerCase())
    setChangeData(true);
  }

  const deleteWord = (id) => {
    projectFirestore.collection('english-words').doc(id).delete()
    setSearchPhrase('')
  }

  useEffect(() => {
    const filteredResults = data.filter((phrase) => {
      const { slovakWord, englishWord } = phrase;
      return slovakWord.toLowerCase().includes(searchPhrase) || englishWord.toLowerCase().includes(searchPhrase);
    });
    setFilteredData(filteredResults);
  }, [searchPhrase, data]);

  if (!data || data.length === 0) {
    return <div>There are no phrases...</div>;
  }

  return (
    <div className="all-phrases-container">
      <form>
        <input
          type="text"
          placeholder='Search phrase'
          value={searchPhrase}
          onChange={searchPhraseFunction}
        />
      </form>

      <div className="all-phrases">
        {filteredData.map((oneWord) => {
          const { id, slovakWord, englishWord } = oneWord;
          return (
            <div className='one-phrase' key={id}>
              <div className="one-phrase-container">
                <p>{slovakWord}</p>
                <p>/</p>
                <p> {englishWord}</p>
              </div>
              <button onClick={() => deleteWord(id)}>Delete</button>
            </div>
          );
        })}
        {!changeData && data.map((oneWord) => {
          const { id, slovakWord, englishWord } = oneWord;
          return (
            <div className='one-phrase' key={id}>
               <div className="one-phrase-container">
                <p>{slovakWord}</p>
                <p>/</p>
                <p> {englishWord}</p>
              </div>
              <button onClick={() => deleteWord(id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPhrases;