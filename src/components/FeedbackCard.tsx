
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, MessageCircle } from 'lucide-react';

interface Feedback {
  id: string;
  orderId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
}

interface FeedbackCardProps {
  feedback: Feedback;
}

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-cosmic-silver/30'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="cosmic-card text-white border-cosmic-silver/20 hover:border-cosmic-purple/50 transition-all duration-300">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cosmic-blue" />
                <span className="font-medium text-white">{feedback.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-cosmic-silver">
                <span>Order: {feedback.orderId}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(feedback.date)}
                </div>
              </div>
            </div>
            <div className="text-right space-y-1">
              {renderStars(feedback.rating)}
              {feedback.category && (
                <Badge 
                  variant="outline" 
                  className="bg-cosmic-blue/10 border-cosmic-blue/30 text-cosmic-blue text-xs"
                >
                  {feedback.category}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <MessageCircle className="w-4 h-4 text-cosmic-purple mt-1 flex-shrink-0" />
            <p className="text-cosmic-silver leading-relaxed">{feedback.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
