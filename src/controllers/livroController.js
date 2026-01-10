import mongoose from "mongoose";
import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import { editora } from "../models/Editora.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição do livro` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const editoraEncontrada = await editora.findById(novoLivro.editora);
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
        editora: { ...editoraEncontrada._doc },
      };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na atualização` });
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  }

  static async listarLivrosPorEditora(req, res) {
    const editoraId = req.query.editora;
    try {
      if (!editoraId) {
        return res.status(400).json({ message: "ID da editora não fornecido" });
      }
      
      const objectId = new mongoose.Types.ObjectId(editoraId);
      const livrosPorEditora = await livro.find({ "editora._id": objectId });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      console.error("Erro ao buscar livros por editora:", erro);
      res.status(500).json({ message: `${erro.message} - falha na busca` });
    }
  }
}

export default LivroController;
