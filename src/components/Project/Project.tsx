import { Container } from "./styles";
import githubIcon from "../../assets/github.svg"
// import DownloadApp from '../../assets/download.webp'
import externalLink from "../../assets/external-link.svg"
import ScrollAnimation from "react-animate-on-scroll";


export function Project() {
  return (
    <Container id="project">
      <h2>Projetos</h2>

      <div className="projects">

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a href="https://github.com/AllanOgawa/AlugueQuadras" target="_blank" rel="noreferrer">
                  <img src={githubIcon} alt="Visit GitHub" />
                </a>
              </div>
            </header>
            <div className="body">
              <h3>🏐 AlugueQuadras</h3>
              <p>
                Plataforma completa para gerenciamento de aluguel de quadras esportivas. Desenvolvi o back-end com autenticação, sistema de reservas, pagamentos online, notificações e CRUD completo. No DevOps, atuei na automação de deploy, CI/CD e escalabilidade para operação 24/7 com alta disponibilidade. Projeto focado em usabilidade, segurança (LGPD) e performance.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>NestJS</li>
                <li>PostgreSQL</li>
                <li>Docker</li>
                <li>CI/CD</li>
                <li>React Native</li>
                <li>AWS</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              {/* <div className="project-links">
                <a href="" target="_blank" rel="noreferrer">
                  <img src={githubIcon} alt="Visit GitHub" />
                </a>
              </div> */}
            </header>
            <div className="body">
              <h3>🎙️ Speech Analytics</h3>
              <p>
                Plataforma de processamento contínuo de áudios de call centers, com extração de dados via AWS S3, análise de sentimentos, detecção de silêncio e transcrição.
                As informações são estruturadas e armazenadas em PostgreSQL, com execução 24/7 via CLI automatizada.
                Ideal para times que desejam insights objetivos a partir de interações por voz.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>Python</li>
                <li>PostgreSQL</li>
                <li>AWS S3</li>
                <li>CLI</li>
                <li>Threading</li>
                <li>Async (em progresso)</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a href="https://github.com/richwrd/PgAuditGraph" target="_blank" rel="noreferrer">
                  <img src={githubIcon} alt="Visit GitHub" />
                </a>
              </div>
            </header>
            <div className="body">
              <h3>🐘 PgAuditGraph</h3>
              <p>
                Solução leve e extensível de auditoria DML para PostgreSQL, com controle dinâmico por schema e logs estruturados em JSONB.
                Ideal para desenvolvedores, DBAs e times de infraestrutura que precisam de rastreabilidade confiável.
                Em breve: integração com Grafana para visualização em tempo real e implantação via Docker.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>PostgreSQL</li>
                <li>PL/pgSQL</li>
                <li>Grafana (em breve)</li>
                <li>Docker</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a href="https://github.com/richwrd/SimpleECommerce" target="_blank" rel="noreferrer">
                  <img src={githubIcon} alt="Visit GitHub" />
                </a>
              </div>
            </header>
            <div className="body">
              <h3>🛍️ SimpleECommerce</h3>
              <p>
                Sistema completo de e-commerce com front-end em Vue.js e back-end em Node.js com MongoDB.
                Possui autenticação, gerenciamento de produtos e carrinho, além de persistência real de dados. Ideal para aprendizado de aplicações fullstack com API REST.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>Vue.js</li>
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>JavaScript</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>


        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a href="https://github.com/richwrd/PotterWiki" target="_blank" rel="noreferrer">
                  <img src={githubIcon} alt="Visit GitHub" />
                </a>
              </div>
            </header>
            <div className="body">
              <h3>🧙 PotterWiki</h3>
              <p>
                Enciclopédia digital baseada no universo de Harry Potter, integrando uma API pública com uma interface leve e responsiva.
                Permite a consulta de personagens, casas e varinhas, com design simples e navegação intuitiva. Ideal como projeto prático para consumo de APIs REST e construção de interfaces reativas.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>React</li>
                <li>JavaScript</li>
                <li>API REST</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

      </div>
    </Container>
  );
}