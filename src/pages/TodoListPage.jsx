import { useEffect, useState } from 'react';
import { data, Link } from 'react-router-dom';
import api from '../services/api';
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineClear } from 'react-icons/md';

export default function TodoListPage() {
  const [tarefas, setTarefas] = useState([]);

  const fetchTarefas = async () => {
    const res = await api.get('/tarefas');
    setTarefas(res.data);
  };

  const deleteTarefa = async (id) => {
    await api.delete(`/tarefas/${id}`);
    fetchTarefas();
  };

  const ajustaData = (data) => {
    const dataFormatada = new Date(data);
    dataFormatada.setDate(dataFormatada.getDate() + 1);
    return dataFormatada.toLocaleDateString('pt-BR');
  }

  useEffect(() => {
    fetchTarefas();
  }, []);

  return (
    <>
      <div className='form'>
        <div className='filtrosBox'>
          <div className='filtroItem'>
            <label><p>Título:</p></label>
            <input type='text'></input>
          </div>
          
          <div className='filtroItem'>
            <label><p>Prazo até:</p></label>
            <input type='text'></input>
          </div>

          <div className='filtroItem'>
            <label><p>Status:</p></label>
            <input type='text'></input>
          </div>
        </div>
      </div>

      <div className='form'>
        <div className='rowTarefa'>

          {tarefas.map((t) => (
            <div className='colTarefa' key={t._id}>
              <div className='infoTarefa'>

                <div className='boxTitleTarefa'>
                  <h3 className='titleTarefa'>{t.titulo}</h3>

                </div>
                <p>Fazer até <strong>{ajustaData(t.prazo)}</strong></p>
                <p><strong>{t.concluida ? (<div class='tarefaConcluida'>Concluída</div>) : (<div class='tarefaEmAberto'>Em aberto</div>)}</strong></p>

                <p>{t.descricao}</p>

                <Link className='button' to={`/tarefas/editar/${t._id}`}><MdOutlineEdit /></Link>
                <button className='button' onClick={() => deleteTarefa(t._id)}><MdOutlineClear /></button>
              </div>
            </div>
          ))}
          {tarefas.length == 0 ? (
            <div className='semTarefas'>
              <p>Não há tarefas</p>
            </div>
            ): ""}
        </div>
      </div>

    </>
  );
}