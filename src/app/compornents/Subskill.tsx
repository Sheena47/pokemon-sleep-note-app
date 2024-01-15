interface CardProps {
  color: 'white' | 'darkblue' | 'darkyellow';
  text: string;
}

const SubSkill: React.FC<CardProps> = ({ color, text }) => {
  let bgColor;

  switch (color) {
    case 'white':
      bgColor = 'bg-white';
      break;
    case 'darkblue':
      bgColor = 'bg-blue-900';
      break;
    case 'darkyellow':
      bgColor = 'bg-yellow-900';
      break;
    default:
      bgColor = 'bg-white';
  }
    return (
      <div className={`grid grid-cols-3 gap-2 ${bgColor} w-16 h-8`}>
        {text}
      </div>
    );
  };
  
  export default SubSkill;
  