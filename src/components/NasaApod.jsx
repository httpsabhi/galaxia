import { useEffect, useState } from 'react';
import Loader from './Loader';
import Card from './Card';
import { fetchNasaApod } from '../lib/nasaApi';

const NasaApodComponent = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApod = async () => {
      try {
        const apodData = await fetchNasaApod();
        setApod(apodData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getApod();
  }, []);

  if (loading) return <Loader />;
  if (!apod) return <p className="text-white">No APOD data available.</p>;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">NASA Astronomy Picture of the Day</h2>
      <Card
        title={apod.title}
        image={apod.url}
        description={apod.explanation}
        link={apod.hdurl}
      />
    </div>
  );
};

export default NasaApodComponent;
