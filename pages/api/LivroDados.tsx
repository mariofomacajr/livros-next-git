import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import styles from '../styles/Home.module.css';
import { ControleEditora } from '../../classes/controle/ControleEditora';
import { Livro } from '../../classes/modelo/Livro';
import Menu from '../../componentes/Menu';

const controleEditora = new ControleEditora();
const baseURL = 'http://localhost:3000/api/livros';

const LivroDados: React.FC = () => {
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const navigate = useRouter(); 

  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(evento.target.value));
  };

  const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const livro: Livro = {
      codigo: 0, 
      codEditora,
      titulo,
      resumo,
      autores: autores.split('\n'), 
    };

    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
    });
    if (response.ok) {
      navigate.push('/LivroLista'); 
    } else {
       console.error("Erro ao incluir livro"); 
    }
  };

  return (
    <div className={styles.container}>
      <head>
         <title>Cadastro de Livro</title> 
       </head>
       <Menu/> 
      <main className={styles.main}>
        <h1 className={styles.title}>Cadastro de Livro</h1>
        <form onSubmit={incluir}> 
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="resumo">Resumo:</label>
            <textarea
              className="form-control"
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="codEditora">Editora:</label>
            <select
              className="form-control"
              id="codEditora"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="autores">Autores (um por linha):</label>
            <textarea
              className="form-control"
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Incluir
          </button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;