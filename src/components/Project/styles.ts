import styled from "styled-components";


export const Container = styled.section`
  margin-top: 15rem;
  
  h2{
    text-align: center;
    font-size: 4rem;
    margin-bottom: 3rem;
  }

  h3{
    // text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
  }
  
  p{
    text-align: left;
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  .projects{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 2rem;
    padding: 1rem;
    overflow: hidden;

    .project{
      padding: 2rem 1.8rem;
      background-color: #2b2b2b;
      border-radius: 1.2rem;
      transition: height 0.3s ease, transform 0.25s;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      color: #FFF;
      word-break: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
      &:hover{
        transform: translateY(-5px);
        background-color: var(--pink);
      }

      .project.expanded {
        height: auto;
      }

      header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--blue);
        margin-bottom: 3.6rem;
        .project-links{
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        a > img {
          width: 5.0rem;
        }
      }
      
      h3{
        margin-bottom: 2rem;
        align-items: center;
      }
  
      p{
        transition: max-height 0.3s ease;
        letter-spacing: 0.20rem;
        margin-bottom: 2rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        a{
          color: #FFFF;
          border-bottom: 1px solid var(--green);
          transition: color 0.25s;
          &:hover{
            color: var(--green);
          }
        }
      }

      p.clamp {
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      p {
        transition: max-height 0.4s ease;
        letter-spacing: 0.20rem;
        margin-bottom: 2rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      p.expanded {
        -webkit-line-clamp: unset;
        max-height: 500px; /* ajustável para um limite razoável */
        display: block;
      }

      button.leia_mais {
        padding: 0.5rem 2rem;
        margin-bottom: 2rem;
        font-size: 1rem;
        background-color: transparent;
        color: var(--blue);
        border: 1px solid var(--blue);
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
        &:hover {
          background-color: var(--blue);
          color: white;
        }
      }

      footer {
        margin-top: auto;
        
        .tech-list {
          display: flex;
          flex-wrap: wrap; /* Permite que os itens quebrem para a linha de baixo */
          gap: 2rem; /* Espaçamento entre os itens */
          font-size: 1.4rem;
          align-items: center;
          justify-content: left;
          opacity: 0.6;
        }
      }


    }
  }

  @media (max-width: 960px){
    .projects{
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 740px){
    .projects{
      grid-template-columns: 1fr;
    }
  }
    .hard-skills{
    margin-top: 1.6rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.8rem;
    
  }
  .hability {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid green; 
    padding: 12px 12px 6px 12px;
    border-radius: 15px;
}

.hability img {
    width: 3.4rem;
}

`