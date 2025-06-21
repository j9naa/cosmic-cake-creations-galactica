
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FeedbackCard from './FeedbackCard';

interface Feedback {
  id: string;
  orderId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
}

interface FeedbackListProps {
  feedbackList: Feedback[];
}

const FeedbackList = ({ feedbackList }: FeedbackListProps) => {
  return (
    <div className="space-y-6">
      <Card className="cosmic-card text-white border-cosmic-silver/20">
        <CardHeader>
          <CardTitle className="font-orbitron text-cosmic-blue">Recent Reviews</CardTitle>
          <CardDescription className="text-cosmic-silver">
            See what other cosmic customers are saying
          </CardDescription>
        </CardHeader>
      </Card>

      {feedbackList.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbackList;
