interface MessageProps {
  type: 'success' | 'error' | 'info';
  text: string;
}

const Message: React.FC<MessageProps> = ({ type, text }) => {
  let color = '';

  switch (type) {
    case 'success':
      color = 'green';
      break;
    case 'error':
      color = 'red';
      break;
    case 'info':
      color = 'blue';
      break;
    default:
      color = 'black';
  }

  return <div style={{ color }}>{text}</div>;
};

export default Message;
