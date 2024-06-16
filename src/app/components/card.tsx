import '@styles/card.scss';

export default function Card(
    {title, children}: {title: string, children?: React.ReactNode}
){
    return (
      <div className='block card'>
        <p className='card__title'>{title}</p>
        <div className='card__description'>
            {children}
        </div>
      </div>
    );
}