import React, { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import githubIcon from "../../assets/github.svg";
import externalLink from "../../assets/external-link.svg";

type CardProps = {
  title: string;
  description: string;
  techStack?: string[];
  githubUrl?: string | null;
  externalUrl?: string | null;
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
      <div className={`project ${showFullDescription ? 'expanded' : ''}`}>
        <header>
          <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <title>Folder</title>
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <div className="project-links">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <img src={firstimage || githubIcon} alt="Visit GitHub" />
              </a>
            )}
            {externalUrl && (
              <a href={externalUrl} target="_blank" rel="noreferrer">
                <img src={secondimage || externalLink} alt="Visit External Link" />
              </a>
            )}
          </div>
        </header>

        <div className="body">
          <h3>{title}</h3>
          <p className={`${showFullDescription ? 'expanded' : ''}`}>
            {description}
          </p>

          {description.length > 200 && (
            <button
              onClick={toggleDescription}
              className="leia_mais"
            >
              {showFullDescription ? 'Mostrar menos' : 'Leia mais'}
            </button>
          )}
        </div>

        {techStack.length > 0 && (
          <footer>
            <ul className="tech-list">
              {techStack.map((tech, idx) => (
                <li key={idx}>
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
