import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';
import './index.css'

enum sexo {
    M,
    F
}

interface Ideveloper {
    id: number,
    nome: string,
    sexo: sexo,
    idade: number,
    hobby: string,
    datanascimento: Date
}

const Developers: React.FC = () => {

    const [developer, setDeveloper] = useState<Ideveloper[]>([]);
    const history = useHistory();

    useEffect(() => {
        loadDevelpers()
    }, [])

    async function loadDevelpers() {

        const response = await api.get('/developers');
        setDeveloper(response.data);
    }

    async function deleteDeveloper(id: number){
        await api.delete(`/developers/${id}`); 
        loadDevelpers();
    }

    function formateDate(date: Date) {
        return moment(date).add(1, 'days').format("DD/MM/YYYY");
    }

    function newDeveloper (){
        history.push('/developers/create');
    }

    function editDeveloper (id: number){
        history.push(`/developers/create/${id}`);
    }

    function detailDeveloper (id: number){
        history.push(`/developers/detail/${id}`);
    }

    return (
        <div className="container">
            <br />
            <div className="developer-header">
                <h1>
                    Developers
                </h1>
                <Button variant="dark" size="sm" onClick={newDeveloper}>Novo Developer</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sexo</th>
                        <th>Idade</th>
                        <th>Hobby</th>
                        <th>Data Nasc.</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        developer.map(dev => (
                            <tr key={dev.id}>
                                <td>{dev.id}</td>
                                <td>{dev.nome}</td>
                                <td>{dev.sexo}</td>
                                <td>{dev.idade}</td>
                                <td>{dev.hobby}</td>
                                <td>{formateDate(dev.datanascimento)}</td>
                                <td>
                                    <Button size="sm" onClick={() => editDeveloper(dev.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="info"  onClick={() => detailDeveloper(dev.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteDeveloper(dev.id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Developers;