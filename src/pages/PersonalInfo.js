import React, { useState } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import config from '../config';
import useSampleSentences from '../hooks/useSampleSentences';

const PersonalInfo = ({ userName }) => {
  const [sentences, setSentences] = useSampleSentences();
  const [newSentence, setNewSentence] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newType, setNewType] = useState('Word'); // Added newType state

  const addSentence = async () => {
    const newSentenceData = {
      userName: userName,
      sentence: newSentence,
      meaning: newMeaning,
      type: newType, // Include type in the data
    };

    try {
      await axios.post(`${config.apiUrl}/AddOrReferenceSampleSentence`, newSentenceData);
      const addedSentence = {
        id: newSentenceData.id,
        sentence: newSentenceData.sentence,
        meaning: newSentenceData.meaning,
        type: newType, // Include type in the added sentence
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

  const renderSentences = (type) => (
    <ul>
      {sentences.filter(sentence => sentence.type === type).map(sentence => (
        <li key={sentence.id}>
          <p>{sentence.sentence} - {sentence.meaning} (Proficiency: {sentence.proficiency})</p>
          <button onClick={() => deleteSentence(sentence.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );

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
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        >
          <option value="Word">Word</option>
          <option value="Phrase">Phrase</option>
        </select>
        <button onClick={addSentence}>Add</button>
      </div>
      <Tabs>
        <TabList>
          <Tab>Words</Tab>
          <Tab>Phrases</Tab>
        </TabList>

        <TabPanel>
          <h2>Words</h2>
          {renderSentences('Word')}
        </TabPanel>
        <TabPanel>
          <h2>Phrases</h2>
          {renderSentences('Phrase')}
        </TabPanel>
      </Tabs>
      <h2>Total Proficiency: {totalProficiency}</h2>
    </div>
  );
};

export default PersonalInfo;
