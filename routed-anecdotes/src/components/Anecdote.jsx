import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find((a) => a.id === Number(id));
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
      <div>author: {anecdote.author}</div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdotes: PropTypes.array.isRequired,
};

export default Anecdote;
