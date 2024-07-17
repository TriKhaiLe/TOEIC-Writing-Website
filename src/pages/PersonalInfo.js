import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import useSampleSentences from '../hooks/useSampleSentences';

const PersonalInfo = ({userName}) => {
  const [sentences, setSentences] = useSampleSentences();
  const [newSentence, setNewSentence] = useState('');
  const [newMeaning, setNewMeaning] = useState('');

  const addSentence = async () => {
    const newSentenceData = {
      userName: userName,
      sentence: newSentence,
      meaning: newMeaning
    };

    try {
      await axios.post(`${config.apiUrl}/AddOrReferenceSampleSentence`, newSentenceData); 
      const addedSentence = {
        id: newSentenceData.id,
        sentence: newSentenceData.sentence,
        meaning: newSentenceData.meaning,
        proficiency: 0,
      };
      setSentences([...sentences, addedSentence]);
      setNewSentence('');
      setNewMeaning('');
    } catch (error) {
      console.error('Error adding sample sentence:', error);
    }
  };

  const deleteSentence = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/DeleteLearnerSampleSentence/${userName}/${id}`);
      setSentences(sentences.filter(sentence => sentence.id !== id));
    } catch (error) {
      console.error('Error deleting sample sentence:', error);
    }
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
