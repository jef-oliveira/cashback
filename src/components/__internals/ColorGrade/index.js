import './styles.scss';

function ColorGrade({ className, ...props }) {
  return (
    <div className={`color-grade${className ? ` ${className}` : ''}`} { ...props }>
    {['neutral', 'primary', 'danger', 'success'].map(color => (
      <div key={color} className={`row ${color}`}>
        {[...Array(7)].map((_, index) => <div key={index} className="square" />)}
      </div>
    ))}
    </div>
  );
}

export default ColorGrade;
