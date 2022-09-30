import Chatbot from '@/components/Chatbot';
import CustomChatbot from '@/components/CustomChatbot';

const Home = () => {
  return (
    <div className="bg-gray-50 shadow-lg rounded-md" style={{ height: '37.5rem' }}>
      <CustomChatbot />
      {/* <Chatbot /> */}
    </div>
  );
};

export default Home;
