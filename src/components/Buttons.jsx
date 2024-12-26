const Buttons = ({ hint, onNextWord }) => (
    <div className="buttons">
      <button className="next-word" onClick={onNextWord}>
        Next Word
      </button>
      <div className="hint">Hint: {hint}</div>
    </div>
  );
  
  export default Buttons;
  