import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const useSampleSentences = () => {
  const [sentences, setSentences] = useState([]);
  const [classification, setClassification] = useState('Inox');
  const [proficiencySum, setProficiencySum] = useState(0);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/GetLearnerSampleSentences/${localStorage.getItem('userName')}`);
        const fetchedSentences = response.data.map(item => ({
          id: item.sampleSentenceId,
          sentence: item.sampleSentence,
          meaning: item.meaning || 'N/A',
          proficiency: item.proficiencyLevel,
          type: item.type
        }));
        setSentences(fetchedSentences);

        const sum = fetchedSentences.reduce((acc, curr) => acc + curr.proficiency, 0);
        setProficiencySum(sum);
      } catch (error) {
        console.error('Error fetching sample sentences:', error);
      }
    };

    fetchSentences();
  }, []);
  
  // update classification when proficiencySum changes
  useEffect(() => {
    if (proficiencySum <= 20) {
      setClassification('Inox');
    }
    else if (proficiencySum <= 40) {
      setClassification('Bronze');
    }
    else if (proficiencySum <= 60) {
      setClassification('Gold');
    }
    else if (proficiencySum <= 80) {
      setClassification('Emerald');
    }
    else if (proficiencySum <= 100) {
      setClassification('Ruby');
    }
    else {
      setClassification('Diamond');
    }
}, [proficiencySum]);
  
  return [sentences, setSentences, classification, setProficiencySum];
};

export default useSampleSentences;
