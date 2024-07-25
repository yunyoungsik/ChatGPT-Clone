import './dashboardPage.css';
import { useAuth } from '@clerk/clerk-react';

const DashboardPage = () => {
  const { userId } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    if (!text) return;

    await fetch('http://localhost:3000/api/chats', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h1>LAMA AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="chat" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="image" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="code" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" autoComplete='none' placeholder="Ask me anything..." />
          <button type='submit'>
            <img src="/arrow.png" alt="arrow" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
