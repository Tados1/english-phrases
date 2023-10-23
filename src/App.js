import './index.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AllPhrases from './components/AllPhrases';
import Home from './components/Home';
import AddPhrase from './components/AddPhrase';
import { projectFirestore } from './firebase/config';
import { useState, useEffect } from 'react'


function App() {
  const [data, setData] = useState([])

  useEffect( () => {
    const unsubscribe = projectFirestore.collection('english-words').onSnapshot( (snapshot) => {
 
       if (snapshot.empty) {
         setData([])
       } else {
         let result = []
         snapshot.docs.forEach( (word) => { 
           result.push( {id: word.id, ...word.data()} )  
         })
         setData(result)
       }
     })
 
     return () => unsubscribe()
   }, [])

  
  return ( 
    <div className="application">
      <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/'>
        <Home data={data}/> 
      </Route>
      <Route path='/all-phrases'>
        <AllPhrases data={data}/>
      </Route>
      <Route path='/add-phrases'>
        <AddPhrase />
      </Route>
    </Switch>
  </BrowserRouter>
    </div>
  );
}

export default App;


