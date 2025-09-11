import { Container } from "./styles";
import Card from "./Card";
import projectsData from "../../data/projects.json";

export function Project() {
  const projects = projectsData;

  return (
    <Container id="project">
      <h2>Projetos</h2>
      <h3 style={{ textAlign: "center" }}>Alguns dos projetos que desenvolvi aplicando tecnologias modernas:</h3>
      <p style={{ textAlign: "center" }}>Cada projeto representa uma solução única, desde plataformas completas até ferramentas especializadas para diferentes necessidades.</p>

      <div className="projects">
        {projects.map((project, index) => (
          project && (
            <Card
              key={index}
              title={project.title || 'Sem titulo'}
              description={project.description || ''}
              techStack={project.techStack || []}
              githubUrl={project.githubUrl || null}
              externalUrl={project.externalUrl || null}
              firstimage={project.firstimage || null}
              secondimage={project.secondimage || null}
            />
          )
        ))}
      </div>
    </Container>
  );
}