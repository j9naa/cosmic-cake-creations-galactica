
import { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';

interface Feedback {
  id: string;
  orderId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
}

const FeedbackSystem = () => {
  const [feedbackList] = useState<Feedback[]>([
    {
      id: '1',
      orderId: 'CKV-123456-001',
      customerName: 'Captain Zara Nova',
      rating: 5,
      comment: 'Absolutely stellar! The Nebula Red Velvet was out of this world. Perfect delivery to Mars Colony Alpha.',
      date: '2025-01-16',
      category: 'Taste'
    },
    {
      id: '2',
      orderId: 'CKV-123456-003',
      customerName: 'Dr. Luna Starlight',
      rating: 5,
      comment: 'The galaxy design was breathtaking! Andromeda Alex did an amazing job. Will definitely order again.',
      date: '2025-01-19',
      category: 'Design'
    },
    {
      id: '3',
      orderId: 'CKV-123456-002',
      customerName: 'Admiral Rex Cosmos',
      rating: 4,
      comment: 'Great taste and presentation. Delivery was prompt to Europa Station. Only minor issue was the Solar Swirls were a bit too sweet.',
      date: '2025-01-21',
      category: 'Overall'
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold font-orbitron text-white mb-4">
          Cosmic Feedback System
        </h2>
        <p className="text-cosmic-silver text-lg">
          Share your galactic experience and help us improve
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <FeedbackForm />
        <FeedbackList feedbackList={feedbackList} />
      </div>
    </div>
  );
};

export default FeedbackSystem;
