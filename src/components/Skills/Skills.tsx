import { Container } from "./styles";
import Card from "./Card";
import skillsData from "../../data/skills.json";
import devopsData from "../../data/devops.json";
import { iconMap } from "./iconMap";

export function Skills() {
  // Mapear os dados dos JSONs para incluir os ícones reais
  const projects = skillsData.map(skill => ({
    ...skill,
    firstimage: skill.firstimage ? iconMap[skill.firstimage] : null,
    secondimage: skill.secondimage ? iconMap[skill.secondimage] : null
  }));

  const devOps = devopsData.map(devop => ({
    ...devop,
    firstimage: devop.firstimage ? iconMap[devop.firstimage] : null,
    secondimage: devop.secondimage ? iconMap[devop.secondimage] : null
  }));

  return (
    <Container id="skills">
      <h2>Tecnologias & Ferramentas</h2>
      <h3 style={{ textAlign: "center" }}>As stacks que utilizo no meu dia a dia para desenvolver soluções de ponta:</h3>
      <div className="projects">
        {projects.map((project, index) => (
          project && (
            <Card
              key={index}
              title={project.title || 'Sem titulo'}
              description={project.description || ''}
              techStack={project.techStack || []}
              githubUrl={project.githubUrl || ''}
              externalUrl={project.externalUrl || ''}
              firstimage={project.firstimage || ''}
              secondimage={project.secondimage || ''}
            />
          )
        ))}
      </div>

      <br />

      <h2>DevOps</h2>
      <div className="projects">
        {devOps.map((project, index) => (
          project && (
            <Card
              key={index}
              title={project.title || 'Sem titulo'}
              description={project.description || ''}
              techStack={project.techStack || []}
              githubUrl={project.githubUrl || ''}
              externalUrl={project.externalUrl || ''}
              firstimage={project.firstimage || ''}
              secondimage={project.secondimage || ''}
            />
          )
        ))}
      </div>
    </Container >
  );
}