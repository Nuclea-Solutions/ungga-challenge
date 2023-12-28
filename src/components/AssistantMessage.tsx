import React, { useMemo, useEffect, useState } from 'react';
import MarkdownMessage from '@/components/MarkdownMessage';
import useMessagesStore from '@/store/useMessagesStore';
import FeedbackComponent from '@/stories/feedback/Feedback.component';

const AssistantMessage = ({
  content,
  contentId,
  showFeedbackMessage
}: {
  content: string;
  contentId: string;
  showFeedbackMessage: boolean;
}) => {
  const conversationsStorage = useMessagesStore((state) => state.messages);

  const isLastMessage = useMemo(() => {
    const assistanConversations = conversationsStorage.filter(
      (assistanConversation) => assistanConversation.role === 'assistant'
    );
    const lastMessageId = assistanConversations[assistanConversations.length - 1]?.id;
    return lastMessageId === contentId;
  }, [conversationsStorage, contentId]);

  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');

  const sendUserInputToChatbot = async () => {
    try {
      // Envía el mensaje del usuario al servidor que maneja la lógica con OpenAI
      const response = await fetch('http://localhost:3000/scheduleAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userInput }),
      });

      // Maneja la respuesta del servidor
      if (response.ok) {
        const data = await response.json();
        setChatbotResponse(data.response);
      } else {
        console.error('Error:', response.statusText);
        setChatbotResponse('Error communicating with the chatbot.');
      }
    } catch (error) {
      console.error('Error:', error);
      setChatbotResponse('Error.');
    }
  };

  useEffect(() => {
    if (isLastMessage) {
      // Envia automáticamente un mensaje predefinido al servidor cuando es el último mensaje del asistente
      sendUserInputToChatbot();
    }
  }, [isLastMessage]);

  return (
    <div className='flex-1 flex flex-col item-start justify-between md:max-w-[80%] gap-3'>
      <MarkdownMessage id={contentId} content={content} />
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={sendUserInputToChatbot}>Send</button>
      <p>Chatbot Response: {chatbotResponse}</p>
      <FeedbackComponent showFeedbackMessage={showFeedbackMessage} isLastMessage={isLastMessage} />
    </div>
  );
};

export default AssistantMessage;
