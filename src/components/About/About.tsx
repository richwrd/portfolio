import { Container } from "./styles";
import ScrollAnimation from "react-animate-on-scroll";

import minha_imagem from "../../assets/eu.png";

export function About() {
  return (
    <Container id="about">
      <div className="about-text">
        <ScrollAnimation animateIn="fadeInLeft">
          <h2>Sobre mim</h2>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInLeft" delay={0.1 * 1000}>
          <p>
            Fala aí! Sou o Richard 👋 — engenheiro de software e completamente apaixonado por resolver problemas com código. Acredito que tecnologia bem aplicada transforma projetos e melhora a vida das pessoas de verdade.
            <br /><br />
            Gosto de desafios e encaro cada problema como uma oportunidade de aprendizado. Bugs me despertam curiosidade, e novas ideias sempre merecem ser exploradas. Valorizo a criatividade, o pensamento fora da caixa e aquele entusiasmo constante por inovação — geralmente acompanhado de café e um bom git commit -m "mais uma ideia promissora".            <br /><br />
            Na prática, minha stack gira em torno de:
            <br /><br />
            • <strong>PostgreSQL</strong>: administração, otimização, replicação e criação de triggers personalizadas;<br />
            • <strong>Python</strong>: automações, integração com APIs REST e scripts utilitários;<br />
            • <strong>ETL</strong> com Pentaho/Hop, lidando com grandes volumes de dados;<br />
            • <strong>NestJS</strong> no back-end e <strong>React Native com Expo</strong> no front-end;<br />
            • Atuação em <strong>DevOps</strong>: deploys na Oracle Cloud, configuração de NGINX, Docker, rodando tudo em Linux (CentOS) com terminal tunado no Zsh.
            <br /><br />
            Sou proativo, resiliente e acredito muito no poder do trabalho em equipe. Comunicação clara e colaboração são chaves pra qualquer projeto dar certo — e eu gosto mesmo é de somar.
          </p>
        </ScrollAnimation>
      </div>
      <div className="about-image">
        <ScrollAnimation animateIn="fadeInRight" delay={0.20 * 1000}>
          <img className="perfil" src={minha_imagem} alt="Richard" />
        </ScrollAnimation>
      </div>
    </Container>
  )
}
