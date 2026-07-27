import MessageNote from './MessageNote';

const WallGrid = ({ messages }) => {
  if (!messages.length) {
    return (
      <p className="text-center py-16 text-sm" style={{ color: '#8B7355' }}>
        Nothing on the wall yet. Be the first.
      </p>
    );
  }

  return (
    <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 max-w-5xl mx-auto list-none">
      {messages.map((msg, i) => (
        <li key={msg.id ?? i} className="break-inside-avoid">
          <MessageNote msg={msg} index={i} />
        </li>
      ))}
    </ul>
  );
};

export default WallGrid;
