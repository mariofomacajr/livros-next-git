import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.'; 

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      const codigo = Number(req.query.codigo); 
      await controleLivro.excluir(codigo);
      res.status(200).json({ message: 'Livro excluído com sucesso!' });
    } else {
      res.status(405).end(); 
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar a solicitação.' });
  }
};