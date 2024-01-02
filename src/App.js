import './index.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllPhrases from './components/AllPhrases';
import Home from './components/Home';
import AddPhrase from './components/AddPhrase';
import { projectFirestore } from './firebase/config';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = projectFirestore.collection('english-words').onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setData([]);
      } else {
        let result = [];
        snapshot.docs.forEach((word) => {
          result.push({ id: word.id, ...word.data() });
        });
        setData(result);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="application">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/all-phrases" element={<AllPhrases data={data} />} />
          <Route path="/add-phrases" element={<AddPhrase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;