const AlphabetContainer = ({ onLetterClick, gameStarted }) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    return (
        <div className={`alphabet-container`}>
        {alphabet.map((letter) => (
            <button key={letter} className={`key ${gameStarted && "active_buttons"}`} onClick={() => onLetterClick(letter)}>
            {letter}
            </button>
        ))}
        </div>
    );
};

export default AlphabetContainer;