import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const useSampleSentences = () => {
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/GetLearnerSampleSentences/${localStorage.getItem('userName')}`);
        const fetchedSentences = response.data.map(item => ({
          id: item.sampleSentenceId,
          sentence: item.sampleSentence,
          meaning: item.meaning || 'N/A', // Assuming 'meaning' is part of the API response
          proficiency: item.proficiencyLevel,
        }));
        setSentences(fetchedSentences);
      } catch (error) {
        console.error('Error fetching sample sentences:', error);
      }
    };

    fetchSentences();
  }, []);
  
  return [sentences, setSentences];
};

export default useSampleSentences;
