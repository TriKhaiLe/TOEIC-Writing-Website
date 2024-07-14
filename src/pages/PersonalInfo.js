// PersonalInfo.js
import React, { useState } from 'react';
import { sampleSentences } from '../components/PersonalInfo/SampleSentence';

const PersonalInfo = () => {
  const [sentences, setSentences] = useState(sampleSentences);
  const [newSentence, setNewSentence] = useState('');
  const [newMeaning, setNewMeaning] = useState('');

  const addSentence = () => {
    const newId = sentences.length ? sentences[sentences.length - 1].id + 1 : 1;
    setSentences([...sentences, { id: newId, sentence: newSentence, meaning: newMeaning, proficiency: 0 }]);
    setNewSentence('');
    setNewMeaning('');
  };

  const deleteSentence = (id) => {
    setSentences(sentences.filter(sentence => sentence.id !== id));
  };

  const totalProficiency = sentences.reduce((total, sentence) => total + sentence.proficiency, 0);

  return (
    <div>
      <h1>Personal Notebook</h1>
      <div>
        <h2>Add New Sample Sentence</h2>
        <input 
          type="text" 
          value={newSentence} 
          onChange={(e) => setNewSentence(e.target.value)} 
          placeholder="Sample Sentence" 
        />
        <input 
          type="text" 
          value={newMeaning} 
          onChange={(e) => setNewMeaning(e.target.value)} 
          placeholder="Meaning" 
        />
        <button onClick={addSentence}>Add</button>
      </div>
      <div>
        <h2>Sample Sentences</h2>
        <ul>
          {sentences.map(sentence => (
            <li key={sentence.id}>
              <p>{sentence.sentence} - {sentence.meaning} (Proficiency: {sentence.proficiency})</p>
              <button onClick={() => deleteSentence(sentence.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <h2>Total Proficiency: {totalProficiency}</h2>
    </div>
  );
};

export default PersonalInfo;
