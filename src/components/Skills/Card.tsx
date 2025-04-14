import React, { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

type CardProps = {
  title: string;
  description: string;
  techStack?: string[];
  githubUrl?: string;
  externalUrl?: string;
  firstimage?: string | null;
  secondimage?: string | null;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  techStack = [],
  githubUrl,
  externalUrl,
  firstimage,
  secondimage,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <ScrollAnimation animateIn="flipInX">
      <div className={`project bg-white rounded-2xl shadow-md p-6 ${showFullDescription ? 'expanded' : ''}`}>
        <header className="flex justify-between items-start mb-4">
          <div className="project-links flex gap-3">
            {/* GitHub Link with Image */}
            {firstimage && (
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <img src={firstimage} alt="GitHub" className="max-w-[3rem] max-h-[3rem] w-auto h-auto" />
              </a>
            )}

            {/* External Link with Image or Icon */}
            {secondimage && (
              externalUrl ? (
                <a href={externalUrl} target="_blank" rel="noreferrer">
                  <img src={secondimage} alt="External" className="w-5 h-5" />
                </a>
              ) : (
                <img
                  src={secondimage}
                  alt="External"
                  className="w-5 h-5 opacity-50 cursor-default"
                  title="Link não disponível"
                />
              )
            )}
          </div>
        </header>

        {/* Project Body */}
        <div className="body mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className={`text-gray-600 mt-2 ${showFullDescription ? 'expanded' : ''}`}>
            {description}
          </p>


          {description.length > 150 && (
            <button
              onClick={toggleDescription}
              className="leia_mais"
            >
              {showFullDescription ? 'Mostrar menos' : 'Leia mais'}
            </button>
          )}

        </div>

        {/* Tech Stack List */}
        {techStack.length > 0 && (
          <footer>
            <ul className="tech-list flex flex-wrap gap-2 text-sm text-gray-500">
              {techStack.map((tech, idx) => (
                <li key={idx} className="bg-gray-100 px-2 py-1 rounded-md">
                  {tech}
                </li>
              ))}
            </ul>
          </footer>
        )}
      </div>
    </ScrollAnimation>
  );
};

export default Card;
