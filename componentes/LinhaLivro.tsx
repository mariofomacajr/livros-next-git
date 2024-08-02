import React from 'react';
import { Livro } from '../classes/modelo/Livro';
import { ControleEditora } from '../classes/controle/ControleEditora';

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}

export const controleEditora = new ControleEditora();

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const { livro, excluir } = props;

  return (
    <tr> 
      <td>{livro.codigo}</td>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{controleEditora.getNomeEditora(livro.codEditora)}</td> 
      <td>{livro.autores.join(', ')}</td> 
      <td>
        <button 
          className="btn btn-danger"
          onClick={() => excluir(livro.codigo)} 
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};