import MessageNote from './MessageNote';

const WallGrid = ({ messages }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 max-w-5xl mx-auto">
      {messages.map((msg, i) => (
        <MessageNote key={msg.id || i} msg={msg} index={i} />
      ))}
    </div>
  );
};

export default WallGrid;
