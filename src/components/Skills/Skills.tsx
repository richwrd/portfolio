import { Container } from "./styles";

import Card from "./Card";

import reactIcon from "../../assets/react-icon.svg";
import typescriptIcon from "../../assets/typescript-svgrepo-com.svg";
import postgresqlIcon from "../../assets/postgresql.svg";
import linuxIcon from "../../assets/linux.svg";
import dockerIcon from "../../assets/docker.svg";
import nestjsIcon from "../../assets/nestjs.svg";
import expogoIcon from "../../assets/expo.svg";
import patroniIcon from "../../assets/patroni_rec.png";
import pgpoolIcon from "../../assets/pgpool.png";
import grafanaIcon from "../../assets/grafana.svg";
import prometheusIcon from "../../assets/prometheus.svg";
import minioobjectStoreIcon from "../../assets/minioobjectstore.png";
import pentahoIcon from "../../assets/pdi.png";
import hopIcon from "../../assets/hop.png";
import oracleIcon from "../../assets/oracle-icon.svg";
import oraclenameIcon from "../../assets/oracle.svg";
import nginxProxyManagerIcon from "../../assets/nginx-proxy-manager.png";
import pythonIcon from "../../assets/python.svg";
import portainerIcon from "../../assets/portainer.png";
import etcdIcon from "../../assets/etcd.png";
import powerbiIcon from "../../assets/powerbi.svg";
import cloudflareIcon from "../../assets/cloudflare.svg";
import gdalIcon from "../../assets/gdal.svg";
import wireguardIcon from "../../assets/wireguard.svg";
import jaspersoftIcon from "../../assets/jaspersoft.png";
import langchainIcon from "../../assets/langchain.png";


export function Skills() {

  const staticProjects = [
    {
      title: 'Python',
      description: 'Tenho uma sólida base em Python, utilizada para automações, ferramentas de integração e consumo de APIs REST. Desenvolvi soluções para exportação de relatórios automatizados, integração com Power BI e manipulação de dados. Realizo web scraping de múltiplas fontes com Selenium e tratamento de dados em tempo real. Também trabalho com múltiplos bancos de dados relacionais utilizando SQLAlchemy para sincronização entre PostgreSQL e MySQL. Além disso, aplico testes automatizados com Pytest usando a estrutura Page Object Model (POM), incluindo testes end-to-end (E2E) com Selenium em sistemas web.',
      techStack: [
        'Python', 'SQLAlchemy', 'APIs REST',
        'Web Scraping', 'Selenium', 'Power BI', 'Pytest', 'Page Object Model', 'E2E Testing'
      ],
      githubUrl: 'https://www.python.org/',
      externalUrl: null,
      firstimage: pythonIcon,
      secondimage: null
    },
    {
      title: 'PostgreSQL',
      description: 'Experiência sólida em PostgreSQL, atuando com modelagem relacional eficiente, otimização de queries complexas e manutenção de estruturas robustas para sistemas críticos. Domínio em funções PL/pgSQL, criação de triggers dinâmicas, views materializadas e uso de extensões como PostGIS (geolocalização e geoprocessamento), PG_Vector (vetorização para IA), e ferramentas de auditoria DML customizadas. Amplo conhecimento em replicação síncrona, gerenciamento de permissões e tuning de performance.',
      techStack: ['PostgreSQL', 'PL/pgSQL', 'PostGIS', 'PG_Vector', 'Auditoria DML', 'SQL', 'Replication', 'Performance Tuning', 'Triggers'],
      githubUrl: 'https://github.com/postgres/postgres',
      externalUrl: 'https://www.postgresql.org/',
      firstimage: postgresqlIcon,
      secondimage: null
    },
    {
      title: 'Pentaho Data Integration & Apache Hop',
      description: 'Experiência com implantação e gerenciamento de ETLs automatizados com o Pentaho Data Integration (Kettle). Desenvolvido fluxos para execuções diárias de extração, transformação e carga de dados. Atuando na higienização de bases legadas, padronização de dados e criação de estruturas intermediárias para relatórios e análises. Integrado a múltiplos bancos relacionais e fontes externas.',
      techStack: ['Pentaho', 'Apache Hop', 'ETL', 'Data Cleaning', 'Database Automation', 'Kettle', 'Transformations'],
      githubUrl: 'https://pentaho.com/products/pentaho-data-integration/',
      externalUrl: 'https://pentaho-community.atlassian.net/wiki/spaces/EAI/overview',
      firstimage: pentahoIcon,
      secondimage: hopIcon
    },
    {
      title: 'TypeScript',
      description: 'Utilizado extensivamente em projetos back-end com NestJS e front-end com React Native (Expo), garantindo tipagem estática robusta, segurança em tempo de desenvolvimento e legibilidade de código. Experiência com módulos ES, decorators, DTOs, e integração com APIs REST e WebSockets. Produção de código limpo e escalável, com uso de padrões como Dependency Injection, Repository Pattern e testes automatizados com Jest.',
      techStack: ['TypeScript', 'NestJS', 'React Native', 'REST API', 'WebSocket', 'Jest', 'DTOs', 'OOP'],
      githubUrl: 'https://github.com/microsoft/TypeScript',
      externalUrl: 'https://www.typescriptlang.org/',
      firstimage: typescriptIcon,
      secondimage: null
    },
    {
      title: 'NestJS',
      description: 'Experiência no desenvolvimento de APIs robustas e escaláveis com NestJS, aplicando boas práticas como injeção de dependência, validação, autenticação JWT e documentação com Swagger. Utilizado em projetos como a API do "Alugue Quadras", voltada para gerenciamento e reserva de quadras esportivas.',
      techStack: ['NestJS', 'TypeScript', 'REST API', 'Swagger', 'JWT Auth', 'PostgreSQL', 'TypeORM', 'S3'],
      githubUrl: 'https://github.com/richwrd/aluguequadras/back-end',
      externalUrl: 'https://back-end.aluguequadras.com/docs',
      firstimage: nestjsIcon,
      secondimage: null
    },
    {
      title: 'React Native & Expo Go',
      description: 'Experiência com desenvolvimento mobile utilizando React Native com Expo Go, focando em interfaces responsivas e navegação fluida. A stack foi aplicada no app do projeto "Alugue Quadras", permitindo que usuários realizem reservas, consultem disponibilidade e se conectem com donos de quadras de forma prática e intuitiva.',
      techStack: ['React Native', 'Expo Go', 'TypeScript', 'Mobile UI', 'Axios', 'React Navigation'],
      githubUrl: 'https://github.com/richwrd/aluguequadras/front-end',
      externalUrl: 'https://expo.dev/@richard-dev/aluguequadras',
      firstimage: reactIcon,
      secondimage: expogoIcon
    },
    {
      title: 'Power BI',
      description: 'Responsável por implementar dashboards integrados com dados do Redmine via conexão JBDC PostgreSQL. Estruturei queries SQL complexas diretamente no banco para evitar cálculos nas fórmulas do Power BI, otimizando a performance e garantindo maior controle sobre as transformações. Os painéis foram construídos de forma descritiva e analítica, facilitando o acompanhamento de métricas, SLAs e produtividade por equipe. Experiência com modelagem de dados no Power BI, filtros interativos e publicação em workspaces organizacionais.',
      techStack: ['Power BI', 'PostgreSQL', 'JDBC', 'SQL', 'Data Visualization', 'Redmine'],
      githubUrl: null,
      externalUrl: 'https://powerbi.microsoft.com/',
      firstimage: powerbiIcon,
      secondimage: null
    },
    {
      title: 'Jaspersoft Reports',
      description: 'Responsável pelo desenvolvimento e implementação de relatórios altamente visuais e interativos com Jaspersoft Studio, integrando múltiplas fontes de dados e serviços externos. Utilização da API do Mapbox para visualização de geometrias, além de conexão com serviços AWS como RDS e S3. Expertise em sub-relatórios, parâmetros dinâmicos e personalização visual avançada, garantindo entregas ricas e eficientes para ambientes de análise gerencial e geoespacial.',
      techStack: ['Jaspersoft', 'Mapbox', 'AWS RDS', 'AWS S3', 'PostgreSQL', 'REST API', 'PL/pgSQL', 'PostGIS'],
      githubUrl: 'https://github.com/TIBCOSoftware/jasperreports',
      externalUrl: 'https://community.jaspersoft.com/',
      firstimage: jaspersoftIcon,
      secondimage: null
    },
    ,
    {
      title: 'MinIO Object Store',
      description: 'Implantação e configuração do MinIO como solução de armazenamento de objetos compatível com S3 no projeto Alugue Quadras. Utilizado para armazenar e servir arquivos de mídia como imagens de perfis, quadras e comprovantes. Configurado com buckets privados e políticas de acesso seguras, integrado à aplicação via SDK e acessado de forma eficiente através de endpoints internos.',
      techStack: ['MinIO', 'Object Storage', 'S3 Compatible', 'Buckets', 'Cloud Storage', 'Alugue Quadras'],
      githubUrl: 'https://github.com/minio/minio',
      externalUrl: 'https://min.io/',
      firstimage: minioobjectStoreIcon,
      secondimage: null
    },
    {
      title: 'GDAL',
      description: 'Experiência sólida com manipulação de arquivos geoespaciais (.tiff), utilizando GDAL para processamento de ortofotos em larga escala (cidades inteiras). Realizei operações como criação de overviews (pirâmides) para otimização de desempenho, aplicação de bandas alpha para transparência, compressão com preservação de qualidade, e recortes personalizados com base em shape files ou coordenadas específicas. O fluxo de trabalho foi essencial para servir imagens georreferenciadas com eficiência em plataformas SIG e web.',
      techStack: ['GDAL', 'GeoTIFF', 'Ortofoto', 'Alpha Band', 'Compression', 'Raster', 'Geoprocessamento'],
      githubUrl: 'https://github.com/OSGeo/gdal',
      externalUrl: 'https://gdal.org/',
      firstimage: gdalIcon,
      secondimage: null
    },
    {
      title: 'Patroni',
      description: 'Experiência com implantação, configuração e gerenciamento de clusters PostgreSQL de alta disponibilidade utilizando Patroni. Utilizado em conjunto com etcd para coordenação de failover automático, replicação síncrona, e integração com Pgpool-II para balanceamento de carga e tolerância a falhas.',
      techStack: ['Patroni', 'etcd', 'Failover', 'Replication', 'Watchdog', 'PostgreSQL HA', 'Cluster'],
      githubUrl: 'https://github.com/zalando/patroni',
      externalUrl: 'https://patroni.readthedocs.io/',
      firstimage: patroniIcon,
      secondimage: null
    },
    {
      title: 'Pgpool-II',
      description: 'Experiência com implantação, configuração e administração do Pgpool-II para balanceamento de carga, failover e failback automático em ambientes com PostgreSQL em alta disponibilidade. Implementado com Watchdog para remoção de ponto único de falha e integração com Patroni para garantir consistência no gerenciamento do nó primário.',
      techStack: ['Pgpool-II', 'Load Balancing', 'Watchdog', 'Failover', 'Failback', 'PostgreSQL HA', 'Cluster'],
      githubUrl: 'https://github.com/pgpool/pgpool2',
      externalUrl: 'https://www.pgpool.net/',
      firstimage: pgpoolIcon,
      secondimage: null
    },
    {
      title: 'Etcd',
      description: 'Experiência com configuração e gerenciamento de clusters etcd como backend de consenso para sistemas distribuídos. Utilizado principalmente em conjunto com o Patroni para coordenação de líderes e failover automatizado em ambientes PostgreSQL HA. Conhecimento em topologias multi-nó, autenticação via certificados TLS, snapshot/restore de dados, e monitoramento da saúde do cluster com Prometheus. Domínio na comunicação entre nós via gRPC e no ajuste de parâmetros críticos para garantir consistência e disponibilidade em produção.',
      techStack: ['etcd', 'Distributed Systems', 'gRPC', 'TLS', 'Prometheus', 'HA Cluster'],
      githubUrl: 'https://github.com/etcd-io/etcd',
      externalUrl: 'https://etcd.io/',
      firstimage: etcdIcon,
      secondimage: null
    },
    {
      title: 'LangChain',
      description: 'Estudo e aplicação prática do LangChain em um projeto de TCC focado em IA generativa e RAG (Retrieval-Augmented Generation). Utilização de modelos locais via Ollama integrados a bases PostgreSQL com extensão pg_vector para embeddings e recuperação semântica de dados. Desenvolvimento em Python com pipelines personalizados de ingestão, chunking e vetorização de documentos. Integração com LLMs para resposta a perguntas contextuais com alto desempenho e baixa latência.',
      techStack: ['LangChain', 'Python', 'Ollama', 'PostgreSQL', 'pg_vector', 'RAG', 'Embeddings', 'LLM'],
      githubUrl: 'https://github.com/langchain-ai/langchain',
      externalUrl: 'https://www.langchain.com/',
      firstimage: langchainIcon,
      secondimage: null
    }

  ];


  const staticDevOps = [
    {
      title: 'Linux',
      description: 'Experiência sólida com administração de sistemas Linux como CentOS e Debian, utilizando Zsh para gerenciamento e configuração, além de experiência em VPS como Oracle, Amazon e outras distribuições Linux. Domínio em automação com scripts para tarefas rotineiras e operacionais.',
      techStack: ['Linux', 'Zsh', 'Shell Script', 'Debian', 'CentOS', 'Oracle VPS', 'AWS EC2', 'Systemd', 'Networking'],
      githubUrl: 'https://github.com/torvalds/linux',
      externalUrl: 'https://www.kernel.org/',
      firstimage: linuxIcon,
      secondimage: null
    },
    {
      title: 'Oracle Cloud VPS',
      description: 'Uso intensivo da instância VPS gratuita da Oracle Cloud para hospedagem de múltiplos serviços e aplicações via Docker, todos orquestrados e gerenciados pelo Portainer. A VPS abriga servidores de banco de dados, Nginx Proxy Manager, aplicações pessoais e até um servidor de Minecraft customizado para jogar com amigos. Com o Portainer, mantenho uma gestão visual, simplificada e eficiente de todos os containers, redes e volumes.',
      techStack: ['Oracle Cloud', 'VPS', 'Docker', 'Portainer', 'Self-Hosting', 'Minecraft Server'],
      githubUrl: 'https://github.com/oracle/oci-cli',
      externalUrl: 'https://www.oracle.com/cloud/free/',
      firstimage: oracleIcon,
      secondimage: oraclenameIcon
    },
    {
      title: 'Docker & Docker Compose',
      description: 'Experiência no uso de Docker para criação e gerenciamento de containers, com ênfase em ambientes de desenvolvimento e produção. Habilidade em orquestrar serviços com Docker Compose, criando ambientes isolados, reproduzíveis e escaláveis para aplicações.',
      techStack: ['Docker', 'Docker-Compose', 'Containers', 'Networks', 'DevOps'],
      githubUrl: 'https://github.com/docker',
      externalUrl: 'https://www.docker.com/',
      firstimage: dockerIcon,
      secondimage: null
    },
    {
      title: 'Portainer',
      description: 'Utilizo o Portainer como solução principal para gerenciamento de ambientes Docker em minha infraestrutura. Através de sua interface gráfica intuitiva, administro containers, redes, volumes e stacks com agilidade. Todos os meus serviços — incluindo bancos de dados, Nginx Proxy Manager, aplicações pessoais e ambientes de testes — são orquestrados e monitorados pelo Portainer, garantindo uma gestão visual, prática e centralizada. Ele permite o rápido provisionamento de ambientes isolados e a automação de tarefas rotineiras, sendo peça-chave no meu ecossistema de self-hosting.',
      techStack: ['Portainer', 'Docker', 'Containers', 'Volumes', 'Self-Hosting', 'Orquestração'],
      githubUrl: 'https://github.com/portainer/portainer',
      externalUrl: 'https://www.portainer.io/',
      firstimage: portainerIcon, // substitua pelo ícone real se tiver
      secondimage: null
    },
    {
      title: 'Nginx Proxy Manager',
      description: 'Utilizado para gerenciar proxies reversos, certificados SSL e redirecionamentos de forma centralizada na minha VPS Oracle. Configurado para hospedar múltiplos sites e aplicações com interface gráfica amigável, gerenciamento de domínios personalizados e integração com Let’s Encrypt para provisionamento automático de certificados HTTPS.',
      techStack: ['Nginx Proxy Manager', 'Reverse Proxy', 'SSL', 'Let’s Encrypt', 'Oracle VPS', 'Self-Hosting'],
      githubUrl: 'https://github.com/NginxProxyManager/nginx-proxy-manager',
      externalUrl: 'https://nginxproxymanager.com/',
      firstimage: nginxProxyManagerIcon,
      secondimage: null
    },
    {
      title: 'Cloudflare',
      description: 'Experiência com configuração e gerenciamento de DNS através do Cloudflare, garantindo alta disponibilidade, segurança e performance nas aplicações. Realizei apontamentos para balanceadores de carga, redirecionamentos com regras personalizadas, proteção contra ataques DDoS, e otimização de cache para sites e APIs. Familiaridade com interface web.',
      techStack: ['Cloudflare', 'DNS', 'CDN', 'Segurança', 'Performance', 'DDoS Protection'],
      githubUrl: null,
      externalUrl: 'https://www.cloudflare.com/',
      firstimage: cloudflareIcon,
      secondimage: null
    },
    {
      title: 'WireGuard',
      description: 'Experiência com configuração, gerenciamento e manutenção de túneis VPN utilizando WireGuard. Criação de redes privadas seguras entre múltiplos servidores, com foco em desempenho, criptografia moderna e simplicidade operacional. Automatizei processos de geração de chaves, adição de peers e definição de regras de roteamento. Utilizado para garantir comunicação segura entre ambientes on-premises e em nuvem (ex: Oracle Cloud e AWS).',
      techStack: ['WireGuard', 'VPN', 'Networking', 'Linux', 'Segurança', 'DevOps'],
      githubUrl: 'https://github.com/WireGuard/wireguard-tools',
      externalUrl: 'https://www.wireguard.com/',
      firstimage: wireguardIcon,
      secondimage: null
    },
    {
      title: 'Grafana',
      description: 'Experiência com implantação, configuração e personalização de dashboards no Grafana para monitoramento completo de clusters PostgreSQL HA. Integrado com Prometheus, PgExporter, PgpoolExporter e métricas personalizadas para acompanhar o estado do Patroni, replicação, WALs, nós primários e secundários, e o comportamento do Pgpool-II em tempo real.',
      techStack: ['Grafana', 'PostgreSQL', 'Pgpool-II', 'Patroni', 'Prometheus', 'Monitoring'],
      githubUrl: 'https://github.com/grafana/grafana',
      externalUrl: 'https://grafana.com/',
      firstimage: grafanaIcon,
      secondimage: null
    },
    {
      title: 'Prometheus',
      description: 'Responsável pela coleta e armazenamento de métricas do cluster PostgreSQL HA. Configurado para monitorar serviços como Patroni, Pgpool-II, PostgreSQL, etcd e exporters dedicados (PgExporter, PgpoolExporter). Utilizado em conjunto com o Grafana para visualização em tempo real do estado do cluster, desempenho de consultas, replicação, uso de recursos e failovers.',
      techStack: ['Prometheus', 'PostgreSQL', 'Pgpool-II', 'Patroni', 'Metrics', 'Monitoring'],
      githubUrl: 'https://github.com/prometheus/prometheus',
      externalUrl: 'https://prometheus.io/',
      firstimage: prometheusIcon,
      secondimage: null
    },
  ]

  // const dynamicProjects = [
  //   'LangChain'
  // ].map((tech) => ({
  //   title: tech,
  //   description: `${tech} é uma das tecnologias que domino e utilizo em meus projetos de software e infraestrutura.`,
  //   techStack: [tech],
  //   githubUrl: '',
  //   externalUrl: null,
  //   firstimage: null,
  //   secondimage: null
  // }));

  const projects = [
    ...staticProjects
  ];

  const devOps = [...staticDevOps];


  return (
    <Container id="skills">
      <h2>Tecnologias & Ferramentas</h2>
      <h3 style={{ textAlign: "center" }}>As stacks que utilizo no meu dia a dia para desenvolver soluções de ponta:</h3>
      <div className="projects">
        {projects.map((project, index) => (
          project && (
            <Card
              key={index}
              title={project.title || 'Sem titulo'}  // Garante que title seja sempre uma string
              description={project.description || ''}  // Garante que description seja uma string
              techStack={project.techStack || []}  // Garante que techStack seja sempre um array
              githubUrl={project.githubUrl || ''}  // Se não houver GitHub, passa string vazia
              externalUrl={project.externalUrl || ''}  // Se não houver externalUrl, passa null
              firstimage={project.firstimage || ''}  // Se não houver firstimage, passa null
              secondimage={project.secondimage || ''}  // Se não houver secondimage, passa null
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
              title={project.title || 'Sem titulo'}  // Garante que title seja sempre uma string
              description={project.description || ''}  // Garante que description seja uma string
              techStack={project.techStack || []}  // Garante que techStack seja sempre um array
              githubUrl={project.githubUrl || ''}  // Se não houver GitHub, passa string vazia
              externalUrl={project.externalUrl || ''}  // Se não houver externalUrl, passa null
              firstimage={project.firstimage || ''}  // Se não houver firstimage, passa null
              secondimage={project.secondimage || ''}  // Se não houver secondimage, passa null
            />
          )
        ))}
      </div>
    </Container >
  );
}