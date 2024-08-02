import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Livro } from '../../classes/modelo/Livro';
import { LinhaLivro } from '../../componentes/LinhaLivro';
import styles from '../styles/Home.module.css';
import Menu from '../../componentes/Menu';

const baseURL = 'http://localhost:3000/api/livros';

const obter = async (): Promise<Livro[]> => {
  const response = await fetch(baseURL);
  return await response.json();
};

const excluirLivro = async (codigo: number): Promise<boolean> => {
  const response = await fetch(`${baseURL}/${codigo}`, {
    method: 'DELETE',
  });
  return response.ok; 
};

const LivroLista: NextPage = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    const carregarLivros = async () => {
      const livrosCarregados = await obter();
      setLivros(livrosCarregados);
      setCarregado(true);
    };
    carregarLivros();
  }, [carregado]); 

  const excluir = async (codigo: number) => {
    if (await excluirLivro(codigo)) {
      setCarregado(false);
    }
  };

  return (
    <div className={styles.container}>
       <head>
         <title>Catálogo de Livros</title> 
       </head>
       <Menu/> 
      <main className={styles.main}>
        <h1 className={styles.title}>Catálogo de Livros</h1>
        <table className="table table-striped"> 
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
              <th>Ações</th> 
            </tr>
          </thead>
          <tbody>
            {carregado &&
              livros.map((livro: Livro) => (
                <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;