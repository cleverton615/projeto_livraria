import { editora } from "../models/Editora.js";

class EditoraController {

  static async listarEditoras (req, res) {
    try {
      const listaEditoras = await editora.find({});
      res.status(200).json(listaEditoras);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarEditoraPorId (req, res) {
    try {
      const id = req.params.id;
      const editoraEncontrada = await editora.findById(id);
      res.status(200).json(editoraEncontrada);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição da editora` });
    }
  };

  static async cadastrarEditora (req, res) {
    try {
      const novaEditora = await editora.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novaEditora });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar editora` });
    }
  }

  static async atualizarEditora (req, res) {
    try {
      const id = req.params.id;
      await editora.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "editora atualizada" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  static async excluirEditora (req, res) {
    try {
      const id = req.params.id;
      await editora.findByIdAndDelete(id);
      res.status(200).json({ message: "editora excluída com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };
};

export default EditoraController;